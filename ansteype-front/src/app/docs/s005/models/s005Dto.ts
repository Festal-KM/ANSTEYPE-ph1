import { PDFCreationInfoDTO } from "../../s025/models/s025Dto";

export interface PersonDto {
    last_name: string; // 担当者姓
    first_name: string; // 担当者名
    address: string; // アドレス
    type_flag: string; // 種別フラグ
    quotation_claim_creation_id: number; // 見積請求作成ID
}

export interface StoreDto {
    store_name: string; // 店舗名
    estimate_cc_flag: string; // 見積Cc不要フラグ
    same_as_estimate_flag: string; // 見積送付先と同じフラグ
    billing_cc_flag: string; // 請求Cc不要フラグ
    store_address: string; // 店舗アドレス
    persons: PersonDto[]; // 担当者のリスト
    same_as_weekdays_flag: string; // 平日と同じフラグ
}

export interface S005AddDto {
    company_name: string; // 会社名
    company_address: string; // 住所
    stores: StoreDto[]; // 店舗のリスト
}

export interface DeliveryInfoDto {
    id:  string;
    delivery_target: string;
    shipping_address: [];
    company_id:  string;
    company_name: string;
    store_address_settings: [];
    agency_id: string;
    agency_name: string;
    subject_name: string;
    amount:  string;
    estimation_request_type:  string;
    excel_file_name: string;
    pdf_file_name: string;
    file_path: string;
    var_date: string;
    matter_master_exe_id:  string;
    google_excel_name: string;
    google_excel_sheet_name: string;
    del_flag: string;
    conditions_year: string;
    conditions_month: string;
    conditions_week: string;
    conditions_agency: string;
    delivery_status: string;
    drw: [];
    pdf:PDFCreationInfoDTO[];
    send_pdf_file_name: string;
}
export interface DeliveryInfoProduct {
    isExpanded: boolean;
    shipping_address: [];
    shipping_address_all: string;
    company_id:  string;
    company_name: string;
    store_address_settings: [];
    store_address_settings_all: string;
    agency_id:  string;
    agency_name: string;
    subject_name: string;
    amount:  string;
    mail_test: string; // 送付状態
    drw:[];
    quotationClaimCreationInfo: QuotationClaimCreationInfoDto;

