import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebResponse } from '../../../add-ins/http/response';
import { S027SeachDto, DeliveryInfoDto } from '../models/s027Dto';

@Injectable({
  providedIn: 'root',
})
export class S027Service {

  constructor(private http: HttpClient) {}
  init(): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s003/s003-init/`, {});
  }
  seachDeliveryInfo(dto: S027SeachDto): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s027/seach-deliveryInfo/`, dto);
  }
  delDeliveryInfo(dtos: DeliveryInfoDto[]): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s027/del-delivery-data/`, dtos);
  }
}
