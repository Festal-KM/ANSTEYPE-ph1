import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BillingShowInfo, DeliveryInfoDto, DeliveryInfoProduct, QuotationClaimCreationInfoDto, reS005Dto, reS005PdfDto, S005AddDto } from '../models/s005Dto';
import { WebResponse } from '../../../add-ins/http/response';
import { PDFCreationInfoDTO } from '../../s025/models/s025Dto';

@Injectable({
  providedIn: 'root',
})
export class S005Service {

  constructor(private http: HttpClient) {}

  getSendMailInfo(dto: DeliveryInfoDto, pdfdto:PDFCreationInfoDTO): Observable<any> {
    const requestBody: reS005Dto = {
      deliveryInfoDto:dto,
      pdfDto:pdfdto

    };
    
    return this.http.post<WebResponse>(`s005/send-mail-info/`, requestBody);
  }
  saveSendMailInfo(dto: DeliveryInfoProduct): Observable<any> {

    return this.http.post<WebResponse>(`s005/save-mail-info/`, dto);
  }
  sendMail(dtos: DeliveryInfoProduct[]): Observable<any> {

    return this.http.post<WebResponse>(`s005/send-mail/`, dtos);
  }
  getSendMailInfoText(products :DeliveryInfoProduct[]): Observable<any> {

    return this.http.post<WebResponse>(`s005/get-mail-info-text/`, products);
  }

  getSendMailInfoFa(dto: DeliveryInfoDto): Observable<any> {
    
    return this.http.post<WebResponse>(`s005/send-mail-info-fa/`, dto);
  }

  setPdfinfo(dto: QuotationClaimCreationInfoDto,billingInfoList: BillingShowInfo[] ): Observable<any> {

    const requestBody: reS005PdfDto = {
      deliveryInfoDto:dto,
      billingInfo: billingInfoList.map(billing => ({
        ...billing,
        unit_price: String(billing.unit_price)
      }))
    };
    return this.http.post<WebResponse>(`s005/set-pdf-info/`, requestBody);
  }
}