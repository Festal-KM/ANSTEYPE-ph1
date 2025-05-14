import { PDFCreationInfoDTO } from "../../s025/models/s025Dto";

  export  interface Product {
    // id: number;               
    // delivery_target: string;  // 送付対象
    // deliveryDestinationId: any[]; // 送付先
    // store_address_settingId: any[];// 店舗アドレス設定
    delivery_target_chek: boolean;  // 送付対象

    id: number;
    delivery_flg: string; // 送付対象
    shipping_address: any[]; // 送付先
    company_id: number; // 会社id
    company_name: string; // 会社名
    store_address_settings: any[]; // 店舗アドレス設定
    agent_id: number; // 代理店id
    agent_name: string; // 代理店名
    subject_name: string; // 件名
    amount: number; // 金額
    store_id: number; // 店舗ID
    store_name: string; // 店舗名
    week1_amount: number; // 第1週合計金額
    week2_amount: number; // 第2週合計金額
    week3_amount: number; // 第3週合計金額
    week4_amount: number; // 第4週合計金額
    week5_amount: number; // 第5週合計金額
    estimation_request_type: number; // 見積請求区分（例: 見積または請求）
    excel_file_name: string; // PDF作成ファイル名
    pdf_file_name: string; // PDF作成ファイル名
    file_path: string; // PDF作成パス
    var_date: string; // 日付
    matter_master_exe_id: number; // 案件情報取得処理ID
    google_excel_name: string; // googleEXCELファイル名
    google_excel_sheet_name: string; // googleEXCELファイルシート名
    creation_date: string; // 作成日
    creator: string; // 作成者
    del_flg: string; // 削除フラグ
    last_update_date: string; // 最終更新日
    last_updater: string; // 最終更新者
    conditions_year: string; // 取得条件年
    conditions_month: string; // 取得条件月
    conditions_week: string; // 取得条件週
    conditions_agency: string; // 取得条件代理店
    delivery_status: string; // 送付状態
    mail_test: string; // 送信内容")
    pdf:PDFCreationInfoDTO[]

    drp: [];
  }
  






  export interface  S026SeachDto {
              year:  string;
              month:  string;
              week:  string;
              agency: string;
  }