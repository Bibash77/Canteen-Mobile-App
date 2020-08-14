import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home/home.component';
import {CanteenRoutingModule} from './canteen-routing.module';
import {IonicModule} from '@ionic/angular';
import {CanteenComponent} from './canteen.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [CanteenComponent , HomeComponent],
  imports: [
    CommonModule, FormsModule, IonicModule, RouterModule , CanteenRoutingModule
  ]
})
export class CanteenModule { }
