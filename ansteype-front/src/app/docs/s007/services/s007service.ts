import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebResponse } from '../../../add-ins/http/response';
import { DeliveryInfoProductDto, ChildMemo, S007SeachDto, reDto, reTemporaryDto, reDtoSave, reDtoDelSave } from '../models/s007Dto';
import { TemporarySaveInfoDto } from '../../s018/models/s018Dto';

@Injectable({
  providedIn: 'root',
})
export class S007Service {

  constructor(private http: HttpClient) {}

  seachRequest(dto: S007SeachDto): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s007/request-data/`, dto);
  }
  temporarySave(dto: S007SeachDto, products: DeliveryInfoProductDto[], exeName:string, temporarySaveInfoDto:TemporarySaveInfoDto): Observable<WebResponse> {
    
    if (temporarySaveInfoDto && Object.keys(temporarySaveInfoDto).length > 0) {
      const requestBody: reDtoDelSave = {
        s007SearchDto: dto,
        products: products,
        temporarySaveInfoDto :temporarySaveInfoDto,
        exeName:exeName,
  
      };

      return this.http.post<WebResponse>(`s007/temporary-del-save/`, requestBody);
    } else {
      const requestBody: reDtoSave = {
        s007SearchDto: dto,
        products: products,
        exeName:exeName,

      };
      return this.http.post<WebResponse>(`s007/temporary-save/`, requestBody);
    }
  }

  init(): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s003/s003-init/`, {});
  }
  pdf(s007SeachDto: S007SeachDto, products: DeliveryInfoProductDto[]): Observable<WebResponse> {
    const requestBody: reDto = {
      s007SearchDto: s007SeachDto,
      products: products,

    };
    return this.http.post<WebResponse>(`s007/s007-pdf/`, requestBody);
  }
  seachTemporarySaveMast(s007SeachDto: S007SeachDto, dto: TemporarySaveInfoDto): Observable<WebResponse> {
    const requestBody: reTemporaryDto = {
      s007SearchDto: s007SeachDto,
      temporarySaveInfo: dto,

    };
    return this.http.post<WebResponse>(`s007/seach-temporary-data/`, requestBody);
  }
}
