import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonModalComponent} from './components/common-modal/common-modal.component';
import {ThemeModule} from '../../theme/theme.module';



@NgModule({
  declarations: [CommonModalComponent],
  imports: [
    CommonModule,
    ThemeModule,
  ],
  entryComponents: [CommonModalComponent]
})
export class CoreModule { }
