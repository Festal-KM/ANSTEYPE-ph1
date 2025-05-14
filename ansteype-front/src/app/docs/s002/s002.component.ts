import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { S002Dto, SearchDto } from './models/s002Dto';
import { MONTHS_OPTIONS } from '../../add-ins/common/const';
import { S002Service } from './services/s002service';
import { LoadingService } from '../../add-ins/service/loading.service';

@Component({
  selector: 'app-s002',
  templateUrl: './s002.component.html',
  styleUrl: './s002.component.css'
})


export class S002Component implements OnInit {
  registrationForm!: FormGroup;
  data: S002Dto[] = [];
  titleYear!: string;
  titleMonth!: string;

  years = []
  months = MONTHS_OPTIONS;

  // @Output() flagChanged = new EventEmitter<boolean>();
  mPageFlg: boolean = false;
  // selectedRow: Product | null = null;

  constructor(private router: Router,
    private fb: FormBuilder,
    private s002Service: S002Service,
    private loadingService: LoadingService
  ) {
    this.registrationForm = this.fb.group({
      year: ['', Validators.required],
      month: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // 現在の年月を取得
    const currentYear = new Date().getFullYear().toString();
    const currentMonth = (new Date().getMonth() + 1).toString();

    this.titleYear = currentYear;
    this.titleMonth = currentMonth;

    // SearchDtoの初期化
    const searchDto: SearchDto = {
      year: currentYear,
      month: currentMonth
    };

    this.loadingService.show();
    this.s002Service.getInitData(searchDto).subscribe({
      next: (response) => {
        this.years = response.data.year_list.map((item: any) => ({
          label: item,
          value: item,
        }));
        this.data = response?.data.data as S002Dto[];

        const currentYearOption = this.years.find((item: any) => item.value === currentYear) || { label: '', value: '' };
        if (currentYearOption) {
          this.registrationForm.patchValue({
            year: currentYearOption.value,
            month: currentMonth
          });
        }

        this.loadingService.hide();
      },
      error: (error) => {
        this.loadingService.hide();
      },
    });
  }

  search() {
    const searchDto: SearchDto = this.registrationForm.value
    this.titleYear = this.registrationForm.value.year;
    this.titleMonth = this.registrationForm.value.month;

    this.loadingService.show();
    this.s002Service.getData(searchDto).subscribe({
      next: (response) => {
        this.data = response?.data as S002Dto[];
        this.loadingService.hide();
      },
      error: (error) => {
        this.loadingService.hide();
      },
    });
  }

  checkPageShow(pageFlg: boolean) {
    // this.mPageFlg = pageFlg;
    // this.flagChanged.emit(pageFlg);
    // let params = { pageFlg: pageFlg }
    // this.router.navigate(['/auto-x/s003/s003']);


  }

  // checkPageShowM(pageFlg?:string) {
  //   this.mPageFlg = false;
  //   this.flagChanged.emit(pageFlg);

  // }

  setPageShow() {
    this.router.navigate(['/docs/s003']);
  }

  setPageShowM() {
    this.router.navigate(['/docs/s022']);
  }

  setPageShowK() {
    this.router.navigate(['/docs/s024']);
  }

  setPageShowS() {
    this.router.navigate(['/docs/s004']);
  }
  setPageShowSc() {
    this.router.navigate(['/docs/s025']);

  }
  setPageShowScDel() {
    this.router.navigate(['/docs/s027']);

  }
  setPageShowSa() {
    this.router.navigate(['/docs/s017']);

  }


  // 使用 Set 存储所有展开的行
  expandedRows: Set<S002Dto> = new Set();

  // 切换展开/收起状态，并控制父子行的编辑状态
  toggleExpand(product: S002Dto) {
    // 如果当前行已展开，则折叠
    if (this.expandedRows.has(product)) {
      // 设置该行和其子行的金额字段不可编辑
      product.isEditable = false;
      product.stores?.forEach(child => child.isEditable = false);
      // 从集合中移除
      this.expandedRows.delete(product);
    } else {
      // 设置当前父行和子行的金额字段为可编辑
      product.isEditable = true;
      product.stores?.forEach(child => child.isEditable = true);
      // 添加到集合
      this.expandedRows.add(product);
    }
  }
}

