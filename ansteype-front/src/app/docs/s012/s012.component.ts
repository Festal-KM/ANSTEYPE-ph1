import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebResponse } from '../../add-ins/http/response';
import { Util } from '../../add-ins/common/util';
import { ConfirmationService } from 'primeng/api';
import { AppService } from '../../app.service';



export interface UserDto {
  id: number;
  user_id: string;
  user_mail: string;
  user_name_first: string;
  user_name_last: string;
  role: string;
  password: string;
  showPassword: boolean;
}


@Component({
  selector: 'app-s012',
  templateUrl: './s012.component.html',
  styleUrl: './s012.component.scss'
})
export class S012Component implements OnInit {
  users: UserDto[] = [];
  // 統括管理者flg
  isAdmin: boolean = false;
  loginUserId: string = "";

  constructor(
    private confirmationService: ConfirmationService,
    private router: Router,
    private http: HttpClient,
    private app: AppService
  ) { }
  ngOnInit(): void {
    
    const user = this.app.getCurrentUser();
    this.loginUserId = user?.user_id || "";
    this.isAdmin = user?.role === 'admin';
    
    this.loadUsers();
  }

  loadUsers(): void {
    this.http.get<WebResponse>('s012/users').subscribe({

      next: (response: WebResponse) => {

        if (response.success) {
          this.users = response.data;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

  displayRoe(role: string): string {
    switch (role) {
      case 'admin':
        return '統括管理者';
      case 'manager':
        return '実務管理者';
      case 'staff':
        return '担当者';
      default:
        return '';
    }
  }

  add() {
    this.router.navigate(['/docs/s013'], {
      state: {
        user: null
      }
    });
  }

  edit(user: UserDto) {
    this.router.navigate(['/docs/s013'], {
      state: {
        user: user
      }
    });
  }

  delete(user: UserDto, event: Event) {
    // 削除確認ポップアップ

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `ユーザ ${user.user_name_first} ${user.user_name_last} を削除しますか？`,
      icon: 'pi pi-info-circle',
      rejectLabel: '取消',
      rejectButtonStyleClass: 'p-button-text',
      acceptLabel: '削除',
      acceptButtonStyleClass: 'p-button-danger',

      accept: () => {
        this.http.delete<WebResponse>(`s012/user/${user.id}`).subscribe({
          next: (response: WebResponse) => {
            if (response.success) {
              this.loadUsers();
            }
          },
          error: (error) => {
            console.log(error);
          }

        });
      },
      reject: () => {
      }
    });

  }

  togglePassword(user: UserDto) {

    if (Util.isEmpty(user.showPassword)) {
      user.showPassword = false;
    }

    user.showPassword = !user.showPassword;
  }
}
