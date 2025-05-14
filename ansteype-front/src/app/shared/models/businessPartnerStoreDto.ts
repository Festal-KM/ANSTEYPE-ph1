export interface BusinessPartnerStoreDto {
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

    //   /** 作成日 */
    //   creation_date?: Date;

    //   /** 作成者 */
    //   creator?: string;

    //   /** 最終更新日 */
    //   last_update_date?: Date;

    //   /** 最終更新者 */
    //   last_updater?: string;
}
