

import { S027Service } from './services/s027service';
import { S027SeachDto, DeliveryInfoDto } from './models/s027Dto';

import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MONTHS_OPTIONS, YEAR_OPTIONS, WEEK_OPTIONS } from '../../add-ins/common/const';
import { LoadingService } from '../../add-ins/service/loading.service';
import { TemporarySaveInfoDto } from '../s017/models/s017Dto';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../add-ins/service/auth.service';
import { AgencyDto } from '../s003/models/s003Dto';

@Component({
  selector: 'app-s027',
  templateUrl: './s027.component.html',
  styleUrl: './s027.component.css',
})
export class S027Component implements OnInit {

  mPageFlg: boolean = false; 
  registrationForm!: FormGroup;
  years = YEAR_OPTIONS;
  months = MONTHS_OPTIONS;
  weeks = WEEK_OPTIONS;
  agents = []
  products: DeliveryInfoDto[] = [];
  delProducts: DeliveryInfoDto[] = [];

  tableHeight = "0";
  allData: DeliveryInfoDto[] = [];
  isLoading = false;
  displayDialog = false;
  temporaryName =''
  year_list =[]
  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private s027Service: S027Service)
 {

        this.registrationForm = this.fb.group({
          year: ['', Validators.required],
          month: ['', Validators.required],
          week: ['', Validators.required],
          agency_id: [''],
          agency: [''],

        });

  }

  ngOnInit(): void {


    this.loadingService.show();
    this.s027Service.init().subscribe({
     next: (response) => {
        this.agents = response.data.agent_list.map((item: AgencyDto) => ({
          label: item.company_name,
          value: item.id?.toString(),
        }));
        this.year_list = response.data.year_list.map((item: any) => ({
          label: item,
          value: item,
        }));
        this.loadingService.hide();
      },
      error: (error) => {
        this.loadingService.hide();
        console.error('Failed to add business partner:', error);
      },
    });
  }


 /**
   * 
   * @param childRow 子数据
   */
  onSeacDeliveryInfos(): void {
    
    this.registrationForm.markAllAsTouched();
    this.registrationForm.updateValueAndValidity();
    if (this.registrationForm.invalid) {
        this.messageService.add({
          severity: 'error', // 错误类型
          summary: 'エラー',   // 标题
          detail: '対象年、対象月、対象週を入力してください', // 详细信息
        });
        return;
      }
    const dto: S027SeachDto = this.registrationForm.value

    this.loadingService.show();
    if (!dto.agency) {
      dto.agency = '';
    }
      // spreadsheet_name: '案件マスタサンプル_1121',
      // range_name: '1W',
    this.s027Service.seachDeliveryInfo(dto).subscribe({
      next: (response) => {
        if (response.success) {
          this.allData = response.data.re_data;
          this.products = [...this.allData];
        } 
        
        else {
          this.messageService.add({
            severity: 'error', // 错误类型
            summary: 'エラー',   // 标题
            detail: response.message, // 详细信息
          });
        }

        // this.agents = response.data.agent_list.map((item: AgencyDto) => ({
        //   label: item.company_name,
        //   value: item.company_name,
        // }));
        this.loadingService.hide();
      },
      error: (error) => {
        this.loadingService.hide();
        console.error('Failed to add business partner:', error);

      },
    });
    this.tableHeight = '56vh'
  }

  toggleSelectAll(event: Event) {
    event.preventDefault(); // 防止页面跳转
      // 遍历所有产品
    this.products.forEach((product) => {
      // 遍历每个产品的子数据
      product.is_del = true;
    });
  }

  // 删除子行
  deleteRow() {

  
    // 如果某个 product 的 children 都被删光了，也可以选择删除整个 product
    this.delProducts = this.products.filter(product => product.is_del == true);
    this.products = this.products.filter(product => (product.is_del == false || product.is_del == undefined));

    this.loadingService.show();
    this.s027Service.delDeliveryInfo(this.delProducts).subscribe({
      next: (response) => {
        if (response.success) {

          this.loadingService.hide();

        } 
        
        else {
          this.messageService.add({
            severity: 'error', // 错误类型
            summary: 'エラー',   // 标题
            detail: response.message, // 详细信息
          });
          this.loadingService.hide();

        }

        // this.agents = response.data.agent_list.map((item: AgencyDto) => ({
        //   label: item.company_name,
        //   value: item.company_name,
        // }));
        this.loadingService.hide();
      },
      error: (error) => {
        this.loadingService.hide();
        console.error('Failed to add business partner:', error);

      },
    });



  }

  filterData() {
    if (!this.registrationForm.get('agency')?.value ||this.registrationForm.get('agency')?.value =='-未選択-' ) {

      this.products = [...this.allData];
      return;
    }

    // 筛选代理店数据
    this.products = this.allData.filter(item => item.agency_name === this.registrationForm.get('agency')?.value);
  }

  
  onAgencyChange(event: any) {
    // 查找选中的选项
    const selectedAgent = this.agents.find(agent => agent['value'] === event.value);
  
    if (selectedAgent) {
      // 如果找到选项，设置 agency 的值
      this.registrationForm.get('agency')?.setValue(selectedAgent['label']);
    } else {
      // 如果没有找到选项，设置 agency 为 null 或空值
      this.registrationForm.get('agency')?.setValue(null);
    }
  }
}