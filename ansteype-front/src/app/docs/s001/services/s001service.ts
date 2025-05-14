import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchDto } from '../models/s001Dto';
import { WebResponse } from '../../../add-ins/http/response';

@Injectable({
  providedIn: 'root',
})
export class S001Service {
  constructor(private http: HttpClient) {}

  getInitData(searchDto: SearchDto): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s001/getInitData`, searchDto);
  }

  getData(searchDto: SearchDto): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s001/getData`, searchDto);
  }

  // 通勤时间 测试 star
  // gettsuData(searchDto: any): Observable<WebResponse> {
  //   return this.http.post<WebResponse>(`s001/commute`, searchDto);
  // }
  // 通勤时间 测试 end
}