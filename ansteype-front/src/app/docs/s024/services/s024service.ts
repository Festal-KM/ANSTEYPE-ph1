import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebResponse } from '../../../add-ins/http/response';
import { S024Dto } from '../models/s024Dto';

interface ApiResponse {
  data: S024Dto;
}

@Injectable({
  providedIn: 'root',
})
export class S024Service {
  constructor(private http: HttpClient) {}

  init(): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s024/s024-init/`, {});
  }

  executeCreation(dto: S024Dto): Observable<any> {
    return this.http.put<WebResponse>(`s024/executeCreation`, dto);
  }

  save(dto: S024Dto): Observable<any> {
    return this.http.put<WebResponse>(`s024/save`, dto);
  }
}