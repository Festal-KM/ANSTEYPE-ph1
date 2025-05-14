export interface S011Dto {
    id?: number;
    company_name?: string; // 会社名
    company_logo?: string; // 会社ロゴ
    company_file?: string; // 会社ロゴfile
    address_1?: string; // 住所1
    address_2?: string; // 住所2
    bank_name?: string; // 銀行名
    branch_name?: string; // 支店名
    branch_code?: string; // 支店コード
    account_flag?: string; // 口座フラグ
    account_number?: string; // 口座番号
    invoice_number?: string; // インボイス番号
    consumption_tax_rate?: string; // 消費税率
    // creation_date?: string; // 作成日
    // creator?: string; // 作成者
    // last_update_date?: string; // 最終更新日
    // last_updater?: string; // 最終更新者
  }
  