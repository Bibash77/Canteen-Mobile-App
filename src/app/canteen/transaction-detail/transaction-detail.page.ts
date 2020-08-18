import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.page.html',
  styleUrls: ['./transaction-detail.page.scss'],
})
export class TransactionDetailPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  navigateTab(nav){
    this.navCtrl.navigateForward(nav);
  }
}
