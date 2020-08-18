import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ApiUtils} from '../utils/ApiUtils';

@Injectable({
  providedIn: 'root'
})
export class TopUpHistoryService {
  static API = `v1/top-up-history`;
  constructor(protected  http: HttpClient) { }

  public topUpHistory(searchObj: any, page: number = 1, size: number = 10): Observable<any> {
    const req = ApiUtils.getRequest(`${this.getApi()}/search?page=${page}&size=${size}`);
    return this.http.post(req.url, searchObj, {headers: req.header});
  }

  protected getApi(): string {
    return TopUpHistoryService.API;
  }
}
