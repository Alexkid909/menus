import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})

export class SideBarService {

  isOpen: boolean;
  isOpenBS: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor() {}

  open() {
    this.isOpen = true;
    this.broadcastBehaviour();
  }


  close() {
    this.isOpen = false;
    this.broadcastBehaviour();
  }

  broadcastBehaviour() {
    this.isOpenBS.next(this.isOpen);
  }


}
