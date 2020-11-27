import {
  Component,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef, ComponentFactoryResolver, Type, ComponentRef
} from '@angular/core';
import { Input } from '@angular/core';
import {ToolBarFunctionClass} from '../../classes/tool-bar-function.class';
import {ComponentInsertionDirective} from '../../directives/component-insertion.directive';
import {ComponentRefClass} from '../../classes/component-ref.class';
import {ComponentService} from '../../component.service';
import {SideBarComponent} from '../side-bar/side-bar.component';
import {MealsDialogComponent} from '../../../meals/components/meals-dialog/meals-dialog.component';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements AfterViewInit, OnDestroy {

  @Input() tools: Array<ToolBarFunctionClass>;
  @Input() isResponsive = false;
  @Input() toolbarClasses: Array<string>;
  childComponentType: Type<any>;
  componentRef: ComponentRef<any>;

  @ViewChild(ComponentInsertionDirective) insertionPoint: ComponentInsertionDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private cd: ChangeDetectorRef,
              public componentService: ComponentService) {
  }
}
