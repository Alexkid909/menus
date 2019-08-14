import {
  Component,
  Type,
  OnDestroy,
  AfterViewInit,
  ComponentRef,
  ViewChild,
  ComponentFactoryResolver,
  ChangeDetectorRef
} from '@angular/core';
import {ModalInsertionDirective} from '../directives/modal-insertion.directive';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  componentRef: ComponentRef<any>;
  childComponentType: Type<any>;

  @ViewChild(ModalInsertionDirective) insertionPoint: ModalInsertionDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private cd: ChangeDetectorRef
  ) {

  }

  ngAfterViewInit(): void {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  onOverlayClicked(event: MouseEvent) {
    // close the modal
  }

  onModalClicked(event: MouseEvent) {
    event.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

}
