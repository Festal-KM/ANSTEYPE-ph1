import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebResponse } from '../../add-ins/http/response';
import { SkydeskValidators } from '../../add-ins/form/validators.service';
import { AppService } from '../../app.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'skydesk-ui-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private app: AppService,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService) {

    this.loginForm = this.fb.group({
      mail: ['', Validators.required],
      password: ['', [Validators.required, SkydeskValidators.password]],
    });

  }

  ngOnInit(): void {
    localStorage.removeItem('ansteype_token');
  }

  login() {
    this.http.post<WebResponse>('oauth/login', this.loginForm.value).subscribe({
      next: (response: WebResponse) => {
        console.log(response);

        if (response.success) {
          // get token from response
          //set token to local storage
          localStorage.setItem('ansteype_token', response.data.token);

          this.app.setCurrentUser(response.data.user);
          this.app.setLogo(response.data.logo);
        } 
        this.router.navigate(['/docs/s001']);
      },
      error: (error) => {
        console.error("服务器错误:", error);
        this.messageService.add({
          severity: 'error', // 错误类型
          summary: 'エラー',   // 标题
          detail:'アカウントまたはパスワードが間違っています。', // 详细信息
        });
      },
    });
  }

  navigateToRegister() {
    this.router.navigate(['/login/changepassword']);
  }
}



