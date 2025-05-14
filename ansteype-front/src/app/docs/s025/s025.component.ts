
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { S025Service } from './services/s025service';
import { Product, S025SeachDto } from './models/s025Dto';
import { MONTHS_OPTIONS, YEAR_OPTIONS, WEEK_OPTIONS } from '../../add-ins/common/const';
import { LoadingService } from '../../add-ins/service/loading.service';
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-s025',
    templateUrl: './s025.component.html',
    styleUrl: './s025.component.scss'
})
export class S025Component {
    mPageFlg: boolean = false; 
    registrationForm!: FormGroup;
    years = YEAR_OPTIONS;
    months = MONTHS_OPTIONS;
    weeks = WEEK_OPTIONS;
    products: Product[] = [];
    tableHeight = "0";
    year_list =[]
    selectedItems: any[] = [];
    placeholderAddressA = { value: null };
    placeholderAddressB = { value: null };
    constructor(private router: Router,
      private route: ActivatedRoute,
      private loadingService: LoadingService,
      private s025Service: S025Service,
      private messageService: MessageService,

      private fb: FormBuilder)
   {
  
          this.registrationForm = this.fb.group({
            year: ['', Validators.required],
            month: ['', Validators.required],
            week: [''],
            agency: [''],
  
          });
  
    }
  
