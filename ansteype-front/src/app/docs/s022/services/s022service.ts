import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebResponse } from '../../../add-ins/http/response';
import { Product, Child, S022SeachDto, reDto, reDtoSave, reDtodDelSave } from '../models/s022Dto';
import { TemporarySaveInfoDto } from '../../s017/models/s017Dto';
import { S003SeachDto } from '../../s003/models/s003Dto';

@Injectable({
  providedIn: 'root',
})
export class S022Service {

  constructor(private http: HttpClient) {}

  seachMast(dto: S022SeachDto): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s022/sheets-data/`, dto);
  }
  temporarySave(products: Product[], dto: S003SeachDto, exeName:string, temporarySaveInfoDto:TemporarySaveInfoDto): Observable<WebResponse> {
    if (temporarySaveInfoDto && Object.keys(temporarySaveInfoDto).length > 0) {
      const requestBody: reDtodDelSave = {
        s003SearchDto: dto,
        products: products,
        temporarySaveInfoDto :temporarySaveInfoDto,
        exeName:exeName,
  
      };

      return this.http.post<WebResponse>(`s022/temporary-del-save/`, requestBody);
    } else {
      const requestBody: reDtoSave = {
        s003SearchDto: dto,
        products: products,
        exeName:exeName,
      };
      return this.http.post<WebResponse>(`s022/temporary-save/`, requestBody);
    }
  }

  init(): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s022/s022-init/`, {});
  }
  pdf(products: Product[], dto: S003SeachDto): Observable<WebResponse> {
    const requestBody: reDto = {
      s003SearchDto: dto,
      products: products,

    };
    return this.http.post<WebResponse>(`s022/s022-pdf/`, requestBody);
  }
  seachTemporarySaveMast(dto: TemporarySaveInfoDto): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s022/seach-temporary-data/`, dto);
  }

}
