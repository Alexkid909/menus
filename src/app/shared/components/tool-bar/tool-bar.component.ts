import { Component } from '@angular/core';
import { Input } from '@angular/core';
import {ToolBarFunctionClass} from '../../classes/tool-bar-function.class';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent {

  @Input() tools: Array<ToolBarFunctionClass>;
  @Input() isResponsive = false;
  @Input() toolbarClasses: Array<string>;

  constructor() { }
}
