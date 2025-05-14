
export interface StoreDto {
    store_name?: string;
    week1?: number;
    week2?: number;
    week3?: number;
    week4?: number;
    week5?: number;
    month?: number;
    isEditable : boolean;
}

export interface S006Dto {
    company_name?: string;
    week1?: number;
    week2?: number;
    week3?: number;
    week4?: number;
    week5?: number;
    month?: number;
    isEditable : boolean;
    stores?: StoreDto[];
}

export interface SearchDto {
    year?: string;
    month?: string;
    agent_id?: number;
}