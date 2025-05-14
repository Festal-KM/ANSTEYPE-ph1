import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebResponse } from '../../../add-ins/http/response';
import { S011Dto } from '../models/s011Dto';

@Injectable({
  providedIn: 'root',
})
export class S011Service {
  constructor(private http: HttpClient) {}

  updateBasicSetting(dto: S011Dto): Observable<WebResponse> {
    return this.http.put<WebResponse>(`s011/update`, dto);
  }

  getBasicSettingInfo(): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s011/getBasicSettingInfo`, []);
  }
}