import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { S020Dto } from './models/s020Dto';
import { LoadingService } from '../../add-ins/service/loading.service';
import { sameYearMonthWeekValidator } from '../../shared/validators/validators';
import { S020Service } from './services/s020service';

@Component({
    selector: 'app-s020',
    templateUrl: './s020.component.html',
    styleUrl: './s020.component.scss'
})
export class S020Component implements OnInit {
    s020Form!: FormGroup;
    s020Dto!: S020Dto;
    agents = [];
    stores = [];
    storesMap: { [key: number]: [] } = {};
    displayDialog: boolean = false;
    file?: File;
    selectedItems: any[] = [];
    tax: number = 10
    constructor(private fb: FormBuilder,
        private router: Router,
        private loadingService: LoadingService,
        private s020Service: S020Service) {
    }

    ngOnInit(): void {
        this.loadingService.show();
        this.initForm();
        this.s020Service.init().subscribe({
            next: (response) => {
                this.agents = response.data.agent_list.map((agent: any) => ({
                    label: agent.company_name,
                    value: agent.id,
                }));

                this.tax = Number(response.data.tax);
        
                response.data.agent_list.forEach((agent: any) => {
                    this.storesMap[agent.id] = agent.stores.map((store: any) => ({
                        label: store.store_name,
                        value: store.store_id,
                    }));
                });
                this.loadingService.hide();
            },
            error: (error) => {
                this.loadingService.hide();
                console.error('Failed to add business partner:', error);
            },
        });
    }

    initForm(){
        this.s020Form = this.fb.group({
            subject: ['', Validators.required], // 件名
            agent: [0, Validators.required], // 代理店名
            totalAmount: ['', Validators.required], // 見積総額
            filePath: [''],
            file: [null],
            products: this.fb.array([]) // 品目
        });
        (this.s020Form.get('filePath') as any).label = 'ファイル';
        this.addProduct();
    }

    // get品目 FormArray
    get products(): FormArray {
        return this.s020Form.get('products') as FormArray;
    }

    // add品目
    addProduct(): void {
        const newProduct = this.fb.group({
            implementationSchedule: ['', [Validators.required]],
            store: [0, Validators.required],
            itemName: ['', Validators.required],
            unitPrice: ['', Validators.required],
            count: ['', Validators.required],
            amount: ['', Validators.required],
            noTax:[false]
        });

        this.products.push(newProduct);

        //   newProduct.markAllAsTouched();
        //   newProduct.updateValueAndValidity();
    }

    // delete品目
    removeProduct(index: number): void {
        this.products.removeAt(index);
        this.calculateTotalAmount();
    }

    getProductLength(): number {       
        return this.products.length;
    }

    onNoTaxClick(): void {
        setTimeout(() => {
            this.calculateTotalAmount(); 
        });
    }

    onChangeImplementationSchedule(event: Event, index: number): void {
        const input = event.target as HTMLInputElement;
        const control = this.products.at(index).get('implementationSchedule');
        const firstControl = this.products.at(0).get('implementationSchedule');
    
        // 日付フォーマットのチェック（YY/MM/DD 形式、複数可）
        const datePattern = /^\d{2}\/\d{2}\/\d{2}(?:,\d{2}\/\d{2}\/\d{2})*$/;
        if (!datePattern.test(input.value)) {
            control?.setErrors({ implementationScheduleFormat: '日付は YY/MM/DD 形式で入力してください。（例：24/01/31 または 24/02/01,24/03/15）' });
            return;
        }
    
        if (control && firstControl) {
            // 入力値の分割
            const inputDates = input.value.split(',').map(date => this.convertToDate(date));
            const firstDates: Date[] = firstControl.value.split(',').map((date: string) => this.convertToDate(date));
    
            if (!input.value) {
                control.setErrors({ required: true });
                return;
            }
    
            const firstDate = firstDates[0]; // 基準となる最初の開催日
    
            for (const inputDate of inputDates) {
                if (firstDate.getFullYear() !== inputDate.getFullYear()) {
                    control.setErrors({ notSameYear: '入力された開催日は同じ年に属していません。' });
                    return;
                }
                if (firstDate.getMonth() !== inputDate.getMonth()) {
                    control.setErrors({ notSameMonth: '入力された開催日は同じ月に属していません。' });
                    return;
                }
                if (this.getWeekNumber(firstDate) !== this.getWeekNumber(inputDate)) {
                    control.setErrors({ notSameWeek: '入力された開催日は同じ週に属していません。' });
                    return;
                }
            }
    
            // すべての条件を満たした場合はエラーをクリア
            control.setErrors(null);
        }
    }
    
