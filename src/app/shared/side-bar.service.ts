import { Injectable } from '@angular/core';
import {SideBarComponent} from './components/side-bar/side-bar.component';
import {ModalRefClass} from './classes/modal-ref.class';
import {ModalService} from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  sideBar: ModalRefClass;

  constructor(private modalService: ModalService) { }

  showSideBar(ChildComponent, sideBarConfig, targetComponentRef?) {
    const show = () => {
      this.sideBar = this.modalService.showNewModal(
        SideBarComponent,
        ChildComponent,
        sideBarConfig,
        targetComponentRef
      );
    };

    if (!this.sideBar || this.sideBar.isClosed) {
      show();
    } else {
      this.closeSideBar();
      this.sideBar.afterClosed.subscribe(show);
    }
  }

  closeSideBar() {
    this.sideBar.close();
  }
}
