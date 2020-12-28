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
import {ComponentInsertionDirective} from '../../directives/component-insertion.directive';
import {ModalRefClass} from '../../classes/modal-ref.class';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ComponentService} from '../../component.service';

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

  @ViewChild(ComponentInsertionDirective) insertionPoint: ComponentInsertionDirective;
  isVisible = true;


  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private cd: ChangeDetectorRef,
              public modal: ModalRefClass,
              private componentService: ComponentService
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
    this.componentService.loadChildComponent(this.childComponentType, this.insertionPoint);
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  onOverlayClicked(event: any) {
    this.modal.close();
  }

  onModalClicked(event: MouseEvent) {
    event.stopPropagation();
  }

}
