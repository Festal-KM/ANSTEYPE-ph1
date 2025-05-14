export interface UnitPriceInfoDto {
    /** 主キー */
    id?: number;

    /** 取引先店舗ID */
    partner_store_id?: number;

    /** オーダー */
    order_type?: string;

    /** 単価 */
    unit_price?: string;

    /** 平日週末フラグ */
    week_flag?: number;

    // /** 作成日 */
    // creation_date?: Date;

    // /** 作成者 */
    // creator?: string;

    // /** 最終更新日 */
    // last_update_date?: Date;

    // /** 最終更新者 */
    // last_updater?: string;
}
