import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-p003',
  templateUrl: './p003.component.html',
  styleUrl: './p003.component.scss'
})
export class P003Component {
  
  @Input() temporaryName: any;
  inputValue: string = ''; // 存储输入框的值

  // 定义一个事件，用于将输入内容传递给父组件
  @Output() save: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit() {
    this.inputValue= this.temporaryName;
  }
  // 点击保存按钮时触发该方法
  onSave() {
    this.save.emit(this.temporaryName); // 传递输入内容给父组件
  }
}
