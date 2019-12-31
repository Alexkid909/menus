import {Component, Input} from '@angular/core';
import {ModalConfig} from '../modal.config';
import {ModalRefClass} from '../classes/modal-ref.class';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  @Input() title: string;
  @Input() question: string;
  @Input() confirmMethod: string;
  @Input() dismissMethod: string;

  constructor(public config: ModalConfig, public modal: ModalRefClass) { }


  accept() {
    this.config.data.confirmationFunction(this.config.data.confirmationData);
    this.modal.close();
  }

  decline() {
    this.modal.close();
  }
}
