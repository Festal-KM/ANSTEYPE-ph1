import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebResponse } from '../../../add-ins/http/response';
import { S014Dto } from '../models/s014Dto';

@Injectable({
  providedIn: 'root',
})
export class S014Service {
  constructor(private http: HttpClient) {}

  addBusinessPartner(dto: S014Dto): Observable<any> {
    return this.http.put<WebResponse>(`s014/add`, dto);
  }

  updateBusinessPartner(dto: S014Dto): Observable<any> {
    return this.http.put<WebResponse>(`s014/update`, dto);
  }

  getCompanyData(id: number): Observable<any> {
    return this.http.post<WebResponse>(`s014/getCompanyData`, id);
  }
}