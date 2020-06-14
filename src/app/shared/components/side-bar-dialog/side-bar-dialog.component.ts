import { Component, OnInit } from '@angular/core';
import { ComponentConfig } from '../../component.config';
import {ModalRefClass} from '../../classes/modal-ref.class';

@Component({
  selector: 'app-side-bar-dialog',
  templateUrl: './side-bar-dialog.component.html',
  styleUrls: ['./side-bar-dialog.component.scss']
})
export class SideBarDialogComponent {

  constructor(public config: ComponentConfig, public sideBarModal: ModalRefClass) { }

  confirm() {
    this.sideBarModal.close();
  }

  cancel() {
    this.sideBarModal.close();
  }
}
