import { Component, OnInit } from '@angular/core';
import {SideBarDialogComponent} from '../../../shared/components/side-bar-dialog/side-bar-dialog.component';
import {SideBarConfig} from '../../../shared/side-bar.config';
import {SideBarRefClass} from '../../../shared/classes/side-bar-ref.class';

@Component({
  selector: 'app-meals-dialog',
  templateUrl: './meals-dialog.component.html',
  styleUrls: ['./meals-dialog.component.scss']
})
export class MealsDialogComponent extends SideBarDialogComponent implements OnInit {

  constructor(public config: SideBarConfig, public sideBar: SideBarRefClass) {
    super(config, sideBar);
  }

  ngOnInit() {
  }

}
