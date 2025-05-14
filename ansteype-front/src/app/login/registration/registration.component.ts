import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'skydesk-ui-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
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
        this.router.navigate(['/login/password']);
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
