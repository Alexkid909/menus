import { Component, OnInit } from '@angular/core';
import {ComponentConfig} from '../../component.config';
import {ModalRefClass} from '../../classes/modal-ref.class';


@Component({
  selector: 'app-side-bar-dialog',
  templateUrl: './side-bar-dialog.component.html',
  styleUrls: ['./side-bar-dialog.component.scss']
})
export class SideBarDialogComponent implements OnInit {

  constructor(public config: ComponentConfig, public sideBar: ModalRefClass) { }

  ngOnInit() {
  }

  confirm() {
    this.sideBar.close();
  }

  cancel() {
    this.sideBar.close();
  }
}
