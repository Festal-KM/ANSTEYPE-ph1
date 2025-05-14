import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SkydeskValidators } from '../../add-ins/form/validators.service';
import { WebResponse } from '../../add-ins/http/response';

@Component({
  selector: 'skydesk-ui-password',
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent {

  form!: FormGroup;
  token!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {

    //{ path: 'password?token=:token', component: PasswordComponent },
    // token 取得処理



  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
    console.log("this.token", this.token);

    this.form = this.fb.group({
      password: ['', [Validators.required, SkydeskValidators.password]],
      password_confirm: ['', [Validators.required, SkydeskValidators.password]],
      token: [this.token],
    });

  }

  showDialog() {
  }

  change() {
    this.http.post<WebResponse>('oauth/password', this.form.value).subscribe({
      next: (response: WebResponse) => {
        if (response.success) {
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        console.log(error);
      },

    });
  }

  goBack() {
  }
}
