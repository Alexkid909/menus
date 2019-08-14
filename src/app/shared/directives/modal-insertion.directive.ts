import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appModalInsertion]'
})
export class ModalInsertionDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
