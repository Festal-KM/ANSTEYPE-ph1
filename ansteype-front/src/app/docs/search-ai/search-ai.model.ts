// ########################### 新規データ取得用 ###########################

export interface Product {
    product_name: string;
    order_no: number;
}

export interface ProductType {
    product_name: string;
    type_detail: string;
    order_no: number;
    type: number;
}

export class Medical {
    line_no: number = -1;
    medical: string = "";
    medicals: string = "";
    constructor() { }
}

export interface InitResult {
    products: Product[];
    types: ProductType[];
    medicals: Medical[];
    chat_id: string;
    conversations: Conversation[];
}

// ########################### 画面フォーム ###########################

export class UIFormData {
    question: string = '';
    gender: number | null = null;
    age: number | null = null;
    medicals: Medical[];

    constructor() {
        this.question = '';
        this.gender = null;
        this.age = null;

        this.medicals = [
            new Medical(),
            new Medical(),
            new Medical(),
            new Medical(),
            new Medical()
        ];
    }
}
// ########################### 画面構成 ###########################

export interface Reference {
    version: string;
    line_no: number;
    medical: string;
    filename: string;
}

export interface Conversation {
    chat_id: string;
    no: string;
    question_time: string;
    question: string;
    answer_time: string;
    answer: string;
    loading?: boolean;
    references?: Reference[]; // 新増的属性
    rating: number;
    message: any[];
    error: boolean;
}

export interface KeyValuePair {
    key: string;
    value: string;
}
