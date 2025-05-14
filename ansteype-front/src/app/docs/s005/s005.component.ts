
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliveryInfoProduct, QuotationClaimCreationInfoDto, BillingShowInfo, BillingInfo, DeliveryInfoDto } from './models/s005Dto';
import { LoadingService } from '../../add-ins/service/loading.service';
import { S005Service } from './services/s005service';
import { Util } from '../../add-ins/common/util';
import { P005Component } from '../p005/p005.component';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-s005',

  templateUrl: './s005.component.html',
  styleUrl: './s005.component.css'
})
export class S005Component implements OnInit {
  products: DeliveryInfoProduct[] = [];
  pdfSrc: string = '';
  pdfSrcLarge: string = '';
  hoveredRow: any = null;
  selectedRow: any = null;
  registrationForm!: FormGroup;
  lastSelectedProduct: any = null;
  // recipients_to = [{ type: '', name: '', email: '' }]; // 初始化一个输入框组
  // recipients_cc = [{ type: '', name: '', email: '' }]; // 初始化一个输入框组
  hoveredRowIndex: string | null = null;
  selectedRowIndex: string | null = null;
  productRowIndex: string | null = null;
  deliveryInfo!: QuotationClaimCreationInfoDto;
  selectedChildIndex: string | null = null;
  billingInfoList! : BillingShowInfo[];
  puchFlg = false;
  isPdfDialogOpen = false; // 控制弹窗显示
  newFlg = false;
  @ViewChild('pdfPopup') pdfPopup!: P005Component;

  ngOnInit(): void {
    
    this.products = JSON.parse(sessionStorage.getItem('selectedDTOs') || '[]');


    this.loadingService.show();
    let updatedProducts: DeliveryInfoProduct[] = [];
    this.products.forEach(product => {
      if (Array.isArray(product.shipping_address) && product.shipping_address.length > 0) {
        // 复制 product，确保 shipping_address 初始化为空数组
        let newProduct: any = {
          ...product,
          shipping_address: []
        };
        product.shipping_address.forEach(address => {

    
          // 正确使用 push() 方式
          newProduct.shipping_address.push(address);
    
          // **同步 children 里的 shipping_address，但不拆分 children**
          if (Array.isArray(newProduct.children) && newProduct.children.length > 0) {
            newProduct.children = newProduct.children.map((child:any) => {
              // 确保 child.shipping_address 存在，否则初始化为空数组
              let newChild = { ...child, shipping_address: [] };
              newChild.shipping_address.push(address); // 直接 push() 方式赋值
              return newChild;
            });
          }
    
          
        });
        updatedProducts.push(newProduct);
      } else {
        // 如果 shipping_address 为空，则直接保留
        updatedProducts.push(product);
      }
    });
    
    
    // 替换原来的 this.products，确保拆分后的数据生效
    this.products = updatedProducts;
    this.s005Service.getSendMailInfoText(this.products).subscribe({
      next: (response) => {
       
        this.products = response.data;

        

        this.products.forEach(product => {
          // 处理 shipping_address_display
          product.shipping_address_all = product.shipping_address
            ?.map(address => {
              // 在 product.drw 中找到匹配的对象
              const matchingItem = product.drw.find(item => item['value'] === address['value']);
              return matchingItem ? matchingItem['label'] : '';
            })
            .filter(label => label) // 去除未找到匹配项的空值
            .join(', ') || '';
      
          // 处理 store_address_settings_display（类似逻辑）
          product.store_address_settings_all = product.store_address_settings
            ?.map(setting => {
              const matchingItem = product.drw.find(item => item['value'] === setting['value']);
              return matchingItem ? matchingItem['label'] : '';
            })
            .filter(label => label)
            .join(', ') || '';
        });

        this.loadingService.hide();
      },
      error: (error) => {
        this.loadingService.hide();
        console.error('Failed to add business partner:', error);
      },
    });

  }

