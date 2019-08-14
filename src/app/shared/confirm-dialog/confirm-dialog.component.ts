import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalConfig} from '../modal-config';
import {ModalRef} from '../classes/modal-ref';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  @Output() onAccept: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDecline: EventEmitter<any> = new EventEmitter<any>();
  @Input() title: string;
  @Input() question: string;
  @Input() confirmMethod: string;
  @Input() dismissMethod: string;

  constructor(public config: ModalConfig, public modal: ModalRef) { }

  ngOnInit() {
    console.log('config', this.config);

  }

  accept(event: Event) {
    console.log('dialog accept', event);
    this.config.data.confirmationFunction(this.config.data.confirmationData);
  }

  decline(event: Event) {
    console.log('dialog accept', event);
    this.modal.close('somethin');
  }

}
