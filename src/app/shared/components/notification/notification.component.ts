import { Component } from '@angular/core';
import { ComponentConfig } from '../../component.config';
import {ModalRefClass} from '../../classes/modal-ref.class';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})

export class NotificationComponent {

  constructor(public config: ComponentConfig, public sideBarModal: ModalRefClass) { }

  dismiss() {
    this.sideBarModal.close();
  }
}
