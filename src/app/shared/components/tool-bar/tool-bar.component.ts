import { Component, ViewChild, Type } from '@angular/core';
import { Input } from '@angular/core';
import {ToolBarFunctionClass} from '../../classes/tool-bar-function.class';
import {ComponentInsertionDirective} from '../../directives/component-insertion.directive';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})

export class ToolBarComponent {

  @Input() tools: Array<ToolBarFunctionClass>;
  @Input() isResponsive = false;
  @Input() toolbarClasses: string;
  childComponentType: Type<any>;

  @ViewChild(ComponentInsertionDirective) insertionPoint: ComponentInsertionDirective;

  constructor() {}

  toolBarClassString() {
    const classArray = [];
    if (this.toolbarClasses) { classArray.push(this.toolbarClasses); }
    if (this.isResponsive) { classArray.push('tool-bar-responsive'); }
    return classArray.join(' ');
  }
}
