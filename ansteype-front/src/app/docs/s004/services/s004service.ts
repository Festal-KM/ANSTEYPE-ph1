import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebResponse } from '../../../add-ins/http/response';
import { QuotationClaimSettingInfoDTO } from '../../../shared/models/quotationClaimSettingInfoDto';

interface ApiResponse {
  data: QuotationClaimSettingInfoDTO;
}

@Injectable({
  providedIn: 'root',
})
export class S004Service {
  constructor(private http: HttpClient) {}

  add(dto: QuotationClaimSettingInfoDTO): Observable<any> {
    return this.http.put<WebResponse>(`s004/add`, dto);
  }

  getData(): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s004/getData`, null);
  }
}