    personChargeInfo: PersonChargeInfoDto[];
    children:DeliveryInfoDto[];

}

  
  export interface PDFFileDto {
    content: string; // Base64 encoded string
  }
  
  export interface PersonChargeInfoDto {
    id?: number;
    last_name?: string;
    first_name?: string;
    email?: string;
    type_flag?: string;
  }
  export interface BillingInfo {
    id?: number; // ID
    no?: string; // 項番 (项目编号)
    matter_master_exe_id?: number; // 案件情報取得処理ID (案件信息处理ID)
    rejection?: string; // お断り (拒绝理由)
    staff_operation_details?: string; // スタッフ向け稼働詳細 (面向员工的详细操作信息)
    agent_by_name?: string; // 代理店向けバイネーム (代理店专属名称)
    var_date?: string; // 日付 (日期)
    weekday_weekend?: string; // 平日/週末 (工作日/周末)
    business_trip?: string; // 出張 (是否出差, 1: 是, 0: 否)
    event_location?: string; // イベント実施場所 (活动实施地点)
    location_reservation?: string; // 場所取り (场地预定, 1: 需要, 0: 不需要)
    sb_store?: string; // SB開催店舗 (SB举办店铺)
    agent_id?: number; // 代理店ID
    agent?: string; // 代理店名
    order_type?: string; // オーダー (订单类型)
    by_name?: string; // バイネーム (专属名称)
    sales_memo?: string; // 営業担当メモ (销售负责人备注)
    assign_memo?: string; // アサイン担当メモ (分配负责人备注)
    unit_price?: string; // 単価 (单价)
    days?: number; // 日数 (天数)
    sales?: string; // 売り上げ (销售额)
    creation_possible?: string; // 作成可 (是否可创建, 1: 是, 0: 否)
    estimate_sent?: string; // 見積送付済 (是否已发送报价单, 1: 是, 0: 否)
    bill_sent?: string; // 請求送付済 (是否已发送账单, 1: 是, 0: 否)
    judgment?: string; // 判定 (判定状态)
    existence?: string; // 有無 (有无)
    agent_company_name?: string; // 代理店会社名 (代理公司名称)
    agent_person_in_charge?: string; // 代理店担当者 (代理负责人)
    implementation_schedule?: Date; // 実施日程 (实施日程)
    integration_flag?: string; // 統合フラグ (整合标识, 1: 是, 0: 否)
    monthly_payment_flag?: string; // 月支払いフラグ (月支付标识, 1: 是, 0: 否)
    execution_flag?: string; // 実行済みフラグ (是否已执行, 1: 是, 0: 否)
    item_name?: string; // 品目名 (品目名称)
    count?: number; // 件数 (项目数量)
    master_id?: number; // 案件マスタID (案件主表ID)
    sent_flag?: string; // 送信済みフラグ (是否已发送, 1: 是, 0: 否)
    page_division_1?: string; // ページ分け1 (页面划分1)
    page_division_2?: string; // ページ分け2 (页面划分2)
    tax_exempt?: string; // 非課税 (是否免税, 1: 是, 0: 否)
    email_creation_id?: number; // メール作成ID (邮件创建ID)
    google_excel_name?: string; // googleEXCELファイル名 (Google Excel 文件名)
    google_excel_sheet_name?: string; // googleEXCELファイルシート名 (Google Excel 文件Sheet名称)
    conditions_year?: string; // 取得条件年 (获取条件-年)
    conditions_month?: string; // 取得条件月 (获取条件-月)
    conditions_week?: string; // 取得条件週 (获取条件-周)
    conditions_agency?: string; // 取得条件代理店 (获取条件-代理店)
    subject_name?: string; // 件名 (主题名称)
    amount?: number; // 金額 (金额)
    delivery_info_id?: number; // 送付情報ID (发送信息ID)
    people_number?: number; // 人数 (人数)
    transportation_fee?: number; // 交通費 (交通费)
    event_venue_fee?: number; // 催事場代 (活动场地费)
    type_flg?: string; // 催事場代 (类型标识)
    creation_date?: Date; // 作成日 (创建日期)
    creator?: string; // 作成者 (创建者)
    temporary_save_flg?: string; // 一時保存フラグ (是否暂存, 1: 是, 0: 否)
    last_update_date?: Date; // 最終更新日 (最后更新日期)
    last_updater?: string; // 最終更新者 (最后更新者)
    pdf_id?: number; // pdf_id (PDF 文件 ID)
    preview_update_flg?: string; // プレビュー画面更新フラグ
  }
  
  export interface BillingShowInfo {
    id?: number;
    var_date?: string; // 日付 (日期)
    days?: number; // 日数 (天数)
    unit_price?: string; // 単価 (单价)
    item_name?: string; // 品目名 (品目名称)
    count?: number; // 件数 (项目数量)
    event_location?: string; // イベント実施場所 (活动实施地点)

    tax_exempt?: boolean; // 非課税 (是否免税, 1: 是, 0: 否)
    
    amount?: number; // 金額 (金额)
    
    people_number?: number; // 人数 (人数)
    transportation_fee?: number; // 交通費 (交通费)
    event_venue_fee?: number; // 催事場代 (活动场地费)
    type_flg?: string; // 催事場代 (类型标识)
    preview_update_flg?: string; // プレビュー画面更新フラグ

  }
  export interface QuotationClaimCreationInfoDto {
    id?: number;
    delivery_id?: number;
    subject_1?: string;
    bed?: string;
    subject_2?: string;
    main_text?: string;
    excel_file_name?: string;
    file_path?: string;
    pdf_file_name?: string;
    pdf_file?: PDFFileDto;
    person_charge_info?: PersonChargeInfoDto[];
    billing_info_list: BillingInfo[];
  }
  
    export interface  reS005Dto{
      deliveryInfoDto:DeliveryInfoDto;
      pdfDto:PDFCreationInfoDTO;
    }

    export interface  reS005PdfDto{
      deliveryInfoDto:QuotationClaimCreationInfoDto;
      billingInfo:BillingShowInfo[];
    }