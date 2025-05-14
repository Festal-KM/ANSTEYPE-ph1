
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MONTHS_OPTIONS } from '../../add-ins/common/const';
import { S006Dto, SearchDto } from './models/s006Dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { S006Service } from './services/s006service';
import { LoadingService } from '../../add-ins/service/loading.service';

@Component({
  selector: 'app-s006',
  templateUrl: './s006.component.html',
  styleUrl: './s006.component.css'
})
export class S006Component implements OnInit {
  registrationForm!: FormGroup;
  data: S006Dto[] = [];
  titleYear!: string;
  titleMonth!: string;

  years = []
  months = MONTHS_OPTIONS;
  
  constructor(private router: Router,
    private fb: FormBuilder,
    private s006Service: S006Service,
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
    this.s006Service.getInitData(searchDto).subscribe({
      next: (response) => {
        this.years = response.data.year_list.map((item: any) => ({
          label: item,
          value: item,
        }));
        this.data = response?.data.data as S006Dto[];

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
    this.s006Service.getData(searchDto).subscribe({
      next: (response) => {
        this.data = response?.data as S006Dto[];
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

  setPageShow() {
    this.router.navigate(['/docs/s007']);
  }

  setPageShowM() {
    this.router.navigate(['/docs/s023']);
  }
  setPageShowK() {
    this.router.navigate(['/docs/s020']);
  }

  setPageShowS() {
    this.router.navigate(['/docs/s008']);
  }
  setPageShowSa() {
    this.router.navigate(['/docs/s018']);

  }

  setPageShowSc() {
    this.router.navigate(['/docs/s026']);
  }

  // 使用 Set 存储所有展开的行
  expandedRows: Set<S006Dto> = new Set();

  // 切换展开/收起状态，并控制父子行的编辑状态
  toggleExpand(product: S006Dto) {
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