import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { S014Service } from './services/s014service';
import { S014Dto } from './models/s014Dto';
import { LoadingService } from '../../add-ins/service/loading.service';

@Component({
  selector: 'app-s014',
  templateUrl: './s014.component.html',
  styleUrl: './s014.component.scss'
})
export class S014Component implements OnInit {
  mode: string | null = null;
  id: number | null = null;

  s014Form!: FormGroup;
  storeList: any[] = [];
  selectedStore: any = null;
  displayDialog: boolean = false;
  validationTriggered = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private loadingService: LoadingService,
    private s014Service: S014Service) {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras.state) {
        const state = navigation.extras.state as {
          mode: string;
          id: number;
        };

        this.mode = state.mode;
        this.id = state.id;
      }else{
        this.mode = "new";
        this.id = null;
      }
    }

  ngOnInit(): void {
    this.initForm();

    if (this.mode === 'edit' && this.id) {
      this.loadEditData(this.id);
    }
  }

  loadEditData(id: number) {
    this.loadingService.show();
    this.s014Service.getCompanyData(id).subscribe({
      next: (response) => {
        this.s014Form.patchValue(response.data);
        this.storeList = response.data.stores;
        this.loadingService.hide();
      },
      error: (error) => {
        this.loadingService.hide();
      },
    });
  }

  initForm() {
    this.s014Form = this.fb.group({
      id: [null],
      company_name: ['', Validators.required],
      company_address: ['', Validators.required]
    }, { validators: this.validateStoreList.bind(this) });
  }

  private validateStoreList(formGroup: FormGroup) {
    if (!this.validationTriggered) {
      return null;
    }

    return this.storeList.length === 0 ? { storeListEmpty: true } : null;
  }

  addStore() {
    this.selectedStore = null;
    this.displayDialog = true;
  }

  editStore(store: any) {
    this.selectedStore = { ...store };
    this.displayDialog = true;
  }

  addOrUpdateStore(store: any) {
    if (this.selectedStore) {
      const index = this.storeList.findIndex((s) => s.id === store.id);
      if (index !== -1) {
        this.storeList = this.storeList.map((s, i) =>
          i === index ? { ...store } : s
        );
      }
    } else {
      this.storeList = [...this.storeList, { ...store }]; // 创建新数组
    }
  
    this.displayDialog = false;
    this.s014Form.updateValueAndValidity();
  }

  removeStore(store: any) {
    this.storeList = this.storeList.filter((s) => s.id !== store.id);
  }

  goBack() {
    this.router.navigate(['/docs/s010']);
  }

  save() {
    this.validationTriggered = true;
    this.s014Form.markAllAsTouched();
    this.s014Form.updateValueAndValidity();

    if (this.s014Form.invalid) {
      return;
    }
    
    this.loadingService.show();
    const formValue = this.s014Form.value;
    const dto: S014Dto = {
        id: formValue.id,
        company_name: formValue.company_name,
        company_address: formValue.company_address,
        stores: this.storeList,
    };

    if (this.mode === 'edit'){
      this.s014Service.updateBusinessPartner(dto).subscribe({
        next: (response) => {
          this.router.navigate(['/docs/s010']);
          this.loadingService.hide();
        },
        error: (error) => {
          this.loadingService.hide();
        },
      });
    }else{
      this.s014Service.addBusinessPartner(dto).subscribe({
        next: (response) => {
          this.loadingService.hide();
          this.router.navigate(['/docs/s010']);
        },
        error: (error) => {
          this.loadingService.hide();
        },
      });
    }
  }
}
