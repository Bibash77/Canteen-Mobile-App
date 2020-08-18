import { Component, OnInit } from '@angular/core';
import {ItemService} from '../service/item.service';
import {Item} from '../modal/Item';
import {Router} from '@angular/router';
import {ModalService} from '../../@core/common-service/modal.service';
import {ProductDetailComponent} from '../product-detail/product-detail.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  items: Array<Item> = [];
  constructor(private itemService: ItemService,
              private router: Router,
              private modalService: ModalService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
  this.itemService.getAll().subscribe(value => {
      this.items = value.detail;
    });
  }

  prodDetail(item){
    this.modalService.openCustomModal(ProductDetailComponent , item);
  }
}
