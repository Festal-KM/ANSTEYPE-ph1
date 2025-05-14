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