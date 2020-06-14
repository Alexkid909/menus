import { Component, OnInit } from '@angular/core';
import {SideBarDialogComponent} from '../../../shared/components/side-bar-dialog/side-bar-dialog.component';
import {ComponentConfig} from '../../../shared/component.config';
import {ModalRefClass} from '../../../shared/classes/modal-ref.class';

@Component({
  selector: 'app-meals-dialog',
  templateUrl: './meals-dialog.component.html',
  styleUrls: ['./meals-dialog.component.scss']
})
export class MealsDialogComponent extends SideBarDialogComponent implements OnInit {

  constructor(public config: ComponentConfig, public sideBar: ModalRefClass) {
    super(config, sideBar);
  }

  ngOnInit() {
  }

}
