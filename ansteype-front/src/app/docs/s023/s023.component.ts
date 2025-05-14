
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MONTHS_OPTIONS, YEAR_OPTIONS, WEEK_OPTIONS } from '../../add-ins/common/const';
import { LoadingService } from '../../add-ins/service/loading.service';
import { S023Service } from './services/s023service';
import { AgencyDto, DeliveryInfoProductDto, S023SeachDto } from './models/s023Dto';
import { TemporarySaveInfoDto } from '../s018/models/s018Dto';
import { DeliveryInfoChildDto, S007SeachDto } from '../s007/models/s007Dto';
import { MessageService } from 'primeng/api';

interface Child {
  id: number;
  agency_name: string;
  participating_store: string;
  held_date: string;

  item_name: string;
  type_flg: string;
  amount: string;
  isEditable: boolean;
  subtract: string;
  
}
interface Product {
  id: number;
  agency_name: string;
  participating_store: string;
  held_date: string;

  item_name: string;
  type_flg: string;
  isEditable: boolean;
  subtract: string;
  amount: string;

  children: Child[];  // 使用 Child 类型数组来表示父数据的子项
}

export interface Element {
  type_flg: string;
  agency_name: string;
  participating_store: string;
  held_date: string;
  event_location: string;
  order: string;
  number_people: string;
  item_name: string;
}

export interface Element2 {
  memo: string;
  agency_name: string;
  participating_store: string;
  event_location: string;
  order: string;
  byName: string;
}

export interface Element3 {
  distributor_name: string;
  subject: string;
  amount: string;
}
const ELEMENT_DATA_2: Element2[] = [


]

const ELEMENT_DATA_3: Element3[] = [
  {
    distributor_name: '株式会社ABC',
    subject: '【株式会社ABC御中】御見積書_202410',
    amount: '150000',} 
  , {
    distributor_name: '株式会社DEF',
    subject: '【株式会社DEF御中】御見積書_202410',
    amount: '200000',}
    , {
      distributor_name: '株式会社DEF',
      subject: '【株式会社DEF御中】御見積書_202410',
      amount: '200000',}
      , {
        distributor_name: '株式会社DEF',
        subject: '【株式会社DEF御中】御見積書_202410',
        amount: '200000',}
]
const ELEMENT_DATA: Element[] = [

];
@Component({
  selector: 'app-s023',
  templateUrl: './s023.component.html',
  styleUrl: './s023.component.css',
})
export class S023Component implements OnInit {
  mPageFlg: boolean = false; 
  registrationForm!: FormGroup;
  years = YEAR_OPTIONS;
  months = MONTHS_OPTIONS;
  weeks = WEEK_OPTIONS;
  year_list =[]
  agents = []
  displayDialog = false;
  temporaryName =''
  subtraction_options: any[] =[
    { label: '遅刻', value: '遅刻' },
    { label: '欠勤', value: '欠勤' }
  ]

  products: DeliveryInfoProductDto[] = [
  ];

  temporarySaveInfoDto!:TemporarySaveInfoDto;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private messageService: MessageService,

