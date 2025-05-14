import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { S004Service } from './services/s004service';
import { QuotationClaimSettingInfoDTO } from '../../shared/models/quotationClaimSettingInfoDto';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DAY_STATUS, MONTH_STATUS } from '../../add-ins/common/const';
import { LoadingService } from '../../add-ins/service/loading.service';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-s004',
  templateUrl: './s004.component.html',
  styleUrl: './s004.component.scss'
})

export class S004Component implements OnInit {
  dayStatus = DAY_STATUS;
  monthStatus = MONTH_STATUS;
  // 支払期日選択肢
  weekendOptions = [
    { label: '前営業日', value: 1 },
    { label: '後営業日', value: 2 },
    { label: '考慮しない', value: 0 },
  ];
  errorMessages: string[] = [];

  quotationForm!: FormGroup;

  // 担当者flg
  isStaff: boolean = false;

  constructor(private router: Router,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private s004Service: S004Service,
    private app: AppService) {}

  ngOnInit(): void {
    const user = this.app.getCurrentUser();
    this.isStaff = user?.role === 'staff';

    this.initForm();
    this.loadInitialData();
    this.disableStaffControls();
  }

  initForm(): void {
    this.quotationForm = this.fb.group({
      id: [null],
      format: [{value: '', disabled: true}, Validators.required], // 見積書ファイル命名規則
      issuance_rule: [{value: '', disabled: true}, Validators.required], // 見積書番号発番ルール
      item_name_rule: [{value: '', disabled: true}, Validators.required], // 品目名記載ルール
      due_month_status: ['', Validators.required], // 振込期限月ステータス
      due_month: [{value: '', disabled: true}],
      due_date_status: ['', Validators.required], // 振込期限日付ステータス
      due_date: [{value: '', disabled: true}],
      email_creation_rule: [{value: '', disabled: true}, Validators.required], // メール作成ルール
      save_location: [{value: '', disabled: true}, Validators.required], // 保存先
      weekend_previous_status: [0, Validators.required],
      type_flag: [1] // 種別フラグ 1:見積
    });

    if (!this.isStaff) {
      this.quotationForm.get('due_month_status')?.valueChanges.subscribe((value) => {
        const dueMonthControl = this.quotationForm.get('due_month');
        if (value === 4) {
          dueMonthControl?.enable();
          dueMonthControl?.setValidators([Validators.required]); 
  
          dueMonthControl?.updateValueAndValidity();
          dueMonthControl?.markAsTouched();
        } else {
          dueMonthControl?.disable();
          dueMonthControl?.clearValidators();
          dueMonthControl?.reset();
          
          dueMonthControl?.updateValueAndValidity();
          dueMonthControl?.markAsTouched();
        }
      });
  
      this.quotationForm.get('due_date_status')?.valueChanges.subscribe((value) => {
        const dueDateControl = this.quotationForm.get('due_date');
        if (value === 2) {
          dueDateControl?.enable();
          dueDateControl?.setValidators([Validators.required]); 
  
          dueDateControl?.updateValueAndValidity();
          dueDateControl?.markAsTouched();
        } else {
          dueDateControl?.disable();
          dueDateControl?.clearValidators();
          dueDateControl?.reset();
          
          dueDateControl?.updateValueAndValidity();
          dueDateControl?.markAsTouched();
        }
      });
    }
  }

  loadInitialData(): void {
    this.loadingService.show();
    this.s004Service.getData().subscribe({
      next: (response) => {
        const controlStates = Object.keys(this.quotationForm.controls).reduce((states, key) => {
          const control = this.quotationForm.get(key);
          states[key] = control?.disabled ?? false;
          return states;
        }, {} as { [key: string]: boolean });

        Object.keys(this.quotationForm.controls).forEach((key) => {
          const control = this.quotationForm.get(key);
          if (control?.disabled) {
            control.enable({ emitEvent: false });
          }
        });

        this.quotationForm.patchValue(response.data);

        Object.keys(this.quotationForm.controls).forEach((key) => {
          const control = this.quotationForm.get(key);
          if (controlStates[key] && key !== 'due_month' && key !== 'due_date') {
            control?.disable({ emitEvent: false });
          }
        });
        
        this.disableStaffControls();

        this.loadingService.hide();
      },
      error: (err) => {
        this.loadingService.hide();
      },
    });
  }

  disableStaffControls(){
    if(this.isStaff){
      this.quotationForm.controls['due_month_status'].disable();
      this.quotationForm.controls['due_month'].disable();
      this.quotationForm.controls['due_date_status'].disable();
      this.quotationForm.controls['due_date'].disable();
      this.quotationForm.controls['weekend_previous_status'].disable();
    }
  }

  toggleEdit(controlName: string): void {
    const control = this.quotationForm.get(controlName);
    if (control?.enabled) {
      control?.disable();
    } else {
      control?.enable();
    }
  }

  onSubmit() {
    this.quotationForm.markAllAsTouched();
    this.quotationForm.updateValueAndValidity();

    if (this.quotationForm.valid) {
      this.loadingService.show();

      const dto: QuotationClaimSettingInfoDTO = this.quotationForm.getRawValue();

      this.s004Service.add(dto).subscribe({
        next: (response) => {
          this.loadingService.hide();
          this.router.navigate(['/docs/s002']);
        },
        error: (error) => {
          this.loadingService.hide();
        },
      });
    }
  }

  goBack() {
    this.router.navigate(['/docs/s002']);
  }

  // compileTemplate(template: string | undefined, variables: { [key: string]: string | number }): string | undefined {
  //   return template?.replace(/\$\{(.*?)(?:,([+-]?\d+))?\}/g, (_, key, offset) => {
  //     const baseValue = variables[key] !== undefined ? Number(variables[key]) : NaN;
  //     const offsetValue = offset !== undefined ? Number(offset) : 0;

  //     if (!isNaN(baseValue)) {
  //       return String(baseValue + offsetValue);
  //     }
  //     return '';
  //   });
  // }
}