  constructor(private router: Router,
        private fb: FormBuilder,
        private loadingService: LoadingService,
        private s005Service: S005Service,
        private messageService: MessageService,

        private cdr: ChangeDetectorRef
  ) {
    // this.  pdfSrc = 'assets/layout/images/aa.pdf'; // 确保路径正确

        this.registrationForm = this.fb.group({
          id: [''],
          delivery_id: [''],
          subject_1: [''],
          bed: [''],
          subject_2: [''],
          main_text: [''],
          recipients_to: this.fb.array([]),
          recipients_cc: this.fb.array([]),
        });

        this.registrationForm.valueChanges.subscribe(value => {
          if (this.productRowIndex == null || this.selectedChildIndex == null || this.puchFlg) return;      
          const index = Number(this.productRowIndex); // **确保索引是数字**
          const childIndex = Number(this.selectedChildIndex);
          // **手动更新 `table`（products）中的每个字段**
          // this.products[index].quotationClaimCreationInfo.subject_1 = this.registrationForm.get('subject_1')?.value;
          this.products[index].quotationClaimCreationInfo.bed = this.registrationForm.get('bed')?.value;
          this.products[index].quotationClaimCreationInfo.subject_2 = this.registrationForm.get('subject_2')?.value;
          this.products[index].mail_test = this.registrationForm.get('main_text')?.value;
        
          // **更新 To & Cc**
          this.products[index].personChargeInfo = [
            ...(this.registrationForm.get('recipients_to')?.value || []),
            ...(this.registrationForm.get('recipients_cc')?.value || [])
          ];
          this.products[index].subject_name = this.registrationForm.get('subject_2')?.value;
          this.products[index].children[childIndex].subject_name = this.registrationForm.get('subject_1')?.value;
        });
  }
  get recipients_to(): FormArray {
    return this.registrationForm.get('recipients_to') as FormArray;
  }
  get recipients_cc(): FormArray {
    return this.registrationForm.get('recipients_cc') as FormArray;
  }
  addRecipient(flg: string) {
    if (flg == 'cc') {
      this.add_recipients_cc()
      // this.recipients_cc.push();

    } else {
      this.add_recipients_to()
      // this.recipients_to.push();

    }

  }

  add_recipients_to() {
    const to_mail = this.fb.group({
      id: [0],
      last_name: [''],
      first_name: [''],
      email: [''],
      type_flag: ['1'],
    });
    this.recipients_to.push(to_mail);
  }
  add_recipients_cc() {
    const cc_mail = this.fb.group({
      id: [0],
      last_name: [''],
      first_name: [''],
      email: [''],
      type_flag: ['3'],
    });
    this.recipients_cc.push(cc_mail);
  }
  remove_recipients_to(index: number) {
    this.recipients_to.removeAt(index);
  }
  remove_recipients_cc(index: number) {
    this.recipients_cc.removeAt(index);
  }
  previewPageShow() {
  }
  goBack() {
    this.router.navigate(['/docs/s025']);


  }

  // 一時保存
  temporarySave(){

  }

  toggleExpand(product: any, rowIndex: number, event: Event) {
    event.stopPropagation(); // 防止点击展开时触发选中
    product.isExpanded = !product.isExpanded;
  }

