export interface S024Dto {
  subject?: string;
  agent: ItemDict;
  totalAmount?: number;
  filePath?: string;
  file?: string;
  products: ItemDto[]; // 担当者のリスト
}

export interface ItemDto {
  implementationSchedule?: string;
  store?: ItemDict;
  itemName?: string;
  unitPrice?: number;
  count?: number;
  amount?: number;
  noTax?:boolean
}

export interface ItemDict {
  label: string;
  value: number;
}
  