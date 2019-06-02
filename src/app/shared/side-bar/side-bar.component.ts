import {AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

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
export class SideBarComponent implements OnInit, AfterContentInit {

  @Output() onCloseClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() title: string;
  @Input() isOpen = false;

  constructor() { }

  closeClick() {
    console.log('close click');
    this.onCloseClick.emit();
  }


  ngOnInit() {
  }

  ngAfterContentInit(): void {
  }

}
