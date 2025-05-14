import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebResponse } from '../../../add-ins/http/response';
import { S020Dto } from '../models/s020Dto';

@Injectable({
  providedIn: 'root',
})
export class S020Service {
  constructor(private http: HttpClient) {}

  init(): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s020/s020-init/`, {});
  }

  executeCreation(dto: S020Dto): Observable<any> {
    return this.http.put<WebResponse>(`s020/executeCreation`, dto);
  }

  save(dto: S020Dto): Observable<any> {
    return this.http.put<WebResponse>(`s020/save`, dto);
  }
}