  selectRow(rowIndex: any, pdf: any, child: any, product: any, productRowIndex:any, childIndex: any) {
    this.loadingService.show();
    console.log('Selected Row Index:', rowIndex); // 调试输出
    this.selectedRowIndex = rowIndex;
    this.productRowIndex = productRowIndex
    this.selectedChildIndex = childIndex
    child.shipping_address = product.shipping_address
    child.store_address_settings = product.store_address_settings
    this.selectedRow = { pdf, child, product };

    this.s005Service.getSendMailInfo(child, pdf).subscribe({
      next: (response) => {
          this.puchFlg = true;
          this.recipients_to.clear();
          this.recipients_cc.clear();
          this.deliveryInfo = response.data;
          this.billingInfoList = this.setBillingShowInfo(response.data.billing_info_list)

        // 处理 Base64 PDF 数据
        if (response.data.pdf_file?.content) {
          
          product.quotationClaimCreationInfo.main_text = product.mail_test
          product.quotationClaimCreationInfo.subject_1 = child.subject_name
          product.quotationClaimCreationInfo.person_charge_info = product.personChargeInfo
          // this.registrationForm.reset();
          this.registrationForm.patchValue(product.quotationClaimCreationInfo)
          this.registrationForm.get('main_text')?.setValue(product.mail_test)
          this.registrationForm.get('subject_1')?.setValue(child.subject_name)
          this.registrationForm.get('subject_2')?.setValue(this.getSubjectName(product.subject_name))
          this.pdfSrc = Util.base64ToUrl(response.data.pdf_file.content, 'application/pdf');
          this.pdfSrcLarge = Util.base64ToUrl(response.data.pdf_file.content, 'application/pdf');
          // if (response.data.person_charge_info.length > 0) {
          //   let toEmail = response.data.person_charge_info[0]
          //   const firstItem = this.fb.group({
          //     id: [toEmail.id],
          //     last_name: [toEmail.last_name],
          //     first_name: [toEmail.first_name],
          //     email: [toEmail.email],
          //     type_flag: ['1'],
          //   });
          //   this.recipients_to.push(firstItem);
            // }


            product.personChargeInfo.forEach((item:any,index:any) => {


              if (item.type_flag != '3') {
                const firstItem = this.fb.group({
                  id: [item.id],
                  last_name: [item.last_name],
                  first_name: [item.first_name],
                  email: [item.email],
                  type_flag: ['1'],
                });
                this.recipients_to.push(firstItem);
              } else {
                const mail_item = this.fb.group({
                  id: [item.id],
                  last_name: [item.last_name],
                  first_name: [item.first_name],
                  email: [item.email],
                  type_flag: ['3'],
                });
                this.recipients_cc.push(mail_item);

              }

            });
            if (product.personChargeInfo.length == 0) {
              const firstItem = this.fb.group({
                id: [0],
                last_name: [""],
                first_name: [""],
                email: [""],
                type_flag: ['1'],
              });
              this.recipients_to.push(firstItem);
              const mail_item = this.fb.group({
                id: [0],
                last_name: [""],
                first_name: [""],
                email: [""],
                type_flag: ['3'],
              });
              this.recipients_cc.push(mail_item);
            } else if (product.personChargeInfo.length == 1) {
              const mail_item = this.fb.group({
                id: [0],
                last_name: [""],
                first_name: [""],
                email: [""],
                type_flag: ['3'],
              });
              this.recipients_cc.push(mail_item);
            }
            this.puchFlg = false;
        } else {
          this.pdfSrc = ''; // 确保 pdfSrc 是有效类型
          this.pdfSrcLarge = '';

        }
        this.lastSelectedProduct = product;
        this.loadingService.hide();
      },
      error: (error) => {
        this.loadingService.hide();
        console.error('Failed to add business partner:', error);
      },
    });
  }
  ngOnDestroy(): void {
    if (this.pdfSrc) {
      URL.revokeObjectURL(this.pdfSrc); // 释放 URL
    }
    if (this.pdfSrcLarge) {
      URL.revokeObjectURL(this.pdfSrcLarge); // 释放 URL
    }

  }
  base64ToBlobUrl(base64: string, mimeType: string): string {
    const byteCharacters = atob(base64);
    const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    return URL.createObjectURL(blob);
  }

