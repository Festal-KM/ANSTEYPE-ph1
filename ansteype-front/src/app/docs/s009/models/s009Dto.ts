export interface PersonDto {
    last_name: string; // 担当者姓
    first_name: string; // 担当者名
    address: string; // アドレス
    type_flag: string; // 種別フラグ
    quotation_claim_creation_id: number; // 見積請求作成ID
}
export  interface  PDFCreationInfoDTO{
  id: number;
  delivery_id:number;
  excel_file_name: string;
  file_path: string;
  pdf_file_name: string;
  google_file_path: string;
  pdf_amount: string;
  send_pdf_file_name: string;
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

export interface S009AddDto {
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
    send_pdf_file_name: string;
    drw: []
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
    mail_test:  string;
    drw:[];
    children:DeliveryInfoDto[];
    quotationClaimCreationInfo: QuotationClaimCreationInfoDto;

    personChargeInfo: PersonChargeInfoDto[];
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
  }
  export interface  reS009Dto{
    deliveryInfoDto:DeliveryInfoDto;
    pdfDto:PDFCreationInfoDTO;
  }