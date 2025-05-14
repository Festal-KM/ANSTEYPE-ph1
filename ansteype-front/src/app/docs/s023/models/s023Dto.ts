import { TemporarySaveInfoDto } from "../../s018/models/s018Dto";

export interface Child {
    // 統合
    integration_selected:boolean;
    // 月払
    monthly_payment_selected:boolean;
    id: number;
    matter_master_exe_id: number;
    no: string;
    sb_store: string;
    agency_id: number;
    agency_name: string;
    participating_store: string;
    held_date: string;
    event_location: string;
    order: string;
    number_people: string;
    item_name: string;
    type_flg: string;
    isEditable: boolean;
    // ページ分け
    page_division_1_selected:boolean;
    page_division_2_selected:boolean;
    // 非課税
    tax_free_selected:boolean;
    // googleEXCELファイル名
    google_excel_name: string;
    // googleEXCELファイルシート名
    google_excel_sheet_name: string;
    // 一時保存フラグ
    temporary_save_flg: string;
    conditions_year: string;
    conditions_month: string;
    conditions_week: string;
    conditions_agency: string;
  }
  export  interface Product {

    id: number;
    matter_master_exe_id: number;
    agency_id: number;
    agency_name: string;
    participating_store: string;
    isEditable: false;
    // googleEXCELファイル名
    google_excel_name: string;
    // googleEXCELファイルシート名
    google_excel_sheet_name: string;
    conditions_year: string;
    conditions_month: string;
    conditions_week: string;
    conditions_agency: string;
    children: Child[];  // 使用 Child 类型数组来表示父数据的子项

  }
  export interface AgencyDto {
      /** 主キー */
      id?: number;
  
      /** 会社名 */
      company_name?: string;
  
      /** 住所 */
      address?: string;
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
    company_name: string;
    w1: string;
    w2: string;
    w3: string;
    w4: string;
    w5: string;
  }
  
  export interface Element3 {
    distributor_name: string;
    subject: string;
    amount: string;
  }

  export interface  S023SeachDto {
    year:  string;
    month:  string;
    week:  string;
    // 代理店
    agency: string;
  }

  export interface  MatterMasterInfo {
    id :  string;
    no :  string;
    rejection :  string;
    staff_operation_details :  string;
    agent_by_name :  string;
    var_date :  string;
    weekday_weekend :  string;
    business_trip :  string;
    event_location :  string;
    location_reservation :  string;
    sb_store :  string;
    agent :  string;
    order_type :  string;
    by_name :  string;
    sales_memo :  string;
    assign_memo :  string;
    unit_price :  string;
    days :  string;
    sales :  string;
    creation_possible :  string;
    estimate_sent :  string;
    bill_sent :  string;
    judgment :  string;
    existence :  string;
    agent_company_name :  string;
    agent_person_in_charge :  string;
    implementation_schedule :  string;
    integration_flag :  string;
    monthly_payment_flag :  string;
    execution_flag :  string;
    item_name :  string;
    creation_date :  string;
    creator :  string;
    last_update_date :  string;
    last_updater :  string;
    google_excel_name :  string;
    google_excel_sheet_name :  string;

  }

  export interface Estimate {
    // 開催日
    held_date: string;
    // 品目
    item_name: string;
    // 金額
    amount: string;
  }
  export  interface EstimatesInfo {
    // 代理店名
    agency_name: string;
    // 合計
    all_amount: string;
    // 開催場所
    event_location: string;
    // 課税
    taxation_amount: string;
    // 非課税
    tax_free_amount: string;
    // 消費税
    sales_tax: string;
    children: Estimate[];
  }
// 子 DTO (Child DTO)
export interface DeliveryInfoChildDto {
  id: number; // id
  matter_master_exe_id: number; // 案件情報取得処理ID
  no: string; // No.
  agency_id: string; // 代理店id
  agency_name: string; // 代理店名
  participating_store: string; // 開催店舗
  held_date: string; // 開催日
  event_location: string; // イベント実施場所
  order: string; // オーダー
  number_people: string; // 人数
  item_name: string; // 品目名
  type_flg: string; // type_flg
  is_editable: boolean; // isEditable
  google_excel_name: string; // googleEXCELファイル名
  google_excel_sheet_name: string; // googleEXCELファイルシート名
  temporary_save_flg: string; // 一時保存フラグ
  page_division_1_selected: boolean; // ページ分け1
  page_division_2_selected: boolean; // ページ分け2
  tax_free_selected: boolean; // 非課税
  conditions_year: string; // 取得条件年
  conditions_month: string; // 取得条件月
  conditions_week: string; // 取得条件週
  conditions_agency: string; // 取得条件代理店
  weekday_weekend :  string;
  amount :  string;
  event_venue_fee: string;
  transportation_fee: string;
  days: string;
  pdf_id: number; // pdf_id
  unit_price :  string;
}

// 父 DTO (Product DTO)
export interface DeliveryInfoProductDto {
  id: number; // id
  matter_master_exe_id: number; // 案件情報取得処理ID
  agency_id: number; // 代理店id
  agency_name: string; // 代理店名
  participating_store: string; // 開催店舗
  held_date: string; // 開催日
  item_name: string; // 品目名
  is_editable: boolean; // isEditable
  children: DeliveryInfoChildDto[]; // 子 DTO 列表
  google_excel_name: string; // googleEXCELファイル名
  google_excel_sheet_name: string; // googleEXCELファイルシート名
  conditions_year: string; // 取得条件年
  conditions_month: string; // 取得条件月
  conditions_week: string; // 取得条件週
  conditions_agency: string; // 取得条件代理店
  amount :  string;
  pdf_id: number; // pdf_id
  unit_price :  string;
}

  export interface  reDto{
    s023SearchDto:S023SeachDto;
    products: DeliveryInfoProductDto[];
  }
  export interface  reTemporaryDto{
    s023SearchDto:S023SeachDto;
    temporarySaveInfo: TemporarySaveInfoDto;
  }
  export interface  reDtoSave{
    s023SearchDto:S023SeachDto;
    products: DeliveryInfoProductDto[];
    exeName: string;
  }
  export interface  reDtoDelSave{
    s023SearchDto:S023SeachDto;
    products: DeliveryInfoProductDto[];
    temporarySaveInfoDto:TemporarySaveInfoDto;
    exeName: string;
  }