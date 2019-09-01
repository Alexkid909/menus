import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import {ToolBarFunction} from '../classes/tool-bar-function';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent {

  @Input() tools: Array<ToolBarFunction>;
  @Input() isResponsive = false;
  @Input() toolbarClasses: Array<string>;

  constructor() { }
}
