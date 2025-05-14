import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({

    selector: 'error-page',
    templateUrl: './error-page.html',
    styleUrls: ['./error-page.css']
})
export class ErrorPageComponent implements OnInit {
    messagees: any[] = [];

    constructor(private http: HttpClient) { }

    public ngOnInit(): void {
        this.messagees = [
            {
                severity: 'error',
                summary: 'エラー',
                detail: "エラーが発生しました。大変お手数ですが、しばらく時間をおいてから再度お試しください。"
            }
        ];
    }

    ngOnChanges(changes: SimpleChanges): void {
        // Handle changes here
    }
}
