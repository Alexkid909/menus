import {Component, ComponentRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, Type} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import {SideBarService} from '../side-bar.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  animations: [
    trigger('openClose', [
      state('closed', style({
        transform: 'translateX(100%)'
      })),
      state('open', style({
        transform: 'translateX(0)'
      })),
      transition('closed => open', [
        animate('300ms')
      ]),
      transition('open => closed', [
        animate('300ms')
      ])
    ])
  ]
})
export class SideBarComponent {

  @Input() title: string;
  isOpen = false;

  constructor(private sideBarService: SideBarService) {
    this.sideBarService.isOpenBS.subscribe((isOpen: boolean) => {
      this.isOpen = isOpen;
    });
  }

  closeSideBar() {
    this.sideBarService.close();
  }
}
