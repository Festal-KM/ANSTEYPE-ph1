export interface PersonChargeInfoDto {
    /** 主キー */
    id?: number;

    /** 担当者姓 */
    last_name?: string;

    /** 担当者名 */
    first_name?: string;

    /** アドレス */
    email?: string;

    /** 種別フラグ */
    type_flag?: number;

    /** 見積請求作成ID */
    quotation_claim_creation_id?: number;

    /** 取引先店舗ID */
    partner_store_id?: number;

    // /** 作成日 */
    // creationDate?: Date;

    // /** 作成者 */
    // creator?: string;

    // /** 最終更新日 */
    // lastUpdateDate?: Date;

    // /** 最終更新者 */
    // lastUpdater?: string;
}
