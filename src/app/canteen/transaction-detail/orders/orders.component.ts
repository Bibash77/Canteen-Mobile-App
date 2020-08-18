import { Component, OnInit } from '@angular/core';
import {OtherUtils} from '../../../@core/utils/OtherUtils';
import {OrderService} from '../../../@core/service/order.service';
import {SearchDto} from '../../../Modal/SearchDto';
import {ToastService} from '../../../@core/common-service/toast.service';
import {CommonConstant} from '../../../@core/constatnts/CommonConstant';
import {OtherConstant} from '../../../@core/constatnts/OtherConstant';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  search: SearchDto = new SearchDto();
  color = {
    PENDING : 'primary',
    DELIVERED: 'success',
    READY: 'warning'
  };
  orders = [];
  size = OtherConstant.pageSize;
  totalPages = 0;
  pageNo = 1;
  constructor(private orderService: OrderService,
              private toastService: ToastService) { }

  ngOnInit() {
    this.loadData();
  }

  onBack() {
    window.history.back();
  }

  loadData() {
    this.orderService.getOrderHistory(this.search, this.pageNo, this.size).subscribe((response: any) => {
      console.log(response.detail.content.length);
      // tslint:disable-next-line:no-shadowed-variable
      response.detail.content.forEach(response => {
        this.orders.push(response);
      });
      this.totalPages = response.detail.totalPages;
      this.pageNo = response.detail.pageable.pageNumber + 2;
    }, error => {
      this.toastService.presentToast('unable to display your order history' , CommonConstant.ERROR);
    });
  }

  loadMore(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      this.loadData();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
    }, OtherConstant.loadingTIme);
  }
}
