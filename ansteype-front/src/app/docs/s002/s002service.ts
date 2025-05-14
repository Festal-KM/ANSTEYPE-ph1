import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { S010AddDto } from './s002Dto';
import { WebResponse } from '../../add-ins/http/response';

@Injectable({
  providedIn: 'root',
})
export class S014Service {
  private apiUrl = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) {}

  addBusinessPartner(dto: S010AddDto): Observable<any> {
    return this.http.put<WebResponse>(`s010/add`, dto);
  }
}