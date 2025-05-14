import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, S025SeachDto } from '../models/s025Dto';
import { WebResponse } from '../../../add-ins/http/response';

@Injectable({
  providedIn: 'root',
})
export class S025Service {

  constructor(private http: HttpClient) {}

  init(): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s025/s025-init/`, {});
  }
  seach(dto: S025SeachDto): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s025/seach-delivery-info/`, dto);
  }
  set_mail_text(selectedItems:any[]): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s025/set-mail-text/`, selectedItems);
  }
  del_delivery(selectedItems:any[]): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s025/del/`, selectedItems);
  }
}