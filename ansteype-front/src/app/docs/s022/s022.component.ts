
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MONTHS_OPTIONS, YEAR_OPTIONS, WEEK_OPTIONS } from '../../add-ins/common/const';
import { LoadingService } from '../../add-ins/service/loading.service';
import { S022Service } from './services/s022service';
import { AgencyDto, Child, Product, S022SeachDto } from './models/s022Dto';
import { TemporarySaveInfoDto } from '../s017/models/s017Dto';
import { S003SeachDto } from '../s003/models/s003Dto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-s022',
  templateUrl: './s022.component.html',
  styleUrl: './s022.component.css',
})
export class S022Component implements OnInit {
  mPageFlg: boolean = false; 
  registrationForm!: FormGroup;
  years = YEAR_OPTIONS;
  months = MONTHS_OPTIONS;
  weeks = WEEK_OPTIONS;
  agents = []
  products: Product[] = [];
  tableHeight = "0";
  allData: Product[] = [];
  isLoading = false;
  displayDialog = false;
  temporaryName =''
  year_list =[]
  temporarySaveInfoDto!:TemporarySaveInfoDto;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private messageService: MessageService,
  
    private s022Service: S022Service) {

        this.registrationForm = this.fb.group({
          year: ['', Validators.required],
          month: ['', Validators.required],
          week: [''],
          agency_id: [''],
          agency: [''],

        });

  }

  selectedParent: any = null; // 当前选中的父数据
  selectedRow: Product | null = null;
  ngOnInit(): void {
   this.loadingService.show();
    this.s022Service.init().subscribe({
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
      this.loadingService.show();
      this.s022Service.seachTemporarySaveMast(this.temporarySaveInfoDto).subscribe({
        next: (response) => {
          if (response.success) {
            this.allData = response.data.re_sheet_data;
            this.products = [...this.allData];
          } else {
            this.messageService.add({
              severity: 'error', // 错误类型
              summary: 'エラー',   // 标题
              detail:response.message, // 详细信息
            });
          }
          // this.registrationForm.get('agency')?.setValue(this.temporarySaveInfoDto.);

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

  }
  search(){
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
    const dto: S022SeachDto = this.registrationForm.value
    if (!dto.agency) {
      dto.agency = '';
    }
    this.loadingService.show();
      // spreadsheet_name: '案件マスタサンプル_1121',
      // range_name: '1W',
    this.s022Service.seachMast(dto).subscribe({
      next: (response) => {
        if (response.success) {
          this.allData = response.data.re_sheet_data;
          this.products = [...this.allData];
        } else {
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
    this.router.navigate(['/docs/s002']);

  }

  previewPageShow() {
    

    this.router.navigate(['/docs/s002']);
  }

  getProjectInformation(){
  
  }

  setPageFlg(flg:boolean){
    this.mPageFlg=flg
  }
  


  // 点击父行时，变为可编辑状态
  onRowSelect(event: any, child:any, j: any) {
    const selectedProduct = event;

      // 将之前选中父数据的子数据设为不可编辑
      if (this.selectedRow) {
        this.selectedRow.children.forEach(child => {
          child.isEditable = false;
        });
      
      }
      // 将当前选中的父数据的子数据设为可编辑
      child.isEditable = true;

      this.selectedRow = selectedProduct; // 更新选中的父数据
    // }
  }


  // 在父行的下方添加子数据
  addRow(event: any,product: Product, child:Child) {
    event.stopPropagation();
    const newChild: Child = {
      is_del: false,
    // 統合
    integration_selected: false,
    // 月払
    monthly_payment_selected: false,
    id: 0,
    matter_master_exe_id: product.matter_master_exe_id,
    sb_store: '',
    no: '',
    days: '',
    weekday_weekend : child.weekday_weekend,

    agency_id: product.agency_id,
    agency_name: product.agency_name,
    participating_store: child.participating_store,
    held_date: child.held_date,
    event_location: child.event_location,
    order: '交通費',
    number_people: '',
    item_name: '',
    type_flg: '2',
    event_venue_fee: '',
    transportation_fee: '',
    isEditable: false, // 新增行默认是可编辑的
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
    };
      // 将当前选中的父数据的子数据设为可编辑
      product.children.forEach((child: Child) => {
        child.isEditable = false;
      });
    product.children.push(newChild); // 将新子数据添加到父数据中
  }
  
  // 删除子行
  deleteRow(child: Child, product: Product) {
    const index = product.children.indexOf(child);
    if (index > -1) {
      product.children.splice(index, 1); // 从父数据的子数组中删除该子数据
    }
  }
  isParentSelected: boolean = false; // 是否选中父级

  // 点击父级行
  onParentClick(product: any): void {
    this.isParentSelected = true;
    this.products.forEach((p) => (p.isEditable = false)); // 清除其他父级编辑状态
  }

  // 切换单元格为编辑状态
  toggleEdit(item: any): void {
    item.isEditable = true;
  }
  editingCell: string | null = null; // 保存当前正在编辑的单元格的唯一标识符

  // 失去焦点切换回不可编辑状态
  onBlur(item: any): void {
    item.isEditable = false;
  }
  // 设置编辑单元格
  editCell(cellKey: string): void {
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

    // 获取唯一标识符
  getCellKey(rowIndex: number, childIndex?: number, columnName?: string): string {
    return `${rowIndex}-${childIndex ?? ''}-${columnName ?? ''}`;
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

    this.temporaryName = this.registrationForm.get('month')?.value + '月' +  this.registrationForm.get('week')?.value + '分の見積一時保存'
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
    const dto: S003SeachDto = this.registrationForm.value
    if (!dto.agency) {
      dto.agency = '';
    }
    const holidays = [0, 6];
    // 遍历所有产品
    this.products.forEach((product) => {
      // 遍历每个产品的子数据
      product.children.forEach((child) => {
        if (child.id == 0) {
          const dates = child.held_date.split(',').map((date) => date.trim()); // 拆分日期
          let hasWeekday = false; // 是否有平日
      
          // 判断每个日期是平日还是休日
          dates.forEach((date) => {
            const [month, day] = date.split('/').map(Number);
            const fullDate = new Date(this.registrationForm.get('year')?.value, month - 1, day);
            const dayOfWeek = fullDate.getDay();
      
            // 检查是否是休日（周六或周日）
            if (!holidays.includes(dayOfWeek)) {
              hasWeekday = true; // 如果有平日，标记为平日
            }
          });
      
          // 根据结果设置 `weekday_weekend` 字段
          child.weekday_weekend = hasWeekday ? '平日' : '休日';
        }
      // 判断 `order` 字段包含 "催事場" 或 "交通費"
      if (child.order.includes('催事場')) {
        child.type_flg = '1'; // 催事場对应的 type_flg 设置为 '1'
        if (child.id == 0) {

          child.event_venue_fee = child.transportation_fee
        }
      } else if (child.order.includes('交通費')) {
        child.type_flg = '2'; // 交通費对应的 type_flg 设置为 '2'
      } else {
        child.type_flg = '0'; // 交通費对应的 type_flg 设置为 '2'
        if (child.id == 0) {
          child.number_people = child.transportation_fee
        }

      }
      });
    });
    this.s022Service.temporarySave(this.products, dto, exeName, this.temporarySaveInfoDto).subscribe({
      next: (response) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success', // 成功提示
            summary: '一時保存完了',     // 提示标题
            detail: response.message, // 提示详情
          });
          this.router.navigate(['/docs/s002']);
        } else{
          this.messageService.add({
            severity: 'error', // 错误类型
            summary: 'エラー',   // 标题
            detail: response.message, // 提示详情
          });
        }
        this.loadingService.hide();

      },
      error: (error) => {
        this.loadingService.hide();
        console.error('Failed to add business partner:', error);
      },
    });
      // this.location.back(); // 使用Location服务来导航到上一页
      
  
    }
      
  filterData() {

    if (!this.registrationForm.get('agency')?.value ||this.registrationForm.get('agency')?.value =='-未選択-' ) {

      this.products = [...this.allData];
      return;
    }
    // 筛选代理店数据
    this.products = this.allData.filter(item => item.agency_name === this.registrationForm.get('agency')?.value);
    }
    // 复选框的点击处理
    onCheckboxChange(event: any, row: any) {
    event.stopPropagation();  // 阻止事件向父级传播
  }
      
  // 統合
  mergeRows() {
    // 获取所有选中的数据
    const allSelectedChildren = this.products.flatMap(parent => 
      parent.children.filter(child => child.integration_selected)
    );
  
    // 检查是否至少有两条选中的数据
    if (allSelectedChildren.length < 2) {
      this.messageService.add({
        severity: 'error',
        summary: 'エラー',
        detail: '少なくとも2つのデータを選択してください', // 显示错误信息
      });
      return; // 如果少于两条选中数据，直接退出
    }
    this.products.forEach(parent => {
      const mergedData: any[] = [...parent.children]; // 保留原始顺序
      const selectedChildren = parent.children
        .map((child, index) => ({ ...child, index })) // 添加索引信息
        .filter(child => child.integration_selected);
      // 检查 "代理店名"、"開催店舗" 和 "オーダー" 是否一致
      const hasMismatch = selectedChildren.some((child, _, array) => 
        child.agency_name !== array[0].agency_name ||
        child.participating_store !== array[0].participating_store ||
        child.order !== array[0].order
      );

      if (hasMismatch) {
        this.messageService.add({
          severity: 'error',
          summary: 'エラー',
          detail: '代理店名、開催店舗、オーダーが一致しません', // 显示错误信息
        });
        return;
      }
      if (selectedChildren.length > 0) {
        const groupedChildren = this.groupByOrderAndHeldDate(selectedChildren);
  
        for (let group of groupedChildren) {
          let groupTotal = 0;
  
          group.forEach(child => {
            if (child.integration_selected) {
              groupTotal += parseInt(child.number_people, 10);
            }
          });
  
          // 合并后的子数据
          const mergedChild = {
            ...group[0], // 使用组中的第一个子数据为基础
            number_people: groupTotal.toString(),
            item_name:'',
            integration_selected: false // 取消选中状态
          };
  
          // 找到组中第一个子数据的原始索引
          const firstIndex = group[0].index;
  
          // 替换第一个子数据为合并后的数据
          mergedData[firstIndex] = mergedChild;
  
          // 其余的子数据设置为 null，用于后续清理
          group.slice(1).forEach(child => {
            mergedData[child.index] = null;
          });
        }
  
        // 过滤掉被标记为 null 的数据
        parent.children = mergedData.filter(child => child !== null);
      } else {
        parent.children = mergedData; // 无需处理的情况下保留原数据
      }
    });
  }
        
        
  // 按照 order 和 held_date 分组
  groupByOrderAndHeldDate(children: any[]) {
    let grouped: { [key: string]: any[] } = {};  // 使用索引签名
    children.forEach(child => {
      const key = `${child.order}-${child.held_date}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(child);
    });
    return Object.values(grouped);
  }
      
      
  deleteSelectedChildren() {
    const allSelectedChildren = this.products.flatMap(parent => 
      parent.children.filter(child => child.monthly_payment_selected)
    );
  
    // 检查是否至少有两条选中的数据
    if (allSelectedChildren.length < 2) {
      this.messageService.add({
        severity: 'error',
        summary: 'エラー',
        detail: '少なくとも一つのデータを選択してください', // 显示错误信息
      });
      return; // 如果少于两条选中数据，直接退出
    }
    // 遍历父级数据
    this.products = this.products.filter(parent => {
      // 过滤掉选中的子数据
      parent.children = parent.children.filter(child => !child.monthly_payment_selected);
  
      // 如果子数据为空或只剩 1 条，则删除父级数据
      return parent.children.length > 0; // 保留有子数据的父级
    });
  
    // 确保更新绑定到 p-table 的数据源
    this.products = [...this.products]; // 触发 Angular 变更检测
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
    this.loadingService.show();
    const holidays = [0, 6];
    let all_pdf_data = []
    let input_check = true;
    // all_pdf_data = this.groupAndSumDataWithParent(this.products);
    // 遍历所有产品
    this.products.forEach((product) => {
      // 遍历每个产品的子数据
      product.children.forEach((child) => {
        if (child.id == 0) {
          const dates = child.held_date.split(',').map((date) => date.trim()); // 拆分日期
          let hasWeekday = false; // 是否有平日
      
          // 判断每个日期是平日还是休日
          dates.forEach((date) => {
            const [month, day] = date.split('/').map(Number);
            const fullDate = new Date(this.registrationForm.get('year')?.value, month - 1, day);
            const dayOfWeek = fullDate.getDay();
      
            // 检查是否是休日（周六或周日）
            if (!holidays.includes(dayOfWeek)) {
              hasWeekday = true; // 如果有平日，标记为平日
            }
          });
      
          // 根据结果设置 `weekday_weekend` 字段
          child.weekday_weekend = hasWeekday ? '平日' : '休日';
        }

      // 判断 `order` 字段包含 "催事場" 或 "交通費"
      if (child.order.includes('催事場')) {
        child.type_flg = '1'; // 催事場对应的 type_flg 设置为 '1'
        if (child.id == 0) {

          child.event_venue_fee = child.transportation_fee
          if (!child.transportation_fee) {
            this.messageService.add({
              severity: 'error', // 错误类型
              summary: 'エラー',   // 标题
              detail: '催事場代を入力してください', // 详细信息
            });
            input_check = false;
            return;
          }
        }
      } else if (child.order.includes('交通費')) {
        child.type_flg = '2'; // 交通費对应的 type_flg 设置为 '2'
        if (!child.transportation_fee) {
          this.messageService.add({
            severity: 'error', // 错误类型
            summary: 'エラー',   // 标题
            detail: '交通費を入力してください', // 详细信息
          });
          input_check = false;

          return;
        }
      } else {
        child.type_flg = '0'; // 交通費对应的 type_flg 设置为 '2'
        if (child.id == 0) {
          child.number_people = child.transportation_fee
        }

      }
      });
    });
    all_pdf_data = structuredClone(this.products);
// 追加対応
    all_pdf_data.forEach((product) => {
      // 过滤掉 `is_del` 为 true 的 `child`
      product.children = product.children.filter(child => child.is_del);
    });
    // 如果某个 product 的 children 都被删光了，也可以选择删除整个 product
    all_pdf_data = all_pdf_data.filter(product => product.children.length > 0);
    if (all_pdf_data.length == 0){
      this.messageService.add({
        severity: 'error', // 错误类型
        summary: 'エラー',   // 标题
        detail: '作成対象を選択してください', // 详细信息
      });
      input_check = false;
      this.loadingService.hide();
      return;
    }
// 追加対応
    if (input_check) {

      const dto: S003SeachDto = this.registrationForm.value
      this.s022Service.pdf(all_pdf_data, dto ).subscribe({
        next: (response) => {
          if (response.success) {
            this.messageService.add({
              severity: 'success', // 成功提示
              summary: '見積書発行',     // 提示标题
              detail: response.message, // 提示详情
            });
            this.router.navigate(['/docs/s002']);
          } else {
            this.messageService.add({
              severity: 'error', // 错误类型
              summary: 'エラー',   // 标题
              detail: response.message, // 详细信息
            });
          }
          this.loadingService.hide();
          // this.router.navigate(['/docs/s002']);
        },
        error: (error) => {
          this.loadingService.hide();
          console.error('Failed to add business partner:', error);
        },
      });

    }else{
      this.loadingService.hide();

    }
  }
      
      
  groupAndSumDataWithParent(data: any[]) {
    return data.map(parent => {
      // 创建一个 Map，用于分组子级数据
      const groupedChildren = new Map();
  
      parent.children.forEach((child: Child) => {
        const key = `${child.held_date}-${child.event_location}-${child.order}`;
        if (groupedChildren.has(key)) {
          // 如果已经有该分组，累加 number_people
          groupedChildren.get(key).number_people += parseInt(child.number_people, 10);
        } else {
          // 如果没有该分组，创建新分组
          groupedChildren.set(key, {
            ...child,
            number_people: child.number_people.toString(), // 确保是数字
          });
        }
      });
  
      // 将 Map 转换回数组，并替换原来的 children
      return {
        ...parent,
        children: Array.from(groupedChildren.values()),
      };
    });
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
  checkInput(event: Event, child: any, field: string) {
    const input = (event.target as HTMLInputElement).value;
    const halfWidthNumberRegex = /^[0-9]*$/;
  
    if (!halfWidthNumberRegex.test(input)) {
      this.messageService.add({
        severity: 'warn',
        summary: '注意',
        detail: '半角数字以外の文字が入力されています',
      });
  
      // 清除无效字符，只保留有效的部分
      child[field] = input.replace(/[^0-9]/g, '');
    }
  }
  formatCurrency(value: number): string {
    if (value == null) return ''; // 处理空值情况
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(value);
  }
  toggleSelectAll(event: Event) {
    event.preventDefault(); // 防止页面跳转
      // 遍历所有产品
    this.products.forEach((product) => {
      // 遍历每个产品的子数据
      product.children.forEach((child) => {
        child.is_del = true;
      });
    });
  }
}