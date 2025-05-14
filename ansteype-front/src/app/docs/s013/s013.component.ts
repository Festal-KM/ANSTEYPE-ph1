import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebResponse } from '../../add-ins/http/response';
import { LoadingService } from '../../add-ins/service/loading.service';
import { UserDto } from '../s012/s012.component';
import { ROLES } from '../../add-ins/common/const';
import { passwordValidator } from '../../shared/validators/validators';

@Component({
  selector: 'app-s013',
  templateUrl: './s013.component.html',
  styleUrl: './s013.component.scss'
})
export class S013Component implements OnInit {
  user: UserDto | null = null;
  userForm: FormGroup;
  roles = ROLES;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loadingService: LoadingService,
    private http: HttpClient
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as {
        user: UserDto;
      };
      this.user = state.user;
    }
    
    this.userForm = this.fb.group({
      id: [null],
      user_id: [''],
      user_name_first: ['', Validators.required],
      user_name_last: ['', Validators.required],
      user_mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
        passwordValidator()
      ]],
      role: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.user) {
      this.http.get<WebResponse>(`s012/user/${this.user.id}`).subscribe({
        next: (response: WebResponse) => {
          if (response.success) {
            this.userForm.patchValue(response.data);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  onSubmit() {
    this.userForm.markAllAsTouched();
    this.userForm.updateValueAndValidity();

    if (!this.userForm.valid) {
      console.log('Form is invalid');
      return
    }

    this.loadingService.show();
    if (this.userForm.value.id) {
      // 更新
      this.http.put<WebResponse>('s012/user', this.userForm.value).subscribe({
        next: (response) => {
          this.loadingService.hide();

          if (response.success) {
            this.router.navigate(['/docs/s012']);
          } else {
            console.log('Failed to update user');
          }

        },
        error: (error) => {
          this.loadingService.hide();
        },
      });

    } else {
      // 新規登録
      this.http.post<WebResponse>('s012/user', this.userForm.value).subscribe({
        next: (response) => {
          this.loadingService.hide();

          if (response.success) {

            // 显示pop
            this.router.navigate(['/docs/s012']);
          } else {
            this.loadingService.hide();
            console.log('Failed to create user');
          }

        },
        error: (error) => {
          this.loadingService.hide();
        },
      });
    }

    console.log('Form Data:', this.userForm.value);
  }

  goBack() {
    this.router.navigate(['/docs/s012']);
  }

  showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
