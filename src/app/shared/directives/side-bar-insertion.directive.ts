import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appSideBarInsertion]'
})
export class SideBarInsertionDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
