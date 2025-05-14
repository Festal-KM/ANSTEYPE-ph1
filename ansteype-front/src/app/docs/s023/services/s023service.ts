import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebResponse } from '../../../add-ins/http/response';
import { DeliveryInfoProductDto, reDto, reDtoDelSave, reDtoSave, reTemporaryDto, S023SeachDto } from '../models/s023Dto';
import { TemporarySaveInfoDto } from '../../s018/models/s018Dto';

@Injectable({
  providedIn: 'root',
})
export class S023Service {

  constructor(private http: HttpClient) {}

  seachRequest(dto: S023SeachDto): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s023/request-data/`, dto);
  }

  
  temporarySave(dto: S023SeachDto, products: DeliveryInfoProductDto[], exeName:string, temporarySaveInfoDto:TemporarySaveInfoDto): Observable<WebResponse> {
    if (temporarySaveInfoDto && Object.keys(temporarySaveInfoDto).length > 0) {
      const requestBody: reDtoDelSave = {
        s023SearchDto: dto,
        products: products,
        temporarySaveInfoDto :temporarySaveInfoDto,
        exeName:exeName,
  
      };

      return this.http.post<WebResponse>(`s023/temporary-del-save/`, requestBody);
    } else {
      const requestBody: reDtoSave = {
            s023SearchDto: dto,
            products: products,
            exeName:exeName,

          };
      return this.http.post<WebResponse>(`s023/temporary-save/`, requestBody);
    }
  }

  init(): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s003/s003-init/`, {});
  }
  pdf(dto: S023SeachDto, products: DeliveryInfoProductDto[]): Observable<WebResponse> {
    const requestBody: reDto = {
      s023SearchDto: dto,
      products: products,

    };
    return this.http.post<WebResponse>(`s023/s023-pdf/`, requestBody);
  }
  seachTemporarySaveMast(s023SeachDto: S023SeachDto, dto: TemporarySaveInfoDto): Observable<WebResponse> {
    const requestBody: reTemporaryDto = {
      s023SearchDto: s023SeachDto,
      temporarySaveInfo: dto,

    };
    return this.http.post<WebResponse>(`s023/seach-temporary-data/`, requestBody);
  }

}
