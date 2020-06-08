import { Component } from '@angular/core';
import { ComponentConfig } from '../../component.config';
import { ComponentRefClass } from '../../classes/component-ref.class';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})

export class NotificationComponent {

  constructor(public config: ComponentConfig, public sideBar: ComponentRefClass) { }

  dismiss() {
    this.sideBar.close();
  }
}
