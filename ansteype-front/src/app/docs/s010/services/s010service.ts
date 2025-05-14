import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebResponse } from '../../../add-ins/http/response';

@Injectable({
  providedIn: 'root',
})
export class S010Service {
  constructor(private http: HttpClient) {}

  getCompanyData(): Observable<WebResponse> {
    return this.http.get<WebResponse>(`s010/getCompanyData`);
  }
}