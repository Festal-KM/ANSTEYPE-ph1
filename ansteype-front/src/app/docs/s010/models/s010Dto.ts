import { PersonChargeInfoDto } from "../../../shared/models/personChargeInfoDto";
import { UnitPriceInfoDto } from "../../../shared/models/unitPriceInfoDto";

export interface S010Dto {
    /** 主キー */
    id?: number;

    /** 会社名 */
    company_name?: string;

    /** 住所 */
    company_address?: string;

    stores: storesDto[]; // 店舗のリスト
}

export interface storesDto {
    /** 取引先ID */
    partner_id?: number;

    /** 店舗名 */
    store_name?: string;

    /** 見積Cc不要フラグ */
    estimate_cc_flag?: string;

    /** 見積送付先と同じフラグ */
    same_as_estimate_flag?: string;

    /** 請求Cc不要フラグ */
    billing_cc_flag?: string;

    /** 店舗アドレス */
    store_address?: string;

    /** 平日と同じフラグ */
    same_as_weekdays_flag?: string;

    persons: PersonChargeInfoDto[]; // 担当者のリスト

    unitPrices: UnitPriceInfoDto[]; // 単価情報のリスト
}