import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {IonicModule} from '@ionic/angular';


const BASE_MODULES = [CommonModule, RouterModule, FormsModule, ReactiveFormsModule , HttpClientModule , IonicModule];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
   BASE_MODULES
  ] ,
  exports: [BASE_MODULES]
})
export class ThemeModule { }
