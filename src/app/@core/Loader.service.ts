import { Injectable } from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(
      private loadingController: LoadingController
  ) { }

  showLoader(loadMessage: string) {
    this.loadingController.create({
      message: loadMessage
    }).then((res) => {
      res.present();
    });


  }

  hideLoader() {
    this.loadingController.dismiss().then((res) => {
    }).catch((error) => {
      console.log('error', error);
    });

  }
}
