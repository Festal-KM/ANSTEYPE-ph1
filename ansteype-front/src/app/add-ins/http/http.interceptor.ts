import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { WebResponse } from "./response";
import { SnackbarService } from "../../shared/interceptors/snackbarService";
import { Util } from "../common/util";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

    constructor(private snackbarService: SnackbarService) { }

    intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Request URL: ' + req.url);

        let ApiReq;
        const apiPrefix = 'api/';
        const fullUrl = req.url.startsWith(apiPrefix) ? req.url : `${apiPrefix}${req.url}`;

        // Bearer token for authentication added to the header
        const token = localStorage.getItem('ansteype_token');
        if (token) {
            ApiReq = req.clone({
                url: environment.api + fullUrl,
                headers: req.headers.set('Authorization', token)
            });
        } else {
            ApiReq = req.clone({
                url: environment.api + fullUrl,
                setHeaders: {
                    'Content-Type': 'application/json'
                }
            });
        }


        return handler.handle(ApiReq).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }),
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
            catchError((error: HttpErrorResponse) => {

                if (error.error && typeof error.error === 'object') {
                    // 如果错误响应是后端的 SkydeskWebResponse
                    const backendResponse: WebResponse = error.error;

                    if (backendResponse.message) {
                        if (backendResponse.success) {
                            this.snackbarService.success(backendResponse.message);
                        } else {
                            this.snackbarService.warn(backendResponse.message);
                        }
                    }

                    if (backendResponse.data && backendResponse.data.redirect) {
                        // 处理重定向逻辑
                        console.log('Redirecting to:', backendResponse.data.redirect);
                        window.location.href = backendResponse.data.redirect;
                    }

                    return throwError(() => ({
                        success: backendResponse.success,
                        data: backendResponse.data,
                        message: backendResponse.message,
                        status_code: backendResponse.status_code
                    }));
                } else {
                    let errorMessage = error.error?.message; // エラーメッセージを設定
                    if (Util.isEmpty(errorMessage) && error.error instanceof String) {
                        errorMessage = error.error;
                    }
                    if (Util.isEmpty(errorMessage)) {
                        errorMessage = 'エラーが発生しました。';
                    }

                    this.snackbarService.error(errorMessage); // エラーメッセージを表示
                    console.error("HTTP Error: ", error);

                }

                // 非标准错误处理
                return throwError(() => ({
                    success: false,
                    data: {},
                    message: 'システムエラー発生しました。管理者に連絡してください。',
                    status_code: error.status
                }));
            }),

        );
    }
}
