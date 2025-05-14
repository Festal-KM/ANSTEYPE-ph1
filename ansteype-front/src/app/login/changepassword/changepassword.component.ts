import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'skydesk-ui-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css'
})
export class ChangePasswordComponent {
  mail = '';

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
  }

  send() {
    this.http.post('oauth/changepassword', { mail: this.mail }).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
