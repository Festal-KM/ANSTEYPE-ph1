import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MONTHS_OPTIONS, YEAR_OPTIONS } from '../../add-ins/common/const';
import { S001Service } from './services/s001service';
import { S001Dto, SearchDto } from './models/s001Dto';
import { LoadingService } from '../../add-ins/service/loading.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-s001',
  templateUrl: './s001.component.html',
  styleUrl: './s001.component.scss'
})
export class S001Component implements OnInit {
  registrationForm!: FormGroup;
  data: S001Dto[] = [];
  titleYear!: string;
  titleMonth!: string;

  years = []
  months = MONTHS_OPTIONS;
  // 通勤时间测试 starstar
  origin: string = '';
  destination: string = '';
  result: any = null;
  error: string = '';
    // 通勤时间测试 end
  constructor(private router: Router,
    private fb: FormBuilder,
    private s001Service: S001Service,
    private loadingService: LoadingService,
    private app: AppService
  ) {
    this.registrationForm = this.fb.group({
      year: ['', Validators.required],
      month: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    // ユーザー情報を取得
    const user = this.app.getCurrentUser();
    console.log(user);

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
    this.s001Service.getInitData(searchDto).subscribe({
      next: (response) => {
        this.years = response.data.year_list.map((item: any) => ({
          label: item,
          value: item,
        }));
        this.data = response?.data.data as S001Dto[];

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

  searchData() {
    const searchDto: SearchDto = this.registrationForm.value
    this.titleYear = this.registrationForm.value.year;
    this.titleMonth = this.registrationForm.value.month;

    this.loadingService.show();
    this.s001Service.getData(searchDto).subscribe({
      next: (response) => {
        this.data = response?.data as S001Dto[];
        this.loadingService.hide();
      },
      error: (error) => {
        this.loadingService.hide();
      },
    });
  }

  goToDetails(company: any) {
    this.router.navigate(['/docs/s019'], {
      state: {
        company: company,
        year: this.registrationForm.value.year,
        month: this.registrationForm.value.month,
      },
    });
  }

  setPageShow01() {
    this.router.navigate(['/docs/s002']);
  }

  setPageShow02() {
    this.router.navigate(['/docs/s006']);
  }

  // searchCommute() {
  //   this.result = null;
  //   this.error = '';
  //   const body = {
  //     origin: this.origin,
  //     destination: this.destination
  //   };

  //     this.s001Service.gettsuData(body).subscribe({
  //       next: (data) => {

  //           this.result = data;
  //       },
  //       error: (err) => {
  //         this.error = 'API呼び出し失敗: ' + err.message;
  //       }
  //     });
  // }
}
