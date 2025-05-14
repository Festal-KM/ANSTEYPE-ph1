import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { S011Service } from './services/s011service';
import { S011Dto } from './models/s011Dto';
import { environment } from '../../../environments/environment';
import { postalCodeValidator } from '../../shared/validators/validators';
import { LoadingService } from '../../add-ins/service/loading.service';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-s011',
  templateUrl: './s011.component.html',
  styleUrl: './s011.component.scss'
})
export class S011Component implements OnInit {
  s011Form!: FormGroup;
  displayDialog: boolean = false;
  companyLogoUrl: string | null = null; // 画像のURL（プレビュー用）
  company_file_content: string | null = null;

  // 統括管理者flg
  isAdmin: boolean = false;

  constructor(private fb: FormBuilder,
    private loadingService: LoadingService,
    private s011Service: S011Service,
    private app: AppService
  ) { }

  ngOnInit(): void {
    const user = this.app.getCurrentUser();
    this.isAdmin = user?.role === 'admin';

    this.initForm();
    this.loadInitialData();
  }

  initForm(): void {
    this.s011Form = this.fb.group({
      id: [null],
      company_name: ['', Validators.required],
      company_logo: ['', Validators.required],
      company_file: [null],
      address_1: ['', [Validators.required, postalCodeValidator()]],
      address_2: ['', Validators.required],
      bank_name: ['', Validators.required],
      branch_name: ['', Validators.required],
      branch_code: ['', Validators.required],
      account_flag: ['1'],
      account_number: ['', Validators.required],
      invoice_number: ['', Validators.required],
      consumption_tax_rate: ['', Validators.required],
      account_name: ['', Validators.required],
    });

    (this.s011Form.get('company_logo') as any).label = '会社ロゴ';

    if (!this.isAdmin) {
      this.s011Form.controls['company_name'].disable();
      this.s011Form.controls['address_1'].disable();
      this.s011Form.controls['address_2'].disable();
      this.s011Form.controls['invoice_number'].disable();
      this.s011Form.controls['consumption_tax_rate'].disable();
    } else {
      this.s011Form.controls['company_name'].enable();
      this.s011Form.controls['address_1'].enable();
      this.s011Form.controls['address_2'].enable();
      this.s011Form.controls['invoice_number'].enable();
      this.s011Form.controls['consumption_tax_rate'].enable();
    }
  }

  loadInitialData(){
    this.loadingService.show();
    this.s011Service.getBasicSettingInfo().subscribe({
      next: (response) => {
        const data = response.data;
        this.s011Form.patchValue(response.data);
        if (data && data.company_file) {
          // Base64 to Blob URL
          const blob = this.base64ToBlob(data.company_file, 'image/png');
          this.companyLogoUrl = URL.createObjectURL(blob);
        } else {
          this.companyLogoUrl = null;
        }
        this.loadingService.hide();
      },
      error: (err) => {
        this.loadingService.hide();
      },
    });
  }

  base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = Array.from(byteCharacters).map((char) => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }

  save(){
    this.s011Form.markAllAsTouched();
    this.s011Form.updateValueAndValidity();

    if (this.s011Form.valid) {
      this.loadingService.show();
      const dto: S011Dto = this.s011Form.value;

      if (!this.company_file_content) {
        delete dto.company_file;
      }

      this.s011Service.updateBasicSetting(dto).subscribe({
        next: (response) => {
          this.loadingService.hide();
        },
        error: (error) => {
          this.loadingService.hide();
        },
      });
    }
  }

  showDialog() {
    this.displayDialog = true;
  }

/**
 * 子コンポーネントからファイルを受け取る
 * @param file アップロードされたファイル
 */
handleFileUpload(file: File): void {
  this.generatePreviewUrl(file).then((result) => {
    // プレビュー用のURLをフォームに保存
    this.s011Form.patchValue({ company_logo: result.companyLogoUrl });
    this.s011Form.patchValue({ company_file: result.companyFileContent });
    this.displayDialog = false; // 子画面を閉じる
  }).catch((error) => {
    console.error('ファイルの読み込み中にエラーが発生しました:', error);
  });
}

/**
 * ファイルからプレビュー用の画像URLを生成
 * @param file ファイル
 * @returns Promise<{ companyLogoUrl: string, companyFileContent: string }>
 */
private generatePreviewUrl(file: File): Promise<{ companyLogoUrl: string, companyFileContent: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        const companyLogoUrl = reader.result as string; // Base64形式のURLを設定
        const companyFileContent = companyLogoUrl.split(',')[1];

        this.companyLogoUrl = companyLogoUrl;
        this.company_file_content = companyFileContent;
        
        resolve({ companyLogoUrl, companyFileContent });
      } else {
        reject(new Error('ファイルの読み込み結果が無効です'));
      }
    };
    reader.onerror = (error) => {
      reject(error); // ファイル読み込みエラー
    };
    reader.readAsDataURL(file); // ファイルをBase64形式に変換
  });
}

  /**
   * 会社ロゴを削除する
   */
  removeLogo(): void {
    this.companyLogoUrl = null; // プレビューをクリア
    this.s011Form.patchValue({ company_logo: null }); // フォームからURLを削除
    this.s011Form.patchValue({ company_file: null }); // フォームからfileを削除
  }
}
