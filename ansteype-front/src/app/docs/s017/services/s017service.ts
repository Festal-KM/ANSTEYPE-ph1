import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebResponse } from '../../../add-ins/http/response';
import { TemporarySaveInfoDto } from '../models/s017Dto';

@Injectable({
  providedIn: 'root',
})
export class S017Service {

  constructor(private http: HttpClient) {}


  init(): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s017/s017-init/`, {});
  }
  delete(dto: TemporarySaveInfoDto): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s017/s017-delete/`, dto);
  }

}
