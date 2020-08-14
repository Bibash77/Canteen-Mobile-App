import { Injectable } from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async presentToast(message , color: string) {
    const toast = await this.toastController.create({
        message, duration : 10000, color , position: 'top'
    });
    await toast.present();
  }
}
