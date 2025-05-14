import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, S026SeachDto } from '../models/s026Dto';
import { WebResponse } from '../../../add-ins/http/response';

@Injectable({
  providedIn: 'root',
})
export class S026Service {

  constructor(private http: HttpClient) {}

  init(): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s026/s026-init/`, {});
  }
  seach(dto: S026SeachDto): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s026/seach-delivery-info/`, dto);
  }
}