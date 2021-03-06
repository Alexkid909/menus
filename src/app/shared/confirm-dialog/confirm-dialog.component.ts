import {Component, Input} from '@angular/core';
import {ComponentConfig} from '../component.config';
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

  constructor(public config: ComponentConfig, public modal: ModalRefClass) { }


  accept(event: any) {
    this.config.data.confirmationFunction(this.config.data.confirmationData);
    this.modal.close();
  }

  decline(event: any) {
    this.modal.close();
  }
}
