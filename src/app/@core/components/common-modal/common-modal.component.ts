import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../common-service/modal.service';

@Component({
  selector: 'app-common-modal',
  templateUrl: './common-modal.component.html',
  styleUrls: ['./common-modal.component.scss'],
})
export class CommonModalComponent implements OnInit {
  modalTitle: any;
  data: any;
  status;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    console.log(this.status);
  }

  closeModal(){
    return this.modalService.dismissModal();
  }
}
