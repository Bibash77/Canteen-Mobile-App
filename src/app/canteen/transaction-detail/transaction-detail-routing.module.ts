import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionDetailPage } from './transaction-detail.page';
import {TopUpCostDetailComponent} from './top-up-cost-detail/top-up-cost-detail.component';
import {OrdersComponent} from './orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionDetailPage,
    children: [
  {
    path: 'top-up',
    component: TopUpCostDetailComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionDetailPageRoutingModule {}
