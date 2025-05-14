import { PersonChargeInfoDto } from "../../../shared/models/personChargeInfoDto";
import { UnitPriceInfoDto } from "../../../shared/models/unitPriceInfoDto";

export interface S001Dto {
    // 会社id
    company_id?: number;
    // 会社名
    company_name?: string;
    // 見積総額
    estimation_total?: number;
    // 請求総額
    invoice_total?: number;
    // 店舗のリスト
    stores: storesDto[];
}

export interface storesDto {
    // 店舗ID
    store_id?: number;
    // 店舗名
    store_name?: string;
    // 見積総額
    estimation_total?: number;
    // 請求総額
    invoice_total?: number;
}

export interface SearchDto {
    year?: string;
    month?: string;
}