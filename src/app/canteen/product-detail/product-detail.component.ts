import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../@core/common-service/modal.service';
import {Item} from '../modal/Item';
import {AuthorityUtil} from '../../@core/utils/AuthorityUtil';
import {OrderDto} from '../../Modal/orderDto';
import {AlertController} from '@ionic/angular';
import {LocalStorageUtil} from '../../@core/utils/local-storage-util';
import {OtherUtils} from '../../@core/utils/OtherUtils';
import {ToastService} from '../../@core/common-service/toast.service';
import {CommonConstant} from '../../@core/constatnts/CommonConstant';
import {OrderService} from '../../@core/service/order.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  data: Item;
  count: any = 1;
  inStock = true;
  orderDto: OrderDto = new OrderDto();

  constructor(private modalService: ModalService,
              private alertController: AlertController,
              private toastService: ToastService,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.inStock = this.data.itemStatus === 'INSTOCK';
  }

  closeModal() {
    return this.modalService.dismissModal();
  }

  removeQuantity() {
    if (this.count > 1) {
      this.count = this.count - 1;
    }
  }

  addQuantity() {
    if (this.count < 10) {
      this.count = this.count + 1;
    }
  }

  orderItem() {
    if (this.isOrderAble()) {
      this.orderDto.userId = Number(LocalStorageUtil.getStorage().userId);
      this.orderDto.item = this.data;
      this.orderDto.quantity = this.count;
      this.orderService.save(this.orderDto).subscribe(value => {
        if (value.detail) {
          console.log(value.detail);
          this.orderDto.expenditure = value.detail.expenditure;
          this.orderDto.orderCode = value.detail.orderCode;
          /*this.sendOrderNotification(value.detail.orderCode);*/
          OtherUtils.resetUserWallet();
          /*     AudioUtils.playSound();*/
          this.toastService.presentToast(value.detail.item.itemName + ' ordered successfully'  ,  CommonConstant.SUCCESS);
        }
      }, error => {
        console.log(error.error.message);
        this.toastService.presentToast( error.error.message ,  CommonConstant.ERROR);
      });
    } else {
      this.handleButtonClick();
    }
  }

  isOrderAble() {
    return AuthorityUtil.isOrderable(this.data.price * this.count);
  }

  async handleButtonClick() {
    const alert = await this.alertController.create({
      header: 'Insufficient Balance',
      message: 'you do not have enough balance to make this order',
      buttons: [ 'Close']
    });
    await alert.present();
  }
}
