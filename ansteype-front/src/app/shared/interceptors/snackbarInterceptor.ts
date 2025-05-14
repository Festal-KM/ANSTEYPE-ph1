import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { WebResponse } from '../../add-ins/http/response';
import { SnackbarService } from './snackbarService';

@Injectable()
export class SnackbarInterceptor implements HttpInterceptor {
  constructor(private snackbarService: SnackbarService) {}

  /**
   * HTTPリクエストおよびレスポンスをインターセプトし、メッセージを表示する
   * @param req HTTPリクエスト
   * @param next HTTPハンドラ
   * @returns Observable<HttpEvent<any>>
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // 成功レスポンスを処理
      tap((event) => {
        if (event instanceof HttpResponse) {
          const body = event.body as WebResponse; // WebResponse形式にキャスト
          if (body?.message) {
            if (body.success) {
              this.snackbarService.success(body.message); // 成功メッセージを表示
            } else {
              this.snackbarService.warn(body.message); // 警告メッセージを表示
            }
          }
        }
      }),
      // エラーを処理
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'エラーが発生しました。'; // エラーメッセージを設定
        this.snackbarService.error(errorMessage); // エラーメッセージを表示
        throw error; // エラーを再スロー
      })
    );
  }
}