    // YY/MM/DD を Date オブジェクトに変換
    convertToDate(dateStr: string): Date {
        const [yy, mm, dd] = dateStr.split('/').map(Number);
        const fullYear = yy + 2000; // 2000年以降を想定
        return new Date(fullYear, mm - 1, dd);
    }
      
    private getWeekNumber(date: Date): number {
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const firstWeekday = (firstDayOfMonth.getDay() + 1) % 7; // 月初的星期天数（周日=0）
    
        const dayOfMonth = date.getDate(); // 获取日期是几号
        return Math.floor((dayOfMonth + firstWeekday - 1) / 7) + 1;
    }

    // 金額 (auto)
    calculateAmount(index: number): void {
        const product = this.products.at(index);
        const unitPrice = parseFloat(product.get('unitPrice')?.value || '0');
        const count = parseFloat(product.get('count')?.value || '0');
        const amount = unitPrice * count;
        product.get('amount')?.setValue(amount.toFixed(0));
        this.calculateTotalAmount();
    }

    // 見積総額
    calculateTotalAmount(): void {
        const total = this.products.controls.reduce((sum, product) => {
            let amount = parseFloat(product.get('amount')?.value || '0');
            if (!product.get('noTax')?.value) { // 課税対象なら税を加算
                amount += amount * (this.tax / 100);
            }
            return sum + amount;
        }, 0);
        this.s020Form.get('totalAmount')?.setValue(total.toFixed(0));
    }

    goBack() {
        this.router.navigate(['/docs/s006']);
    }

    showDialog() {
        this.s020Form.get('filePath')?.setErrors(null);
        if (this.s020Form.get('filePath')?.value === "") {
            this.s020Form.get('filePath')?.setErrors({ yesFile: true });
        }
        this.s020Form.markAllAsTouched();
        this.s020Form.updateValueAndValidity();

        if (this.s020Form.invalid) {
            return;
        }

        const formValue = this.s020Form.value;
        this.s020Dto = {
            subject: formValue.subject,
            agent: formValue.agent,
            totalAmount: formValue.totalAmount,
            filePath: this.file?.name,
            file: formValue.file,
            products: this.products.value,
        };

        this.displayDialog = true;
    }

