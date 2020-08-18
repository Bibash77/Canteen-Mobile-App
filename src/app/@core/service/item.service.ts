import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../BaseService';
import {Item} from '../../canteen/modal/Item';


@Injectable({
  providedIn: 'root'
})
export class ItemService extends BaseService<Item> {
  static API = 'v1/item';

  constructor(readonly http: HttpClient) {
    super(http);
  }

  protected getApi(): string {
    return ItemService.API;
  }
}
