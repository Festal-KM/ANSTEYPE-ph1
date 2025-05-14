import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { AppRoutingModule } from "./app.routes";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { environment } from "../environments/environment";
import { LayoutModule } from "./layout/layout.module";
import { LoggingInterceptor } from "./add-ins/http/log";
import { AppHttpInterceptor } from "./add-ins/http/http.interceptor";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { SnackbarInterceptor } from "./shared/interceptors/snackbarInterceptor";

// 使用HTTP加载器工厂函数来指明如何加载翻译文件
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        LayoutModule,
        ToastModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        MessageService, // 注册 MessageService
        // {
        // provide: HTTP_INTERCEPTORS,
        // useClass: SnackbarInterceptor,
        // multi: true,
        // },
        provideHttpClient(withInterceptorsFromDi()),
        { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
        { provide: LocationStrategy, useClass: PathLocationStrategy },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }

