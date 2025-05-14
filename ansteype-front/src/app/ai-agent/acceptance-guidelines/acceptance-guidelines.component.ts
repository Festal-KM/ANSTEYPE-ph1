import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from '../../layout/layout.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

// 定义一个类来管理表单数据
export class MyFormData {
  question: string = '';
  gender: number | null = null;
  age: number;
  insurance: string[];
  tableData: { value: string }[];

  constructor() {
    this.question = '';
    this.gender = null;
    this.age = 18;
    this.insurance = [];
    this.tableData = [
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' }
    ];
  }
}

interface Detail {
  filename: string;
  lineno: number;
  name: string;
  detail: string;
}

interface Conversation {
  id: number;
  user: string;
  question: string;
  datetime: string;
  answer: string;
  loading?: boolean;
  details?: Detail[]; // 新增的属性
}

interface KeyValuePair {
  key: string;
  value: string;
}

@Component({
  templateUrl: './acceptance-guidelines.component.html',
  styleUrl: './acceptance-guidelines.component.scss'
})
export class AcceptanceGuidelinesComponent implements OnInit, AfterViewInit {

  form!: FormGroup;
  formData!: MyFormData;

  // ['保险1', '保险2', '保险3', '保险4', '保险5', '保险6'
  insurances: KeyValuePair[] = [
    { key: '1', value: '生命' },
    { key: '2', value: '医療' },
    { key: '3', value: '女性(医療）' },
    { key: '4', value: '終身特約（医療）' },
    { key: '5', value: '特定疾患」' },
    { key: '6', value: '収入サポ（免持なし）短期＆長期に適用' },
    { key: '7', value: '収入サポ（免持あり）長期のみ' }
  ];

  constructor(
    public layoutService: LayoutService,
    private fb: FormBuilder) { }


  ngOnInit() {
    // 初始化表单组
    this.formData = new MyFormData();

    // 初始化表单
    this.form = this.fb.group({
      question: [this.formData.question],
      gender: [this.formData.gender],
      age: [this.formData.age],
      insurance: [this.formData.insurance],
      tableData: this.fb.array(this.formData.tableData.map(item => this.fb.control(item.value))),
    });
  }

  ngAfterViewInit(): void {
    // 滚动到底部
    const chat = document.getElementById('chat');
    if (chat) {
      chat.scrollTop = chat.scrollHeight;
    }
  }

  get tableDataArray(): FormArray {
    return this.form.get('tableData') as FormArray;
  }

  addRow() {
    this.tableDataArray.push(this.fb.control(''));
  }

  deleteRow(index: number) {
    this.tableDataArray.removeAt(index);
  }


  conversations: Conversation[] = [
    {
      id: 1,
      user: '',
      question: `〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇<br>
                  〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇`,
      datetime: '2024/09/03 18:00:01',
      answer: `※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※<br>
               ※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※<br>
               ※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※<br>`,
      details: [
        { filename: '判定基準Ver1.0', lineno: 10, name: "xxx症", detail: 'ここに詳細が入ります。' },
        { filename: '判定基準Ver1.0', lineno: 20, name: "〇〇病", detail: 'ここに詳細が入ります。' }
      ]
    },
    {
      id: 2,
      user: '',
      question: `〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇<br>
                  〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇`,
      datetime: '2024/09/03 18:00:01',
      answer: `※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※<br>
               ※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※<br>
               ※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※<br>`,
      details: [
        { filename: '判定基準Ver1.0', lineno: 10, name: "xxx症", detail: 'ここに詳細が入ります。' },
        { filename: '判定基準Ver1.0', lineno: 20, name: "〇〇病", detail: 'ここに詳細が入ります。' }
      ]
    }
  ];


  // 删除对话
  onDelete(conversation: Conversation) {
    this.conversations = this.conversations.filter(c => c.id !== conversation.id);
  }



  addConversation() {
    const newQuestion = this.form.get('question')?.value?.trim() ?? '';

    console.log('newQuestion:', this.form);
    console.log("form value:", this.form.value);

    if (newQuestion) {
      const newConversation: Conversation = {
        id: this.conversations.length ? Math.max(...this.conversations.map(c => c.id)) + 1 : 1,
        user: 'あなた',
        question: newQuestion,
        datetime: new Date().toLocaleString(),
        answer: '',
        loading: true // 初始状态下设置loading为true
      };
      this.conversations.push(newConversation);

      setTimeout(() => {
        this.scrollToBottom();
      }, 100);

      // 模拟加载过程
      setTimeout(() => {
        newConversation.answer = 'AIの回答はこちらに追加されます。';
        newConversation.loading = false; // 关闭进度条
      }, 5000);

      this.form.reset(); // 重置表单
    }
  }


  displayDialog: boolean = false;
  dialogTitle: string = '';
  dialogContent: string = '';

  showDetail(detail: Detail) {
    this.dialogTitle = `${detail.filename}: 第${detail.lineno}行目`;
    this.dialogContent = detail.detail;
    this.displayDialog = true;
  }

  displayDialogMedical: boolean = false;

  selectedIndex = -1;

  showRow(rowIndex: any) {
    this.selectedIndex = rowIndex;
    this.displayDialogMedical = true;

  }

  onSelectMedical(medical: any) {
    console.log(medical);

    // 向对应表单tableData内填充数据
    const tableData = this.form.get('tableData') as FormArray;
    tableData.at(this.selectedIndex).patchValue(medical.name);
  }

  closeMedical() {
    this.displayDialogMedical = false;
  }


  @ViewChild('contentCard', { static: false }) contentCard!: ElementRef;


  // 添加当前时间
  addCurrentTime() {
    const currentTime = new Date().toLocaleString();
    // 你的时间添加逻辑
    console.log('当前时间已添加:', currentTime);
  }

  // 滚动到最下方
  scrollToBottom() {
    if (this.contentCard) {
      this.contentCard.nativeElement.scrollTop = this.contentCard.nativeElement.scrollHeight;
    }
  }
}
