import { Component, OnInit } from '@angular/core';
import {SideBarConfig} from '../../side-bar.config';
import {SideBarRefClass} from '../../classes/side-bar-ref.class';


@Component({
  selector: 'app-side-bar-dialog',
  templateUrl: './side-bar-dialog.component.html',
  styleUrls: ['./side-bar-dialog.component.scss']
})
export class SideBarDialogComponent implements OnInit {

  constructor(public config: SideBarConfig, public sideBar: SideBarRefClass) { }

  ngOnInit() {
  }

  confirm() {
    this.sideBar.close();
  }

  cancel() {
    this.sideBar.close();
  }
}