  saveEmailInof() {
    if (this.productRowIndex === null) return;
    this.loadingService.show();

    const index = Number(this.productRowIndex); // **确保索引是数字**
    const childIndex = Number(this.selectedChildIndex);
    // **手动更新 `table`（products）中的每个字段**
    // this.products[index].quotationClaimCreationInfo.subject_1 = this.registrationForm.get('subject_1')?.value;
    // this.products[index].quotationClaimCreationInfo.bed = this.registrationForm.get('bed')?.value;
    // this.products[index].quotationClaimCreationInfo.subject_2 = this.registrationForm.get('subject_2')?.value;
    // this.products[index].mail_test = this.registrationForm.get('main_text')?.value;
  
    // // **更新 To & Cc**
    // this.products[index].personChargeInfo = [
    //   ...(this.registrationForm.get('recipients_to')?.value || []),
    //   ...(this.registrationForm.get('recipients_cc')?.value || [])
    // ];
    // this.products[index].subject_name = this.registrationForm.get('subject_2')?.value;
    // this.products[index].children[childIndex].subject_name = this.registrationForm.get('subject_1')?.value;
    this.s005Service.setPdfinfo(this.deliveryInfo, this.billingInfoList).subscribe({
      next: (response) => {
        this.pdfSrc = Util.base64ToUrl(response.data.pdf_file.content, 'application/pdf');
        this.pdfSrcLarge = Util.base64ToUrl(response.data.pdf_file.content, 'application/pdf');
        this.products[index].children[childIndex].amount = response.data.all_amount;

        let allChildAmount = 0;
        this.products[index].children.forEach((item:DeliveryInfoDto,index:any) => {
          allChildAmount += Number(item.amount)

        });
        this.products[index].amount = allChildAmount.toString();

        this.loadingService.hide();
      },
      error: (error) => {
        this.loadingService.hide();
        console.error('Failed to add business partner:', error);
      },
    });

  }
  sendEmail() {
    this.loadingService.show();
    // if (this.productRowIndex != null){
    //   const index = Number(this.productRowIndex); // **确保索引是数字**
    //   // **手动更新 `table`（products）中的每个字段**
    //   this.products[index].quotationClaimCreationInfo.subject_1 = this.registrationForm.get('subject_1')?.value;
    //   this.products[index].quotationClaimCreationInfo.bed = this.registrationForm.get('bed')?.value;
    //   this.products[index].quotationClaimCreationInfo.subject_2 = this.registrationForm.get('subject_2')?.value;
    //   this.products[index].mail_test = this.registrationForm.get('main_text')?.value;
    
    //   // **更新 To & Cc**
    //   this.products[index].personChargeInfo = [
    //     ...(this.registrationForm.get('recipients_to')?.value || []),
    //     ...(this.registrationForm.get('recipients_cc')?.value || [])
    //   ];
    //   this.products[index].subject_name = this.registrationForm.get('subject_1')?.value;
    // }


    this.s005Service.sendMail(this.products).subscribe({
      next: (response) => {
        this.router.navigate(['/docs/s002']);

        this.loadingService.hide();
      },
      error: (error) => {
        this.loadingService.hide();
        console.error('Failed to add business partner:', error);
      },
    });

  }
  generateRowId(rowIndex: number, childIndex: number): string {
    return `${rowIndex}-${childIndex}`;
  }

  adjustHeight(textArea: HTMLTextAreaElement) {
    textArea.style.height = 'auto'; // まず高さをリセットする
    if (textArea.scrollHeight <= 300) {
      textArea.style.height = 300 + 'px'; // スクロールバーが出ない場合はそのままの高さにする
    } else {
      textArea.style.height = Math.min(textArea.scrollHeight, 300) + 'px'; // 再設定して適切な高さに調整する
    }
  }

  handleEnterKey(event: KeyboardEvent, textArea: HTMLTextAreaElement) {
    if (event.key === 'Enter') {
      event.preventDefault(); // 阻止默认换行行为
  
      const start = textArea.selectionStart;
      const end = textArea.selectionEnd;
      const value = textArea.value;
  
      // 在光标处插入换行符
      textArea.value = value.substring(0, start) + '\n' + value.substring(end);
  
      // 设置光标位置到新行
      textArea.selectionStart = textArea.selectionEnd = start + 1;
  
      // 调整高度
      this.adjustHeight(textArea);
    }
  }

  getSubjectName(subject: string): string {
    if (!subject) return '';
    return subject.replace(/_平日.*|_週末.*/g, '');  // 删除 "_平日" 或 "_週末" 之后的所有内容
  }
  openPdfViewer() {
    this.pdfPopup.pdfSrcLarge = this.pdfSrc; // 传递 PDF URL
    this.pdfPopup.open();
  }

  formatCurrency(value: number): string {
    if (value == null) return ''; // 处理空值情况
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(value);
  }

