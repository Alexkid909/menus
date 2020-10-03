import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Type,
  ViewChild
} from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';
import {SideBarRefClass} from '../../classes/side-bar-ref.class';
import {SideBarInsertionDirective} from '../../directives/side-bar-insertion.directive';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('300ms', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class SideBarComponent implements AfterViewInit, OnDestroy, OnInit {
  componentRef: ComponentRef<any>;
  childComponentType: Type<any>;
  @Input() title: string;
  @Output() onSideBarClose: EventEmitter<boolean> = new EventEmitter(false);
  isOpen = true;

  @ViewChild(SideBarInsertionDirective, { static: false }) insertionPoint: SideBarInsertionDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private cd: ChangeDetectorRef,
              public sideBar: SideBarRefClass) {

  }

  ngOnInit(): void {
    this.sideBar.onClose.subscribe((event: any) => {
      this.isOpen = false;
    });
  }

  ngAfterViewInit(): void {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
    this.isOpen = true;
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  handleCloseAnimation(event: any) {
    if (event.fromState === null && event.toState === 'void') {
      this.sideBar.closed();
    }
  }

  onSideBarClicked(event: MouseEvent) {
    event.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    const viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }
}
