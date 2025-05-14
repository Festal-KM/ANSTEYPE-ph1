import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService, TreeNode } from 'primeng/api';
import { UIFormData, Medical, Conversation, InitResult } from './search-ai.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from '../../layout/layout.service';
import { Util } from '../../add-ins/common/util';
import { WebResponse } from '../../add-ins/http/response';

@Component({
  selector: 'app-search-ai',
  templateUrl: './search-ai.component.html',
  styleUrl: './search-ai.component.scss'
})
export class SearchAiComponent implements OnInit, AfterViewInit {

  @ViewChild('contentCard', { static: false }) contentCard!: ElementRef;

  form!: FormGroup;

  formData!: UIFormData;

  products!: TreeNode[];
  chat_id: string | null = null;

  conversations: Conversation[] = [];

  blockedScreen = false;

  constructor(
    private message: MessageService,
    public layoutService: LayoutService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder) {

    this.route.paramMap.subscribe(params => {
      this.chat_id = params.get("chat_id");
      console.log("chat_id", this.chat_id);
      this.initLoad();

    });
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {

    // let params = new HttpParams();
    // params.set("user_name", "zhu333");
    // params.set("user_mail", "zhu333");

    this.http.get<WebResponse>('sample/get_users/' + "zhu333").subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (error) => {
        this.router.navigate(['/error']);
      }
    });

  }


  initLoad() {
    this.conversations = [];
    this.blockedScreen = true;

    // 初始化表单组
    this.formData = new UIFormData();

    this.form = this.fb.group({
      question: [this.formData.question],
      chat_id: [this.chat_id],
      user_id: ["system"]
    });

    // TODO: 设置 user_id 和 chat_id 的值
    this.form.get('user_id')?.patchValue("temp");
    this.form.get('chat_id')?.patchValue(this.chat_id);

    if (!!this.chat_id) {

      let params = new HttpParams().set("chat_id", this.chat_id || "");

      this.http.get<WebResponse>('/ai_agent/hikiukemeyasu/init', { params }).subscribe({
        next: (result) => {


          this.blockedScreen = false;

          console.log(result);

          var data: InitResult = result.data;

          if (Util.isEmpty(this.chat_id)) {
            this.chat_id = data.chat_id;
            this.form.get('chat_id')?.patchValue(this.chat_id);
          }

          if (!Util.isEmpty(data.conversations)) {
            data.conversations.forEach((conversation: Conversation) => {
              this.conversations.push({
                chat_id: conversation.chat_id,
                no: conversation.no,
                question_time: conversation.question_time,
                question: this.changeToBr(conversation.question),
                answer_time: conversation.answer_time,
                answer: this.changeToBr(conversation.answer),
                loading: false,
                references: conversation.references,
                rating: conversation.rating,
                message: [],
                error: false
              });
            });
          }

        },
        error: (error) => {
          this.router.navigate(['/error']);
        }
      });
    }
  }

  review(conversation: Conversation, rating: number) {
    const data = {
      rating: rating,
      chat_id: conversation.chat_id,
      no: conversation.no
    };

    this.http.post<WebResponse>('/ai_agent/hikiukemeyasu/review', data).subscribe({
      next: (result) => {
        if (result.success) {
          conversation.rating = rating;
        }
      },
      error: (error) => {
        this.message.add({
          severity: 'error',
          summary: 'エラー',
          detail: 'エラーが発生しました。大変お手数ですが、しばらく時間をおいてから再度お試しください。'
        });
      }
    });
  }

  addConversation() {
    const data = this.form.value;

    const newConversation: Conversation = {
      chat_id: data.chat_id,
      no: '',
      question_time: '',
      question: this.changeToBr(data.question),
      answer_time: '',
      answer: '',
      loading: true,
      references: [],
      rating: -1,
      message: [],
      error: false
    };

    this.conversations.push(newConversation);
    this.http.post<WebResponse>('/ai_agent/hikiukemeyasu/question', data).subscribe({
      next: (result) => {
        console.log(result);

        if (result.success) {
          const data: Conversation = result.data;
          newConversation.chat_id = data.chat_id;
          newConversation.no = data.no;
          newConversation.answer_time = data.answer_time;
          newConversation.answer = this.changeToBr(data.answer);
          newConversation.references = data.references;
          newConversation.loading = false;
          newConversation.message = [];
          newConversation.error = false;

          // スクロールバー位置調整
          // setTimeout(() => {
          //   this.scrollToBottom();
          // }, 100);

        }
      },
      error: (error) => {

        newConversation.loading = false;
        newConversation.error = true;
        newConversation.message = [
          {
            severity: 'error',
            summary: 'エラー',
            detail: 'エラーが発生しました。大変お手数ですが、しばらく時間をおいてから再度お試しください。'
          }
        ];
      }
    });

    // this.form.reset(); // 重置表单

  }

  changeToBr(value: string): string {
    return value.replace(/\n/g, '<br>');
  }

  reset() {

    if (this.router.url === '/ai-agent/hikiukenmeyasu') {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/ai-agent/hikiukenmeyasu']);
      });
    } else {
      this.router.navigate(['/ai-agent/hikiukenmeyasu']);
    }
  }

  scrollToBottom() {
    if (this.contentCard) {
      this.contentCard.nativeElement.scrollTop = this.contentCard.nativeElement.scrollHeight;
    }
  }

}