  setBillingShowInfo(value: BillingInfo[]): BillingShowInfo[] {
    let billingShowInfoList: BillingShowInfo[] = [];
    let peopleNumber = 0
    value.forEach(element => {
      if (element.type_flg =='0' &&  !(element.item_name?.includes('端数'))) {
        peopleNumber += (element.days || 1) * (element.people_number || 1)

      }
        if (element.type_flg == '4' && !this.newFlg) {
          this.newFlg = true;
        }
    });
    value.forEach(element => {
      let billingShowInfo: BillingShowInfo = {
        id: element.id,
        days: element.days, // 日数 (天数)
        var_date: element.var_date,
        unit_price: element.unit_price,
        item_name: element.item_name,
        count: element.count,
        tax_exempt: element.tax_exempt === '1',
        event_location: element.event_location,
        transportation_fee: element.transportation_fee,
        event_venue_fee: element.event_venue_fee,
        type_flg: element.type_flg,
        preview_update_flg: element.preview_update_flg,
      };
      if (element.preview_update_flg == '1') {
        if (element.type_flg=='0') {
          billingShowInfo.people_number = element.people_number
          billingShowInfo.amount= element.amount
        } else if (element.type_flg=='1') {
          billingShowInfo.people_number = element.people_number
          billingShowInfo.amount= (element.event_venue_fee||1) * (element.people_number||1)
  
        } else if (element.type_flg=='2') {
          if (this.newFlg) {
            billingShowInfo.people_number = element.people_number
            billingShowInfo.amount =  (element.people_number||1) * (element.event_venue_fee||1)
          } else {
            billingShowInfo.people_number = element.people_number
            billingShowInfo.amount =  (element.people_number||1) * (element.transportation_fee||1)
          }

        } else if (element.type_flg=='4') {
          billingShowInfo.people_number = element.people_number
          billingShowInfo.amount =  element.amount}
     
      } else {
        if (element.type_flg=='0') {
          billingShowInfo.people_number = (element.days || 1) * (element.people_number|| 1)
          billingShowInfo.amount= element.amount
        } else if (element.type_flg=='1') {
          billingShowInfo.people_number = (element.days||1)
          billingShowInfo.amount= (element.event_venue_fee||1) * (element.days||1)
  
        } else if (element.type_flg=='2') {
          if (peopleNumber == 0){
            billingShowInfo.people_number = element.people_number
            billingShowInfo.amount =  (peopleNumber||1) * (element.transportation_fee||1)
          } else {
            billingShowInfo.people_number = peopleNumber
            billingShowInfo.amount =  (peopleNumber||1) * (element.transportation_fee||1)
          }

        } else if (element.type_flg=='4') {
          billingShowInfo.people_number = element.people_number
          billingShowInfo.amount =  element.amount
        }
      
      }

      billingShowInfoList.push(billingShowInfo);
    });
  
    return billingShowInfoList;
  }
  // 监听输入框变化
  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.dataset['billing']) {
      this.calculateAmount(JSON.parse(target.dataset['billing']));
    }
  }
  calculateAmount(billing: any): void {
    let unitPrice = 0;
    let quantity = 0;
  
    switch (billing.type_flg) {
      case '0' :
        if (!(billing.item_name?.includes('端数'))){
          unitPrice = billing.unit_price || 0;
          quantity = billing.people_number || 0;
          break;
        } else {
          unitPrice = billing.unit_price || 0;
          quantity = billing.days || 0;
          break;
        }

      case '1':
        // if(billing.preview_update_flg == '1') {
          unitPrice = billing.event_venue_fee || 0;
          quantity = billing.people_number || 0;
        // } else {
        //   unitPrice = billing.event_venue_fee || 0;
        //   quantity = billing.days || 0;
        // }
        // unitPrice = billing.event_venue_fee || 0;
        // quantity = billing.days || 0;
        break;
      case '2':
        unitPrice = billing.transportation_fee || 0;
        quantity = billing.people_number || 0;
        break;

      case '4':
        // if(billing.preview_update_flg == '1') {
          unitPrice = billing.event_venue_fee || 0;
          quantity = billing.people_number || 0;
          break;
      default:
        unitPrice = 0;
        quantity = 0;
    }
  
    billing.amount = unitPrice * quantity;
  
    // 手动触发变更检测，确保界面更新
    this.cdr.detectChanges();
  }
}