export interface QuotationClaimSettingInfoDTO {
    id?: number; // ID
    format?: string; // フォーマット
    issuance_rule?: string; // 発番ルール
    item_name_rule?: string; // 品名記載ルール
    due_month_status?: number; // 振込期限月ステータス
    due_month?: number; // 振込期限月
    due_date_status?: number; // 振込期限日付ステータス
    due_date?: number; // 振込期限日付
    weekend_previous_status?: number; // 土日祝ステータス前営業日
    weekend_next_status?: number; // 土日祝ステータス後営業日
    weekend_ignore_status?: number; // 土日祝ステータス考慮しない
    email_creation_rule?: string; // メール作成ルール
    save_location?: string; // 保存先
    client_company_name?: string; // 取引先会社名
    client_estimate_destination?: string; // 取引先見積送付先
    type_flag?: number; // 種別フラグ
    // creation_date?: Date | null; // 作成日
    // creator?: string; // 作成者
    // last_update_date?: Date | null; // 最終更新日
    // last_updater?: string; // 最終更新者
  }