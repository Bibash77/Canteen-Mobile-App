import { NgModule } from '@angular/core';
import { TransactionDetailPageRoutingModule } from './transaction-detail-routing.module';

import { TransactionDetailPage } from './transaction-detail.page';
import {ThemeModule} from '../../../theme/theme.module';
import {TopUpCostDetailComponent} from './top-up-cost-detail/top-up-cost-detail.component';
import {OrdersComponent} from './orders/orders.component';

@NgModule({
  imports: [
   ThemeModule,
    TransactionDetailPageRoutingModule,
  ],
  declarations: [TransactionDetailPage , TopUpCostDetailComponent , OrdersComponent]
})
export class TransactionDetailPageModule {}
