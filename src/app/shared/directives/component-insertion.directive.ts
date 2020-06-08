import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appModalInsertion]'
})
export class ComponentInsertionDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
