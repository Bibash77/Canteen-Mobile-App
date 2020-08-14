import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {ExploreContainerComponent} from './explore-container/explore-container.component';
import {LoginPage} from './auth/login/login.page';
import {RegisterComponent} from "./auth/register/register.component";

const routes: Routes = [
  {
    path: 'canteen',
    loadChildren: () => import('./canteen/canteen.module').then(m => m.CanteenModule)
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: LoginPage
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
