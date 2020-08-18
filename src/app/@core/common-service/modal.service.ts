import {Injectable, Type} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModalService{
  private openedModal: any;

  constructor(private modalController: ModalController) { }

  async openModal(openingComponent: Type<any> , status , title , values) {
    const modal = await this.modalController.create({
      component: openingComponent,
      componentProps: {modalTitle: title , data: values , status}
    });
    this.openedModal = modal;
    return await modal.present();
  }

  async openCustomModal(openingComponent: Type<any> , data) {
    const modal = await this.modalController.create({
      component: openingComponent,
      componentProps: {data}
    });
    this.openedModal = modal;
    return await modal.present();
  }

  async dismissModal(){
    if (this.openedModal) {
      this.openedModal.dismiss().then(() => { this.openedModal = null; });
    }
  }
}