    selectedParent: any = null; // 当前选中的父数据
    selectedRow: Product | null = null;
    ngOnInit(): void {
    this.loadingService.show();
    this.s025Service.init().subscribe({
      next: (response) => {

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
    onSeachMast(): void {

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
      const dto: S025SeachDto = this.registrationForm.value
      this.loadingService.show();
          this.s025Service.seach(dto).subscribe({
            next: (response) => {
              if (response.success) {

                this.products = response.data.map((item:any) => {

                  if (item.shipping_address.length == 0) {
                    item.shipping_address = []; // 如果是空字符串，赋值为空数组
                  } else if (item.shipping_address) {
                    item.shipping_address = item.shipping_address.split(',').map((str: string) => str.trim()); // 按逗号分隔并去除多余空格
                  }
                  if (item.store_address_settings.length == 0) {
                    item.store_address_settings = []; // 如果是空字符串，赋值为空数组
                  } else if (item.store_address_settings) {
                    item.store_address_settings = item.store_address_settings.split(',').map((str: string) => str.trim()); // 按逗号分隔并去除多余空格
                  }

                  // 判断 store_name 是否包含斜线
                  if (item.store_name.includes('/')) {
                    const storeNames = item.store_name.split('/').map((name: string) => name.trim());
                    const matchedAddresses = storeNames.map((name: string) => {
                      return item.drw.find((drwItem: any) => drwItem.store_name === name);
                    });

                    // 第一个匹配赋值给 shipping_address，并设置默认选中值
                    item.shipping_address = matchedAddresses[0] ? [{
                      label: matchedAddresses[0].store_name,
                      value: matchedAddresses[0].id?.toString(),
                    }] : [{ value: null }];

                    // 其他匹配的赋值给 store_address_settings，并设置默认选中值
                    item.store_address_settings = matchedAddresses.slice(1).map((addr: any) => {
                      return addr ? {
                        label: addr.store_name,
                        value: addr.id?.toString(),
                      } : { value: null };
                    });
                  } else {
                    // 循环 children 处理 store_name
                    if (item.children && item.children.length > 0) {
                      item.children.forEach((child: any) => {

                          // 如果没有斜线，则直接匹配整个 store_name
                          const matchedAddress = item.drw.find((drwItem: any) => drwItem.store_name === child.store_name);

                        // 将匹配的结果追加到父级的 shipping_address 和 store_address_settings
                        if (matchedAddress) {
                            // 检查是否已经存在相同的 shipping_address
                            const isShippingAddressExists = item.shipping_address.some(
                              (address: any) => address.label === matchedAddress.store_name && address.value === matchedAddress.id?.toString()
                            );

                            if (!isShippingAddressExists) {
                              item.shipping_address.push({
                                label: matchedAddress.store_name,
                                value: matchedAddress.id?.toString(),
                              });
                            }

                            // 检查是否已经存在相同的 store_address_settings
                            // const isStoreAddressSettingsExists = item.store_address_settings.some(
                            //   (address: any) => address.label === matchedAddress.store_name && address.value === matchedAddress.id?.toString()
                            // );

                            // if (!isStoreAddressSettingsExists) {

                            // }
                        }

                      });
                      item.store_address_settings.push({
                        label: "",
                        value: "",
                      });
                    }
                  
                  }
                  let drwr = item.drw.map((item: any) => ({
                            label: item.store_name,
                            value: item.id?.toString(),
                          }));
                  item.drw = drwr
                  return item;
                });
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
      // const dto: S002SeachDto ={
      //   year: '2024',
      //   month: '1',
      //   week: '1',
      //   agency: '',
      // }
      // this.s003Service.seachMast(dto).subscribe({
      //   next: (response) => {
      //     console.log('Business partner added successfully:', response);
      //   },
      //   error: (error) => {
      //     console.error('Failed to add business partner:', error);
      //   },
      // });
      // this.products = [
      //   {
      //     id: 1,
      //     delivery_target: '',
      //     delivery_destination:[],
      //     store_address_setting: [],
      //     agency_name: '株式会社ABC',
      //     subject: '【株式会社ABC】御見積書_2410',
      //     amount: '100000',

      //   },
      //   {
      //       id: 2,
      //       delivery_target: '',
      //       delivery_destination:[],
      //       store_address_setting: [],
      //       agency_name: '株式会社cde',
      //       subject: '【株式会社cde】御見積書_2410',
      //       amount: '100000',
  
      //     },
      //     {
      //       id: 3,
      //       delivery_target: '',
      //       delivery_destination:[],
      //       store_address_setting: [],
      //       agency_name: '株式会社CCC',
      //       subject: '【株式会社CCC】御見積書_2410',
      //       amount: '100000',
  
      //     },
      // ];
      this.tableHeight = '56vh'
    }
    /**
     * 监听编辑完成后的回调（此处为占位方法）
     * @param childRow 子数据
     */
    onEditComplete(childRow: any): void {
  
    }
  
    goBack() {
      // this.location.back(); // 使用Location服务来导航到上一页
      this.router.navigate(['/docs/s002']);
  
    }
  
    previewPageShow() {
      if (this.selectedItems.length == 0) {
        this.messageService.add({
          severity: 'error', // 错误类型
          summary: 'エラー',   // 标题
          detail: 'データを選択してください', // 详细信息
        });
        return
      }
      this.selectedItems.forEach((product) => {
        product.children.forEach((childrenitem:any) => {
          childrenitem.shipping_address = product.shipping_address
          childrenitem.store_address_settings = product.store_address_settings
        });

      });
      const groupedMap = new Map<string, any>();

      this.selectedItems.forEach((product: any) => {
        const key = `${product.agent_name}_${(product.shipping_address || [])
          .map((addr: any) => addr.value)
          .sort()
          .join('_')}`;
      
        if (!groupedMap.has(key)) {
          // 深拷贝 product 基础信息
          groupedMap.set(key, {
            ...product,
            children: [...product.children],
            store_address_settings: [...(product.store_address_settings || [])],
          });
        } else {
          const existing = groupedMap.get(key)!;
      
          // 合并 children
          existing.children.push(...product.children);
      
          // 合并 store_address_settings（去重可选）
          existing.store_address_settings.push(...(product.store_address_settings || []));
        }
      });
      
      const finalGroupedProducts = Array.from(groupedMap.values());
      // store_address_settings 去重（按 id）
      finalGroupedProducts.forEach(product => {
        const seen = new Set<number>();
        product.store_address_settings = product.store_address_settings.filter((s: any) => {
          const id = s.id ?? JSON.stringify(s); // 若没有 id，就 stringify
          if (seen.has(id)) return false;
          seen.add(id);
          return true;
        });
      });

      sessionStorage.setItem('selectedDTOs', JSON.stringify(finalGroupedProducts));
      this.router.navigateByUrl('/docs/s005', {
        state: {
          mode: 'edit',
          selectedDTOs: finalGroupedProducts, // 传递数据集合
        },
      });
    }
  
    getProjectInformation(){
    
    }
  
    setPageFlg(flg:boolean){
      this.mPageFlg=flg
    }
    
  
  // 添加新行（送付先） id: 3,

  // addRow(index: number) {
  //   const newRow = {   
  //     id        : 1, 
  //      delivery_target: '',
  //     delivery_destination:'',
  //     store_address_setting: [],
  //     agency_name: '',
  //     subject: '',
  //     amount: '',};
  //   this.products.splice(index + 1, 0, newRow);
  // }


  // 获取拼接的地址值
  getCombinedAddresses(addresses: any[]) {
    return addresses.map(addr => addr.value).filter(value => value).join(', ');
  }


  // 假设的下拉选项
  addressOptions = [
    { label: '店舗1', value: '店舗1' },
    { label: '店舗2', value: '店舗2' },
  ];

  // 添加新的下拉框（同单元格换行显示）
  // 添加新的下拉框（初次添加两条，以后添加一条）
  addAddress(product: any) {
    if (product.store_address_settings.length==0){
      product.store_address_settings.push({ value: this.placeholderAddressB.value });
      product.store_address_settings.push({ value: '' });
      this.placeholderAddressB.value  = null
    } else {
      product.store_address_settings.push({ value: '' }); // 后续添加一条

    }

}

  // 移除指定的下拉框
  removeAddress(product: any, addrIndex: number) {
    if (product.store_address_settings.length > 1) {
      product.store_address_settings.splice(addrIndex, 1);
    } else if(product.shipping_address.length == 1) {
      product.shipping_address.splice(addrIndex, 1);
      product.shipping_address.push({ value: '' }); // 后续添加一条

    }
  }


  // 添加新的下拉框（同单元格换行显示）
  // 添加新的下拉框（初次添加两条，以后添加一条）
  addAddressD(product: any) {
    if (product.shipping_address.length==0){
      product.shipping_address.push({ value: this.placeholderAddressA.value });
      product.shipping_address.push({ value: '' });
      this.placeholderAddressA.value  = null
    } else {
      product.shipping_address.push({ value: '' }); // 后续添加一条

    }

}

  // 移除指定的下拉框
  removeAddressD(product: any, addrIndex: number) {
    if (product.shipping_address.length > 1) {
      product.shipping_address.splice(addrIndex, 1);
    } else if(product.shipping_address.length == 1) {
      product.shipping_address.splice(addrIndex, 1);
      product.shipping_address.push({ value: '' }); // 后续添加一条

    }
  }


  // 在当前行下方插入一行
  addRowBelow(index: number) {
    const copiedProduct = { ...this.products[index] }; // 深拷贝当前行数据
    copiedProduct.store_address_settings = []; 
    copiedProduct.id = this.generateNewId(); // 为新行生成唯一 ID
    this.products.splice(index + 1, 0, copiedProduct);
  }

  // 删除当前行
  removeRow(index: number) {
    if (this.products.length >= 1) {
      this.products.splice(index, 1);
    }
  }

  // 添加新的下拉框行（换行显示）
  addAddressRow(index: number) {
    this.products[index].store_address_settings.push({ value: '' });
  }

  // 移除指定的下拉框行
  removeAddressRow(product: any, addrIndex: number) {
    if (product.store_address_setting.length > 1) {
      product.store_address_setting.splice(addrIndex, 1);
    }
  }

  // 生成新的唯一 ID
  generateNewId(): number {
    return Math.max(...this.products.map(p => p.id)) + 1;
  }
  // 复选框改变时的事件处理
  onCheckboxChange(item: any): void {

    if (item.delivery_target_chek) {
      // 如果选中，添加到集合
      this.selectedItems.push(item);
    } else {
      // 如果取消选中，从集合中移除
      this.selectedItems = this.selectedItems.filter(selected => selected.agency_name !== item.agency_name);
    }

    console.log('Selected Items:', this.selectedItems);
  }
  // 删除子行
  deleteAllRow() {
    this.loadingService.show();
    let delSelectedItems: any[] = [];
    delSelectedItems = this.products.filter(product => product.is_del);
    this.products = this.products.filter(product => !product.is_del);

    this.s025Service.del_delivery(delSelectedItems).subscribe({
      next: (response) => {
        if (response.success) {

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

  toggleSelectAll(event: Event) {
    event.preventDefault(); // 防止页面跳转
      // 遍历所有产品
    this.products.forEach((product) => {
      // 遍历每个产品的子数据
        product.is_del = true;
    });
  }

  // 送付対象全選択
  deliveryTargetSelectAll(event: Event) {
    event.preventDefault(); // 防止页面跳转
    this.selectedItems = [];
      // 遍历所有产品
    this.products.forEach((product) => {
      // 遍历每个产品的子数据
        product.delivery_target_chek = true;
        this.onCheckboxChange(product)
    });


  }


}