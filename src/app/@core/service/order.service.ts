import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrderDto} from '../../Modal/orderDto';
import {Observable} from 'rxjs';
import {BaseService} from '../BaseService';
import {ApiUtils} from '../utils/ApiUtils';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<OrderDto> {

  static API = `v1/order`;

  constructor(readonly http: HttpClient) {
    super(http);
  }

  protected getApi(): string {
    return OrderService.API;
  }

  public getOrderHistory(searchObj: any, page: number = 1, size: number = 10): Observable<any> {
    const api = `${this.getApi()}/history?page=${page}&size=${size}`;
    const req = ApiUtils.getRequest(api);
    return this.http.post(req.url, searchObj, {headers: req.header});
  }

  public deliverItem(orderDto: OrderDto): Observable<any> {
    const api = `${this.getApi()}/changeStatus`;
    const req = ApiUtils.getRequest(api);
    return this.http.post(req.url, orderDto, {headers: req.header});
  }

  public countOrders(startDate: string , endDate: string): Observable<any> {
    const api = `${this.getApi()}/count?startDate=${startDate}&endDate=${endDate}`;
    const req = ApiUtils.getRequest(api);
    return this.http.get(req.url, {headers: req.header});
  }
}
