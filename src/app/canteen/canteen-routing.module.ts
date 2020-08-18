import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExploreContainerComponent} from '../explore-container/explore-container.component';
import {HomeComponent} from './home/home.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {NotificationComponent} from './notification/notification.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'product-detail',
    component: ProductDetailComponent
  },
  {
    path: 'notification',
    component: NotificationComponent
  },
  {
    path: 'transaction-detail',
    loadChildren: () => import('./transaction-detail/transaction-detail.module').then( m => m.TransactionDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanteenRoutingModule { }
