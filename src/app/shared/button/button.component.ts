import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() disabled: boolean;
  @Input() loading: boolean;
  @Input() buttonText: string;


  buttonClick() {
    console.log('click');
    this.onClick.emit();
  }

  constructor() { }

  ngOnInit() {
  }

}
