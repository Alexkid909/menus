import { Component, OnInit } from '@angular/core';
import { ComponentConfig } from '../../component.config';
import { ComponentRefClass } from '../../classes/component-ref.class';

@Component({
  selector: 'app-side-bar-dialog',
  templateUrl: './side-bar-dialog.component.html',
  styleUrls: ['./side-bar-dialog.component.scss']
})
export class SideBarDialogComponent {

  constructor(public config: ComponentConfig, public sideBar: ComponentRefClass) { }

  confirm() {
    this.sideBar.close();
  }

  cancel() {
    this.sideBar.close();
  }
}
