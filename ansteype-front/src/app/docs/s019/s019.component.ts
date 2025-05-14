import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MONTHS_OPTIONS, YEAR_OPTIONS } from '../../add-ins/common/const';
import { S019Dto, SearchDto } from './models/s019Dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../../add-ins/service/loading.service';
import { S019Service } from './services/s019service';

@Component({
  selector: 'app-s019',
  templateUrl: './s019.component.html',
  styleUrl: './s019.component.scss'
})
export class S019Component implements OnInit {
  registrationForm!: FormGroup;
  dataEstimation: any[] = []; // 見積データ
  dataInvoice: any[] = []; // 請求データ
  displayedData: any[] = [];
  activeTabIndex: number = 0;

  agents: { label: string; value: number }[] = [];
  years = []
  months = MONTHS_OPTIONS;

  company: any;
  year: string;
  month: string;

  constructor(private router: Router,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private s019Service: S019Service) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as {
        company: any;
        year: string;
        month: string;
      };

      this.company = state.company;
      this.year = state.year;
      this.month = state.month;
    }else{
      this.company = "";
      this.year = "";
      this.month = "";
    }

    this.registrationForm = this.fb.group({
      year: ['', Validators.required],
      month: ['', Validators.required],
      agency: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    let searchDto: SearchDto = {
      year: this.year,
      month: this.month,
      agent_name: this.company.company_name
    }
    this.get_init_data(searchDto);
  }

  search(){
    this.year = this.registrationForm.value.year;
    this.month = this.registrationForm.value.month;
    const agent_id = this.registrationForm.value.agency.value;
    const agent_name = this.registrationForm.value.agency.label;
    this.company = {
      company_id: agent_id,
      company_name: agent_name
    }

    let searchDto: SearchDto = {
      year: this.year,
      month: this.month,
      agent_name: agent_name
    }
    this.get_init_data(searchDto);
  }

  get_init_data(searchDto: SearchDto) {
    this.loadingService.show();

    this.s019Service.getData(searchDto).subscribe({
      next: (response) => {
        this.agents = response.data.agent_list.map((item: any) => ({
          label: item.company_name,
          value: item.id,
        }));

        this.years = response.data.year_list.map((item: any) => ({
          label: item,
          value: item,
        }));

        // データを分類
        let allData = response?.data.data as S019Dto[];
        this.dataEstimation = allData.filter((item) => item.type === 'estimation');
        this.dataInvoice = allData.filter((item) => item.type === 'invoice');

        // 初期タブデータを設定
        this.displayedData = this.dataEstimation;

        // 選択された agency の初期値
        let agency = null;
        // company_name に基づいて、agencyOptions から一致する選択肢を検索
        const matchedAgency = this.agents.find(
          (option) => option.label === this.company.company_name
        );
        if (matchedAgency) {
          // 一致する選択肢が見つかった場合、agency に設定
          agency = {
            label: matchedAgency.label,
            value: matchedAgency.value,
          };
        }

        this.registrationForm.patchValue({
          year: this.year,
          month: this.month,
          agency: agency
        });

        this.loadingService.hide();
      },
      error: (error) => {
        this.loadingService.hide();
      },
    });
  }

  onTabChange(event: any) {
    // タブ変更時の処理
    if (event.index === 0) {
      this.displayedData = this.dataEstimation; // 見積データ
    } else if (event.index === 1) {
      this.displayedData = this.dataInvoice; // 請求データ
    }
  }

  goBack() {
    this.router.navigate(['/docs/s001']);
  }
}
