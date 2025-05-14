

  export interface  S027SeachDto {
    year:  string;
    month:  string;
    week:  string;
    // 代理店
    agency: string;
    agency_id: string;

  }

  export  interface DeliveryInfoDto {
    id: number;
    is_del?:boolean;
    sent_date?: string;  // 送付日時
    agency_name?: string; // 代理店名
    store_name?: string; // 店舗名
    subject_name?: string; // 見積件名
    amount?: number; // 見積金額
  }
