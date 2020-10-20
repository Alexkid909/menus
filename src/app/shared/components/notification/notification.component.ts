import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {Notification} from './../../interfaces/notification';
// import {animate, state, style, transition, trigger} from '@angular/animations';




@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Output() onDismiss: EventEmitter<any> = new EventEmitter<any>();
  @Input() notification: Notification;
  @Input() index: number;
  dismissTimeout: number;

  constructor() { }

  ngOnInit(): void {
    this.dismissTimeout = setTimeout(this.dismissNotification.bind(this), 5000);
  }

  dismissNotification() {
    this.onDismiss.emit(this.index);
    clearTimeout(this.dismissTimeout);
  }
}
