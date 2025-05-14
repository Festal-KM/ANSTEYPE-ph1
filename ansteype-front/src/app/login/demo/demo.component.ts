import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { SkydeskValidators } from '../../add-ins/form/validators.service';


@Component({
  selector: 'skydesk-ui-demo',
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent implements OnInit {

  form!: FormGroup;
  options: any[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' }
  ];
  rows: any[] = [];

  constructor(private fb: FormBuilder) {


    this.form = this.fb.group({
      radioValue: ['', Validators.required],
      dropdownValue: ['', Validators.required],
      inputValue1: new FormControl('', [Validators.required, SkydeskValidators.isEmail]),
      inputValue2: new FormControl('', [Validators.required, SkydeskValidators.isHalfEnNumberOnly, SkydeskValidators.isEmail]),
      inputValue3: new FormControl('', [this.customValidator(), SkydeskValidators.isHalfEnNumber]),
      //inputValue: ['', [Validators.required, Validators.minLength(3)]],
      calendarValue: ['', Validators.required],
      checkboxValue: [false, Validators.requiredTrue]
    });
  }

  ngOnInit() {

    // 初始化示例数据
    this.rows = [
      { id: 1, name: 'Item 1', quantity: 10, active: true },
      { id: 2, name: 'Item 2', quantity: 5, active: false },
    ];
    this.form.setControl('tableRows', this.fb.array(this.rows.map(row => this.createTableRow(row))));
    // 自定义验证器的例子
    //this.form.get('inputValue1')!.setValidators(this.customValidator());
  }
  // 安全地获取FormGroup，避免null或undefined
  getTableRowFormGroup(index: number): FormGroup {
    const tableRows = this.form.get('tableRows') as FormArray;
    return tableRows.at(index) as FormGroup;
  }
  // 创建表格行的FormGroup
  createTableRow(row: any): FormGroup {
    return this.fb.group({
      name: [row.name, Validators.required],
      quantity: [row.quantity, [Validators.required, Validators.min(1)]],
      active: [row.active]
    });
  }

  // 自定义验证器
  customValidator(): (control: AbstractControl) => { [key: string]: any } | null {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = control.value.includes('forbidden');
      return forbidden ? { 'forbiddenName': { value: control.value } } : null;
    };
  }

  // 添加行到表格
  addRow() {
    const newRow = { id: this.rows.length + 1, name: '', quantity: 0, active: false };
    this.rows.push(newRow);
    const control = this.form.get('tableRows') as FormArray;
    control.push(this.createTableRow(newRow));
  }

  // 表单提交处理
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.log('Form is not valid');
    }
  }
}