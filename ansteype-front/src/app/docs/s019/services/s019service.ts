import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchDto } from '../models/s019Dto';
import { WebResponse } from '../../../add-ins/http/response';

@Injectable({
  providedIn: 'root',
})
export class S019Service {
  constructor(private http: HttpClient) {}

  getData(searchDto: SearchDto): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s019/getData`, searchDto);
  }
}