import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebResponse } from '../../../add-ins/http/response';
import { Product, Child, S003SeachDto, reDto, reDtoSave, reDtodDelSave } from '../models/s003Dto';
import { TemporarySaveInfoDto } from '../../s017/models/s017Dto';

@Injectable({
  providedIn: 'root',
})
export class S003Service {

  constructor(private http: HttpClient) {}

  seachMast(dto: S003SeachDto): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s003/sheets-data/`, dto);
  }
  temporarySave(products: Product[], dto: S003SeachDto, exeName:string, temporarySaveInfoDto:TemporarySaveInfoDto): Observable<WebResponse> {
    if (temporarySaveInfoDto && Object.keys(temporarySaveInfoDto).length > 0) {
      const requestBody: reDtodDelSave = {
        s003SearchDto: dto,
        products: products,
        temporarySaveInfoDto :temporarySaveInfoDto,
        exeName:exeName,
  
      };

      return this.http.post<WebResponse>(`s003/temporary-del-save/`, requestBody);
    } else {
      const requestBody: reDtoSave = {
        s003SearchDto: dto,
        products: products,
        exeName:exeName,
  
      };
  
      return this.http.post<WebResponse>(`s003/temporary-save/`, requestBody);
    }

  }

  init(): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s003/s003-init/`, {});
  }
  pdf(products: Product[], dto: S003SeachDto): Observable<WebResponse> {
    const requestBody: reDto = {
      s003SearchDto: dto,
      products: products,

    };
    return this.http.post<WebResponse>(`s003/s003-pdf/`,requestBody);
  }

  seachTemporarySaveMast(dto: TemporarySaveInfoDto): Observable<WebResponse> {
    return this.http.post<WebResponse>(`s003/seach-temporary-data/`, dto);
  }
  monthSaveMast(mo_child: Child[]): Observable<WebResponse> {

    return this.http.post<WebResponse>(`s003/month-save-mast/`, mo_child);
  }
}
