import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-s021',
  templateUrl: './s021.component.html',
  styleUrl: './s021.component.scss'
})
export class S021Component {
  storeData = { name: '', estimatePerson: '', invoicePerson: '' };

  @Output() updateStore = new EventEmitter<any>();

  // 点击更新按钮，发射数据
  updateStoreData() {
    this.storeData = {
      name: '新しい店舗',
      estimatePerson: '見積担当者',
      invoicePerson: '請求担当者',
    };
    this.updateStore.emit(this.storeData);
    this.storeData = { name: '', estimatePerson: '', invoicePerson: '' };
  }
}
