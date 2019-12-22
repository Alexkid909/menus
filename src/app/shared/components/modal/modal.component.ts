import {
  Component,
  Type,
  OnDestroy,
  AfterViewInit,
  ComponentRef,
  ViewChild,
  ComponentFactoryResolver,
  ChangeDetectorRef, OnInit
} from '@angular/core';
import {ModalInsertionDirective} from '../../directives/modal-insertion.directive';
import {ModalRefClass} from '../../classes/modal-ref.class';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  // animations: [
  //   trigger('showHide', [
  //     state('hide', style({
  //       opacity: 0
  //     })),
  //     state('show', style({
  //       opacity: 1
  //     })),
  //     transition('hide => show', [
  //       animate('1500ms')
  //     ]),
  //     transition('show => hide', [
  //       animate('1500ms')
  //     ])
  //   ])
  // ]
})
export class ModalComponent implements AfterViewInit, OnDestroy, OnInit {
  componentRef: ComponentRef<any>;
  childComponentType: Type<any>;

  @ViewChild(ModalInsertionDirective) insertionPoint: ModalInsertionDirective;
  isVisible = true;


  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private cd: ChangeDetectorRef,
              public modal: ModalRefClass
  ) {
    this.modal.onClose.subscribe(() => {
      this.isVisible = false;
    });
  }

  ngOnInit(): void {}

  handleCloseAnimation(event: AnimationEvent) {
    const classList = (<HTMLInputElement>event.target).classList;
    if (classList.contains('overlay') && event.animationName === 'fadeOut') {
      this.modal.closed();
    }
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

  onOverlayClicked() {
    this.modal.close();
  }

  onModalClicked(event: MouseEvent) {
    event.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    const viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

}