    private s023Service: S023Service
  ) {

        this.registrationForm = this.fb.group({
          year: ['', Validators.required],
          month: ['', Validators.required],
          week: [''],
          agency_id: [''],
          agency: [''],

        });

  }
  data = [
    {
      id: 1,
      name: 'Parent 1',
      children: [
        { id: 101, name: 'Child 1-1', editable: false },
        { id: 102, name: 'Child 1-2', editable: false },
      ],
    },
    {
      id: 2,
      name: 'Parent 2',
      children: [
        { id: 201, name: 'Child 2-1', editable: false },
        { id: 202, name: 'Child 2-2', editable: false },
      ],
    },
  ];

  selectedParent: any = null; // 当前选中的父数据
  selectedRow: Product | null = null;
  allData: DeliveryInfoProductDto[] = [];
  ngOnInit(): void {
    this.loadingService.show();
    this.s023Service.init().subscribe({
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
    this.temporarySaveInfoDto = JSON.parse(sessionStorage.getItem('temporarySaveInfoDto') || '[]');
    if (this.temporarySaveInfoDto) {
      this.registrationForm.get('agency')?.setValue(this.temporarySaveInfoDto.conditions_agency);
      this.registrationForm.get('year')?.setValue(this.temporarySaveInfoDto.conditions_year);
      this.registrationForm.get('month')?.setValue(this.temporarySaveInfoDto.conditions_month);
      this.registrationForm.get('week')?.setValue(this.temporarySaveInfoDto.conditions_week);
      this.loadingService.show();
      const dto: S007SeachDto = this.registrationForm.value
      if (!dto.agency) {
        dto.agency = '';
      }
      if (!dto.week) {
        dto.week = '';
      }
      this.s023Service.seachTemporarySaveMast(dto, this.temporarySaveInfoDto).subscribe({
        next: (response) => {
          if (response.success) {

            this.products = response.data.request_info_list;
          } else {
            this.messageService.add({
              severity: 'error', // 错误类型
              summary: 'エラー',   // 标题
              detail:response.message, // 详细信息
            });
          }
          this.loadingService.hide();
        },
        error: (error) => {
          this.loadingService.hide();
          console.error('Failed to add business partner:', error);
        },
      });
    }

  }

  /**
   * 监听编辑完成后的回调（此处为占位方法）
   * @param childRow 子数据
   */
  onEditComplete(childRow: any): void {
    console.log('Edited child:', childRow);
  }

  goBack() {
    // this.location.back(); // 使用Location服务来导航到上一页
    this.router.navigate(['/docs/s006']);

  }

  previewPageShow() {
    

    this.router.navigate(['/docs/s001']);
  }

  getProjectInformation(){
  
  }

  setPageFlg(flg:boolean){
    this.mPageFlg=flg
  }
  

  // 点击父行时，变为可编辑状态
  onRowSelect(event: any, j: any) {
    const selectedProduct = event;

    if (this.selectedRow !== selectedProduct && j == 0) {
      // 将之前选中父数据的子数据设为不可编辑
      if (this.selectedRow) {
        this.selectedRow.children.forEach(child => {
          child.isEditable = false;
        });
      }

      // 将当前选中的父数据的子数据设为可编辑
      selectedProduct.children.forEach((child: Child) => {
        child.isEditable = true;
      });

      this.selectedRow = selectedProduct; // 更新选中的父数据
    }
  }
  search(){
    // this.products = [
    //   {
    //     id: 1, agency_name: '株式会社ABC', participating_store: 'SB大宮', held_date: '10/1,2,3', item_name: '【株式会社ABC御中】御見積書_202410',  subtract: '',  type_flg: '1',amount:'3000', isEditable: false,
    //     children: [
    //       { id: 1, agency_name: '', participating_store: '', held_date: '10/1,2,3', item_name: 'ガール', subtract: '', type_flg: '1',amount:'3000', isEditable: false },
    //       { id: 2, agency_name: '', participating_store: '', held_date: '10/1,2,3', item_name:  'ガール', subtract: '',  type_flg: '1',amount:'3000', isEditable: false },
    //       { id: 3, agency_name: '', participating_store: '', held_date: '10/1,2,3', item_name:  '催事場', subtract: '-10000',  type_flg: '2',amount:'3000', isEditable: false },
    //       { id: 4, agency_name: '', participating_store: '', held_date: '10/1,2,3', item_name:  '加算金', subtract: '-210000',  type_flg: '3',amount:'3000', isEditable: false }
    //     ]
    //   },
    //   {
    //     id:2, agency_name: '株式会社DDDDDD', participating_store: '春日部店', held_date: '10/1,2,3', item_name: '【株式会社ABC御中】御見積書_202410', subtract: '', type_flg: '1',amount:'3000', isEditable: false,
  
    //     children: [
    //       { id: 1, agency_name: '', participating_store: '', held_date: '10/1,2,3', item_name: 'クローザー', subtract: '', type_flg: '1',amount:'3000', isEditable: false },
    //       { id: 2, agency_name: '', participating_store: '', held_date: '10/1,2,3', item_name: 'クローザー', subtract: '',  type_flg: '1',amount:'3000', isEditable: false },
    //       { id: 3, agency_name: '', participating_store: '', held_date: '10/1,2,3', item_name: 'ガール', subtract: '',  type_flg: '1',amount:'3000', isEditable: false }
    //     ]
    //   }
    // ];
  }
  expandedRow: Product | null = null;  // 当前展开的父行

  // 切换展开/收起并控制父子行的金额字段是否可编辑
  toggleExpand(product: Product) {
    // 如果已经展开了当前行，则折叠
    if (this.expandedRow === product) {
      // 设置所有父子行的金额字段不可编辑
      product.isEditable = false;
      product.children.forEach(child => child.isEditable = false);
      this.expandedRow = null;
    } else {
      // 设置上一个展开的父子行的金额字段不可编辑
      if (this.expandedRow) {
        this.expandedRow.isEditable = false;
        this.expandedRow.children.forEach(child => child.isEditable = false);
      }

      // 设置当前父数据和子数据的金额字段为可编辑
      this.expandedRow = product;
      product.isEditable = true;
      product.children.forEach(child => child.isEditable = true);
    }
  }
   addRow(event: any,product: DeliveryInfoProductDto) {
     // event.stopPropagation();
     const newChild: DeliveryInfoChildDto = {
       id: 0,
       matter_master_exe_id: product.matter_master_exe_id, // 案件情報取得処理ID
       no: "", // No.
       agency_id: '', // 代理店id
       agency_name: product.agency_name, // 代理店名
       participating_store: product.participating_store, // 開催店舗
       held_date: product.held_date,// 開催日
       event_location: '',// イベント実施場所
       order: '',// オーダー
       number_people: '', // 人数
       item_name: '減算', // 品目名
       type_flg: '3', // type_flg
       // 平日/週末
       weekday_weekend: '',
 
       amount: '',
       event_venue_fee: '',
       transportation_fee: '',
       days: '',
       // ページ分け
       page_division_1_selected: false,
       page_division_2_selected: false,
       // 非課税
       tax_free_selected: false,
       // googleEXCELファイル名
       google_excel_name: product.google_excel_name,
       // googleEXCELファイルシート名
       google_excel_sheet_name: product.google_excel_sheet_name,
       // 一時保存フラグ
       temporary_save_flg: '',
       conditions_year: product.conditions_year,
       conditions_month: product.conditions_month,
       conditions_week: product.conditions_week,
       conditions_agency: product.conditions_agency,
       isEditable : true,
       is_editable : false,
       pdf_id : 0,
       subtract: '',
       unit_price: '0',
       preview_update_flg: '',
     };
       // 将当前选中的父数据的子数据设为可编辑
       // product.children.forEach((child: DeliveryInfoChildDto) => {
       //   child.isEditable = false;
       // });
     product.children.push(newChild); // 将新子数据添加到父数据中
   }
   // 删除子数据行或父数据行
   removeRow(children: DeliveryInfoChildDto, product: DeliveryInfoProductDto, isParent: boolean) {
     const parentProduct = this.products.find(p => p.id === product.id);
     if (parentProduct) {
         // 删除子行
         const index = parentProduct.children.indexOf(children);
         if (index !== -1) {
           parentProduct.children.splice(index, 1);  // 删除子行
           this.updateParentSubtract(product);
         }
     }
   }
   removeRowP(product: DeliveryInfoProductDto, isParent: boolean) {
    const parentProduct = this.products.find(p => p.id === product.id);
    if (parentProduct) {
      if (isParent) {
        // 删除父行的所有子行
        parentProduct.children = [];
        const index = this.products.indexOf(parentProduct);
        if (index !== -1) {
          this.products.splice(index, 1);  // 删除子行
        }
      } 
    }
  }
    // 获取唯一标识符
    getCellKey(rowIndex: number, childIndex?: number, columnName?: string): string {
      return `${rowIndex}-${childIndex ?? ''}-${columnName ?? ''}`;
    }
    // 设置编辑单元格
    editingCell: string | null = null; // 保存当前正在编辑的单元格的唯一标识符
    editCell(cellKey: string, event: MouseEvent): void {
      event.stopPropagation();  // 阻止事件向父级传播

      this.editingCell = cellKey;
      // 聚焦到对应的输入框
      setTimeout(() => {
        const inputField = document.querySelector(`[data-cell-key="${cellKey}"]`) as HTMLInputElement;
        if (inputField) {
          inputField.focus();
        }
      }, 0);
    }
      // 完成编辑
  finishEdit(): void {
    this.editingCell = null;
  }


  /**
   * 
   * @param childRow 子数据
   */
  onSeachRequest(): void {
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
    const dto: S007SeachDto = this.registrationForm.value
    this.loadingService.show();
    if (!dto.agency) {
      dto.agency = '';
    }
    if (!dto.week) {
      dto.week = '';
    }

    this.s023Service.seachRequest(dto).subscribe({
      next: (response) => {
        if (response.success) {

          this.allData = response.data.request_info_list;
          this.products = [...this.allData];
        } else {
          this.messageService.add({
            severity: 'error', // 错误类型
            summary: 'エラー',   // 标题
            detail: response.message, // 详细信息
          });
        }
        this.loadingService.hide();
      },
      error: (error) => {
        this.loadingService.hide();
        console.error('Failed to add business partner:', error);
      },
    });
  }

  create_pdf_execute() {
    if (this.products.length == 0) {
      this.messageService.add({
        severity: 'error', // 错误类型
        summary: 'エラー',   // 标题
        detail: 'データは存在しません', // 详细信息
      });
      return;
    }
    let input_check = true;
    this.loadingService.show();
    this.products.forEach((product) => {
      product.children.forEach((child) => {

        if (child.item_name.includes('減算')) {
          if (!child.amount) {
            this.messageService.add({
              severity: 'error', // 错误类型
              summary: 'エラー',   // 标题
              detail: '交通費を入力してください', // 详细信息
            });
            input_check = false;

            return;
          }
          
        }
      });

    });

    if (input_check) {
      const dto: S023SeachDto = this.registrationForm.value
      if (!dto.week) {
        dto.week = '';
      }
      this.s023Service.pdf(dto, this.products).subscribe({
        next: (response) => {
          if (response.success) {
            this.messageService.add({
              severity: 'success', // 成功提示
              summary: '請求書発行',     // 提示标题
              detail: response.message, // 提示详情
            });
            this.router.navigate(['/docs/s006']);
          } else {
            this.messageService.add({
              severity: 'error', // 错误类型
              summary: 'エラー',   // 标题
              detail: response.message, // 详细信息
            });
          }
        },
        error: (error) => {
          this.loadingService.hide();
          console.error('Failed to add business partner:', error);
        },
      });
    } else {
      this.loadingService.hide();

    }



  }

  /**
   * 一時保存
   */
  onTemporarySave() {
    if (this.products.length == 0) {
      this.messageService.add({
        severity: 'error', // 错误类型
        summary: 'エラー',   // 标题
        detail: 'データは存在しません', // 详细信息
      });
      return;
    }
    this.displayDialog = true;
    this.temporaryName = this.registrationForm.get('month')?.value + '月' +  '分の請求一時保存'
    // this.s003Service.temporarySave(this.products).subscribe({
    //   next: (response) => {
    //     this.router.navigate(['/docs/s002']);
    //   },
    //   error: (error) => {
    //     console.error('Failed to add business partner:', error);
    //   },
    // });
      // this.location.back(); // 使用Location服务来导航到上一页
      
  
    }
    temporarySave($event:any) {
      this.displayDialog = false;
      let exeName = $event == undefined ? '' : $event;

      this.loadingService.show();
        const dto: S023SeachDto = this.registrationForm.value
        if (!dto.agency) {
          dto.agency = '';
        }
        if (!dto.week) {
          dto.week = '';
        }
        const holidays = [0, 6];
      this.s023Service.temporarySave(dto, this.products, exeName, this.temporarySaveInfoDto).subscribe({
        next: (response) => {
          if (response.success) {
            this.messageService.add({
              severity: 'success', // 成功提示
              summary: '一時保存完了',     // 提示标题
              detail: response.message, // 提示详情
            });
            this.router.navigate(['/docs/s006']);
  
          } else{
            this.messageService.add({
              severity: 'error', // 错误类型
              summary: 'エラー',   // 标题
              detail: response.message, // 提示详情
            });
          }
        },
        error: (error) => {
          this.loadingService.hide();
          console.error('Failed to add business partner:', error);
        },
      });
        // this.location.back(); // 使用Location服务来导航到上一页
        
    
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
      ngOnDestroy() {
        sessionStorage.removeItem('temporarySaveInfoDto'); // 清空页面特定数据
      }
      filterData() {
        if (!this.registrationForm.get('agency')?.value ||this.registrationForm.get('agency')?.value =='-未選択-' ) {
    
          this.products = [...this.allData];
          return;
        }
      
        // 筛选代理店数据
        this.products = this.allData.filter(item => item.agency_name === this.registrationForm.get('agency')?.value);
      }
      onSubtractChange(child: any, parent: any) {
        if (child.subtract === '遅刻') {
          child.amount = -5000;
        } else if (child.subtract === '欠勤') {
          child.amount = -10000;
        } else {
          child.amount = 0;
        }
        this.updateParentSubtract(parent); // 更新父级减算值合计
      }
      updateParentSubtract(parent: any) {
        if (!parent.children || parent.children.length === 0) {
          parent.subtract = 0;
          return;
        }
        parent.subtract = parent.children.reduce((sum: number, child: any) => {
          return child.type_flg == "3" ? sum + (child.amount || 0) : sum;
        }, 0).toString();
      }
      validateInput(child: any, parent: any): void {
        let amount = parseFloat(child.amount);
        if (amount >= 0) {
          this.messageService.add({
            severity: 'warn',
            summary: '注意',
            detail: '負の数値を入力してください',
          });
          child.amount = ''; // 清空无效输入
        } else {
          child.amount = amount;

          this.updateParentSubtract(parent); // 更新父级减算值合计
        }
        this.finishEdit(); // 结束编辑模式
      }
      
}