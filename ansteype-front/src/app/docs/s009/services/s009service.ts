import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeliveryInfoDto, DeliveryInfoProduct, PDFCreationInfoDTO, QuotationClaimCreationInfoDto, reS009Dto, S009AddDto } from '../models/s009Dto';
import { WebResponse } from '../../../add-ins/http/response';

@Injectable({
  providedIn: 'root',
})
export class S009Service {

  constructor(private http: HttpClient) {}

  getSendMailInfo(dto: DeliveryInfoDto, pdfdto:PDFCreationInfoDTO): Observable<any> {
    const requestBody: reS009Dto = {
      deliveryInfoDto:dto,
      pdfDto:pdfdto

    };
    return this.http.post<WebResponse>(`s009/send-mail-info/`, requestBody);
  }
  saveSendMailInfo(dto: QuotationClaimCreationInfoDto): Observable<any> {

    return this.http.post<WebResponse>(`s009/save-mail-info/`, dto);
  }
  sendMail(dtos: DeliveryInfoProduct[]): Observable<any> {

    return this.http.post<WebResponse>(`s009/send-mail/`, dtos);
  }
  getSendMailInfoText(products :DeliveryInfoProduct[]): Observable<any> {

    return this.http.post<WebResponse>(`s009/get-mail-info-text/`, products);
  }
}