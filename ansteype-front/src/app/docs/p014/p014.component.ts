import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonChargeInfoDto } from '../../shared/models/personChargeInfoDto';

@Component({
  selector: 'app-p014',
  templateUrl: './p014.component.html',
  styleUrl: './p014.component.scss'
})
export class P014Component implements OnInit {
  @Input() store: any;
  @Output() save = new EventEmitter<any>();

  storeForm: FormGroup;
  filteredPersons1: PersonChargeInfoDto[] = []; // 1:見積TO 
  filteredPersons2: PersonChargeInfoDto[] = []; // 2:請求TO
  filteredPersons3: PersonChargeInfoDto[] = []; // 3:見積CC
  filteredPersons4: PersonChargeInfoDto[] = []; // 4:請求CC

  constructor(private fb: FormBuilder) {
    this.storeForm = this.fb.group({
      id: [null],
      store_name: ['', Validators.required],
      store_address: ['', [ Validators.email]],
      estimate_cc_flag: [false],
      same_as_estimate_flag: [false],
      billing_cc_flag: [false],
      same_as_weekdays_flag: [false],
      persons: this.fb.array([]),
      unitPrices: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.initDate();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['store']) {
      this.initDate();
    }
  }

  initDate() {
    if (this.store) {
      this.storeForm.patchValue(this.store);
      this.setPersons(this.store.persons);
      this.setUnitPrices(this.store.unitPrices);
    } else {
      this.initializeEmptyStore();
    }
  }

  get persons(): FormArray {
    return this.storeForm.get('persons') as FormArray;
  }

  // DTO to formGroups
  setPersons(personsData: any[]) {
    const allTypes = [1, 2]; // TOタイプ (見積TOと請求TO)
    const ccTypes = []; // CCタイプ (見積CCと請求CC)

    // CC不要のフラグを確認し、対象となるCCタイプを追加
    if (!this.storeForm.get('estimate_cc_flag')?.value) {
      ccTypes.push(3); // 見積CCを含む
    }
    if (!this.storeForm.get('billing_cc_flag')?.value) {
      ccTypes.push(4); // 請求CCを含む
    }

    const completeTypes = [...allTypes, ...ccTypes]; // 処理対象のすべてのtype_flag
    const completePersonsData = completeTypes.map((type) => {
      const existingPerson = personsData.filter((person) => person.type_flag === type);
      if (existingPerson.length > 0) {
        return existingPerson;
      } else {
        return {
          id: null,
          last_name: null,
          first_name: null,
          email: null,
          type_flag: type,
          partner_store_id: 0,
          quotation_claim_creation_id: 0,
        };
      }
    });

    const completePersonsDataList = completePersonsData.flat();
    const formGroups = completePersonsDataList.map((person) => this.createPersonGroup(person));
    this.storeForm.setControl('persons', this.fb.array(formGroups));
  }

  createPersonGroup(person: any): FormGroup {
    return this.fb.group({
      id: [person.id],
      last_name: [person.last_name, Validators.required],
      first_name: [person.first_name, Validators.required],
      email: [person.email, [Validators.required, Validators.email]],
      type_flag: [person.type_flag, Validators.required],
      partner_store_id: [person.partner_store_id],
      quotation_claim_creation_id: [person.quotation_claim_creation_id],
    });
  }

  get unitPrices(): FormArray {
    return this.storeForm.get('unitPrices') as FormArray;
  }

  setUnitPrices(unitPricesData: any[]) {
    const allTypes = [1, 2];

    const completeUnitPricesData = allTypes.map((type) => {
      const existingUnitPrice = unitPricesData.filter((unitPrice) => unitPrice.week_flag === type);
      if (existingUnitPrice.length > 0) {
        return existingUnitPrice;
      } else {
        return {
          order_type: null,
          unit_price: null,
          week_flag: type,
          id: null,
          partner_store_id: 0,
        };
      }
    });

    const completeUnitPricesList = completeUnitPricesData.flat();
    const formGroups = completeUnitPricesList.map((unitPrice) => this.createUnitPriceGroup(unitPrice));
    this.storeForm.setControl('unitPrices', this.fb.array(formGroups));
  }

  createUnitPriceGroup(unitPrice: any): FormGroup {
    return this.fb.group({
      order_type: [unitPrice.order_type, Validators.required],
      unit_price: [unitPrice.unit_price, Validators.required],
      week_flag: [unitPrice.week_flag, [Validators.required]],
      id: [unitPrice.id],
      partner_store_id: [unitPrice.partner_store_id],
    });
  }

  initializeEmptyStore() {
    const emptyPersons = [
      { last_name: null, first_name: null, email: null, type_flag: 1, id: null, partner_store_id: 0, quotation_claim_creation_id: 0 },
      { last_name: null, first_name: null, email: null, type_flag: 2, id: null, partner_store_id: 0, quotation_claim_creation_id: 0 },
      { last_name: null, first_name: null, email: null, type_flag: 3, id: null, partner_store_id: 0, quotation_claim_creation_id: 0 },
      { last_name: null, first_name: null, email: null, type_flag: 4, id: null, partner_store_id: 0, quotation_claim_creation_id: 0 },
    ];

    const emptyUnitPrices = [
      { order_type: null, unit_price: null, week_flag: 1, id: null, partner_store_id: 0 },
      { order_type: null, unit_price: null, week_flag: 2, id: null, partner_store_id: 0 },
    ];

    this.storeForm.patchValue({
      id: null,
      store_name: null,
      store_address: null,
      estimate_cc_flag: false,
      same_as_estimate_flag: false,
      billing_cc_flag: false,
      same_as_weekdays_flag: false
    });
    this.setPersons(emptyPersons);
    this.setUnitPrices(emptyUnitPrices);
  }

  // type_flag FormGroup 
  getPersonsByType(type_flag: number): FormGroup[] {
    return this.persons.controls.filter(
      (person) => person.get('type_flag')?.value === type_flag
    ) as FormGroup[];
  }

  // type_flag FormGroup 
  getUnitPricesByType(week_flag: number): FormGroup[] {
    return this.unitPrices.controls.filter(
      (unitPrice) => unitPrice.get('week_flag')?.value === week_flag
    ) as FormGroup[];
  }

  addPerson(type_flag: number) {
    const newPerson = this.fb.group({
      last_name: ['', Validators.required],
      first_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      type_flag: [type_flag, Validators.required],
      id: [null],
      partner_store_id: [this.storeForm.get('id')?.value],
      quotation_claim_creation_id: [0],
    });

    this.persons.push(newPerson);
  }

  removePerson(type_flag: number, index: number): void {
    const filteredPersons = this.getPersonsByType(type_flag);

    if (filteredPersons.length > 1) {
      const controlIndex = this.persons.controls.indexOf(filteredPersons[index]);
      this.persons.removeAt(controlIndex);
    }
  }

  addUnitPrice(week_flag: number) {
    const newUnitPrice = this.fb.group({
      order_type: ['', Validators.required],
      unit_price: ['', Validators.required],
      week_flag: [week_flag, [Validators.required]],
      id: [null],
      partner_store_id: [this.storeForm.get('id')?.value],
    });

    this.unitPrices.push(newUnitPrice);
  }

  removeUnitPrice(week_flag: number, index: number): void {
    const filteredUnitPrices = this.getUnitPricesByType(week_flag);

    if (filteredUnitPrices.length > 1) {
      const controlIndex = this.unitPrices.controls.indexOf(filteredUnitPrices[index]);
      this.unitPrices.removeAt(controlIndex);
    }
  }

  onSameAsWeekdaysFlagClick(): void {
    const isChecked = this.storeForm.get('same_as_weekdays_flag')?.value;

    if (isChecked) {
      // チェックされた場合、平日のデータを週末にコピーする
      const weekdaysUnitPrices = this.getUnitPricesByType(1); // 平日データを取得
      const weekendUnitPrices = weekdaysUnitPrices.map((unitPrice) =>
        this.fb.group({
          order_type: [unitPrice.get('order_type')?.value, Validators.required], // オーダー名
          unit_price: [unitPrice.get('unit_price')?.value, Validators.required], // 単価
          week_flag: [2, Validators.required], // 週末を示すフラグ
          id: [null], // IDをクリア
          partner_store_id: [unitPrice.get('partner_store_id')?.value], // パートナーストアID
        })
      );

      // 現在の週末以外のデータを取得して結合
      const nonWeekendUnitPrices = this.unitPrices.controls.filter(
        (unitPrice) => unitPrice.get('week_flag')?.value !== 2
      );

      // フォームコントロールを更新
      this.storeForm.setControl(
        'unitPrices',
        this.fb.array([...nonWeekendUnitPrices, ...weekendUnitPrices]) // 更新後のデータをセット
      );
    } else {

    }
  }

  // 請求書送付先が見積書送付先と同様の場合に✓する。
  onSameAsEstimateFlagClick(): void {
    const isChecked = this.storeForm.get('same_as_estimate_flag')?.value;

    if (isChecked) {
      // 請求書送付先が見積書送付先と同様
      this.syncBillingWithEstimate();
    } else {

    }
  }

  syncBillingWithEstimate(): void {
    // 見積 TO と CC の担当者を取得
    const estimateToPersons = this.getPersonsByType(1) || [];
    const estimateCcPersons = this.getPersonsByType(3) || [];

    // 見積 TO を請求 TO に変換
    const billingToPersonsArray = this.fb.array(
      estimateToPersons.map((person) => {
        if (!person) {
          console.error('Invalid person in estimateToPersons:', person);
          return this.fb.group({}); // 空の FormGroup を追加
        }
        return this.fb.group({
          id: [person.get('id')?.value],
          last_name: [person.get('last_name')?.value, Validators.required],
          first_name: [person.get('first_name')?.value, Validators.required],
          email: [person.get('email')?.value, [Validators.required, Validators.email]],
          type_flag: [2, Validators.required],
          partner_store_id: [person.get('partner_store_id')?.value],
          quotation_claim_creation_id: [person.get('quotation_claim_creation_id')?.value],
        });
      })
    );

    // 見積 CC を請求 CC に変換
    const billingCcPersonsArray = this.fb.array(
      estimateCcPersons.map((person) => {
          if (!person) {
            console.error('Invalid person in estimateCcPersons:', person);
            return this.fb.group({});// 空の FormGroup を追加
          }
          return this.fb.group({
            id: [person.get('id')?.value],
            last_name: [person.get('last_name')?.value, Validators.required],
            first_name: [person.get('first_name')?.value, Validators.required],
            email: [person.get('email')?.value, [Validators.required, Validators.email]],
            type_flag: [4, Validators.required],
            partner_store_id: [person.get('partner_store_id')?.value],
            quotation_claim_creation_id: [person.get('quotation_claim_creation_id')?.value],
          });
        })
    );

    // 他の担当者をフィルタリング
    const otherPersonsArray = this.fb.array(
      this.persons.controls.filter(
        (person) => ![2, 4].includes(person.get('type_flag')?.value)
      )
    );

    // 全ての配列を結合
    const updatedPersonsArray = this.fb.array([
      ...otherPersonsArray.controls,
      ...billingToPersonsArray.controls,
      ...billingCcPersonsArray.controls,
    ]);

    this.storeForm.setControl('persons', updatedPersonsArray);

    // billing_cc_flag を estimate_cc_flag の値に設定
    const estimateCcFlagValue = this.storeForm.get('estimate_cc_flag')?.value;
    this.storeForm.get('billing_cc_flag')?.setValue(estimateCcFlagValue);
  }

  onCcFlagClick(type_flag: number, flagControlName: string): void {
    const isChecked = this.storeForm.get(flagControlName)?.value;
    if (isChecked) {
      this.removeCcPersonsByType(type_flag);
    } else {
      this.addEmptyCcByType(type_flag);
    }
  }

  addEmptyCcByType(type_flag: number): void {
    const newCcPerson = this.fb.group({
      id: [null],
      last_name: [null, Validators.required],
      first_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      type_flag: [type_flag, Validators.required],
      partner_store_id: [this.storeForm.get('id')?.value],
      quotation_claim_creation_id: [0],
    });

    // persons フォームコントロールに新しいCCを追加
    this.persons.push(newCcPerson);
  }

  removeCcPersonsByType(type_flag: number): void {

    console.log('persons:', this.persons);
    console.log('controls:', this.persons.controls);
    this.persons.controls.forEach((control, index) => {
      console.log(`Control ${index}:`, control);
      console.log(`Control ${index} type:`, control instanceof FormGroup);
    });

    // 指定された type_flag に該当する項目を除外
    const remainingPersons = this.persons.controls.filter(
      (person) => person.get('type_flag')?.value !== type_flag
    );

    // persons フォームコントロールを更新する
    this.storeForm.setControl('persons', this.fb.array(remainingPersons));
  }

  saveStore() {
    this.storeForm.markAllAsTouched();
    this.storeForm.updateValueAndValidity();

    if (this.storeForm.invalid) {
      return;
    }

    const processedData = this.unitPrices.value.map((up:any) => ({
      ...up,
      unit_price: up.unit_price.toString()
    }));

    const updatedStore = {
      ...this.store,
      ...this.storeForm.value,
      persons: this.persons.value,
      unitPrices: processedData,
    };
    this.save.emit(updatedStore);
  }
}