    executeCreation() {
        this.s020Form.get('filePath')?.setErrors(null);
        if (this.s020Form.get('filePath')?.value !== "") {
            this.s020Form.get('filePath')?.setErrors({ noFile: true });
        }
        this.s020Form.markAllAsTouched();
        this.s020Form.updateValueAndValidity();

        if (this.s020Form.invalid) {
        return;
        }

        this.loadingService.show();
        const formValue = this.s020Form.value;
        const dto: S020Dto = {
            subject: formValue.subject,
            agent: formValue.agent,
            totalAmount: formValue.totalAmount,
            filePath: this.file?.name,
            file: formValue.file,
            products: this.products.value,
        };

        this.s020Service.executeCreation(dto).subscribe({
            next: (response) => {
                this.loadingService.hide();
                if (response.success) {
                    // this.selectedItems= response.data;

                    this.selectedItems= response.data.map((item:any) => {

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
                    this.selectedItems.forEach((product) => {
                        product.children.forEach((childrenitem:any) => {
                          childrenitem.shipping_address = product.shipping_address
                          childrenitem.store_address_settings = product.store_address_settings
                        });
                
                      });
                    sessionStorage.setItem('selectedDTOs', JSON.stringify(this.selectedItems));
                    this.router.navigateByUrl('/docs/s009', {
                        state: {
                        mode: 'edit',
                        selectedDTOs: this.selectedItems,
                        },
                    });
                }
                
            },
            error: (error) => {
                this.loadingService.hide();
            },
        });
    }

    onSave() {
        this.displayDialog = false;
        this.loadingService.show();
        this.s020Service.save(this.s020Dto).subscribe({
            next: (response) => {
                this.loadingService.hide();
                this.router.navigate(['/docs/s006']);
            },
            error: (error) => {
                this.loadingService.hide();
            },
        });
    }

    onAgentChange(agent: any): void {
        const agentId = agent.value;
        if (agentId === 0) {
            this.s020Form.get('agent')?.setErrors({ required: true });  
        } 
        this.stores = this.storesMap[agentId] || [];
    }

    onDragOver(event: DragEvent): void {
        event.preventDefault();
    }

    onFileDrop(event: DragEvent): void {
        // ドロップ動作中のデフォルト動作を防止します。
        event.preventDefault();
    
        // ドロップされたファイルが存在するか確認します。
        if (event.dataTransfer?.files?.length) {
            // ドロップされた最初のファイルを取得します。
            const file = event.dataTransfer.files[0];
            const fileControl = this.s020Form.get('file');

            if (!this.isPdfFile(file)) {
                fileControl?.setErrors({ notPdf: true });
                fileControl?.markAsTouched();
                fileControl?.markAsDirty();
                return;
            }
            this.file = file;
            fileControl?.setErrors(null);
            fileControl?.markAsTouched();
            fileControl?.markAsDirty();
    
            // ファイルを読み込んでフォームに反映します。
            this.processFile(this.file)
                .then((fileData) => {
                    // フォームにファイルパスを設定します。
                    this.s020Form.patchValue({ filePath: this.file?.name });
    
                    // フォームにファイルの内容を設定します。
                    this.s020Form.patchValue({ file: fileData });
                })
                .catch((error) => {
                    console.error("ファイルの処理中にエラーが発生しました: ", error);
                });
        }
    }

    onFileChange(event: any): void {
        // ファイル選択イベントから最初のファイルを取得します。
        const file = event.target.files[0];
        const fileControl = this.s020Form.get('file');
    
        if (file) {
            if (!this.isPdfFile(file)) {
                fileControl?.setErrors({ notPdf: true });
                fileControl?.markAsTouched();
                fileControl?.markAsDirty();
                return;
            }

            // 選択されたファイルを保持します。
            this.file = file;
            fileControl?.setErrors(null);
            fileControl?.markAsTouched();
            fileControl?.markAsDirty();
    
            // ファイルを読み込んでフォームに反映します。
            this.processFile(file)
                .then((fileData) => {
                    // フォームにファイルパスを設定します。
                    this.s020Form.patchValue({ filePath: this.file?.name });
    
                    // フォームにファイルの内容を設定します。
                    this.s020Form.patchValue({ file: fileData });
                })
                .catch((error) => {
                    console.error("ファイルの処理中にエラーが発生しました: ", error);
                });
        }
    }
    
    removeFile(): void {
        // ファイルを削除します。
        this.file = undefined;
    
        // フォームのファイルパスを空にします。
        this.s020Form.patchValue({ filePath: "" });
        this.s020Form.patchValue({ file: null });
    }
    
    private processFile(file: File): Promise<string | ArrayBuffer | null> {
        // ファイルを非同期で読み込み、Promiseで結果を返します。
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
    
            // ファイル読み込みが成功した場合の処理。
            reader.onload = () => {
                const readerResult = reader.result as string
                const filedata = readerResult.split(',')[1];
                resolve(filedata);
            };
    
            // ファイル読み込み中にエラーが発生した場合の処理。
            reader.onerror = () => {
                reject(reader.error);
            };
    
            // ファイルを読み込みます（ここではテキストまたはバイナリデータとして）。
            reader.readAsDataURL(file); // Base64形式で読み込み
        });
    }

    private isPdfFile(file: File): boolean {
        return file.type === 'application/pdf';
    }
}
