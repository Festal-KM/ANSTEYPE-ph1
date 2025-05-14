import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';;
import { WebResponse } from '../../../add-ins/http/response';
import { SearchDto } from '../models/s002Dto';

@Injectable({
  providedIn: 'root',
})
export class S002Service {
  constructor(private http: HttpClient) {}

  getInitData(searchDto: SearchDto): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s002/getInitData`, searchDto);
  }

  getData(searchDto: SearchDto): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s002/getData`, searchDto);
  }
}