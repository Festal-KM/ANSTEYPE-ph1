import { TemporarySaveInfoDto } from "../../s017/models/s017Dto";

export interface Child {
    is_del:boolean;
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
    days: string;
    order: string;
    number_people: string;
    item_name: string;
    type_flg: string;
    // 催事場代
    event_venue_fee: string;
    // 交通費
    transportation_fee: string;
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
    // 平日/週末
    weekday_weekend :  string; 
    temporary_save_flg: string;
    conditions_year: string;
    conditions_month: string;
    conditions_week: string;
    conditions_agency: string;
  }
  export  interface Product {
    // 統合
    integration_selected:boolean;
    // 月払
    monthly_payment_selected:boolean;
    id: number;
    matter_master_exe_id: number;
    agency_id: number;
    agency_name: string;
    participating_store: string;
    isEditable: false;
    // 開催日
    held_date: string;
    // イベント場所
    event_location: string;

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

  export interface  S003SeachDto {
    year:  string;
    month:  string;
    week:  string;
    // 代理店
    agency: string;
    agency_id: string;

  }
  export interface  reDto{
    s003SearchDto:S003SeachDto;
    products: Product[];
  }
  export interface  reDtoSave{
    s003SearchDto:S003SeachDto;
    products: Product[];
    exeName: string;
  }
  export interface  reDtodDelSave{
    s003SearchDto:S003SeachDto;
    products: Product[];
    temporarySaveInfoDto:TemporarySaveInfoDto;
    exeName: string;
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
