import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExploreContainerComponent} from '../explore-container/explore-container.component';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanteenRoutingModule { }
