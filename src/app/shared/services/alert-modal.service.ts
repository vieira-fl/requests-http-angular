import { Injectable } from '@angular/core';

import { ConfirmModalComponent } from './../confirm-modal/confirm-modal.component';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(
    private modalService: BsModalService,
  ) { }

  private showAlert(message: string, type: AlertTypes, dismissTimeout?: number){
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;
    
    if(dismissTimeout){
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }
  }

  showAlertDanger(message: string){
    this.showAlert(message, AlertTypes.DANGER);
  }
  showAlertSuccess(message: string){
    this.showAlert(message, AlertTypes.SUCCESS, 2000);
  }

  showConfirm(title: string, message: string, confirmTxt?: string, cancelTxt?: string){
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent)
    bsModalRef.content.title = title;
    bsModalRef.content.message = message;
  
    if(confirmTxt){
      bsModalRef.content.confirmTxt = confirmTxt;
    }

    if(cancelTxt){
      bsModalRef.content.cancelTxt = cancelTxt;
    }

    // return bsModalRef.content.confirmResult;
    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;
  }

}
