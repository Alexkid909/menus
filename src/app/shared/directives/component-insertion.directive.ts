import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appComponentInsertion]'
})
export class ComponentInsertionDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
