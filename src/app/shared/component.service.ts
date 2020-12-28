import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  ComponentRef, Type, ViewContainerRef
} from '@angular/core';

import {ComponentConfig} from './component.config';
import {ComponentInjector} from './component-injector';
import {ComponentInsertionDirective} from './directives/component-insertion.directive';

@Injectable({
  providedIn: 'root'
})

export class ComponentService {
  component: ComponentRef<any>;
  childComponentRef: ComponentRef<any>;
  targetViewContainerRef: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector
  ) {}

  public appendComponentToTarget(
    ComponentClass: any,
    componentRef: any,
    componentConfig: ComponentConfig,
    viewContainerRef?: ViewContainerRef
  ) {
    const map = new WeakMap();
    map.set(ComponentConfig, componentConfig);

    map.set(componentRef.constructor, componentRef);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ComponentClass);
    const component = componentFactory.create(new ComponentInjector(this.injector, map));
    const domElem = (component.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    let targetEl;


    if (viewContainerRef) {
      this.targetViewContainerRef = viewContainerRef;
      this.targetViewContainerRef.insert(component.hostView);
      targetEl = this.targetViewContainerRef.element.nativeElement;
    } else {
      this.appRef.attachView(component.hostView);
      targetEl = document.body;
    }

    targetEl.appendChild(domElem);

    this.component = component;

    return componentRef;
  }

  public removeModalComponentFromBody() {
    if (this.targetViewContainerRef) {
      this.targetViewContainerRef.detach(0);
    } else {
      this.appRef.detachView(this.component.hostView);
    }
    this.component.destroy();
  }

  public addNewComponent(
    ComponentClass: Type<any>,
    componentRef: any,
    ChildComponentClass: Type<any>,
    config: ComponentConfig,
    targetComponentRef?: ViewContainerRef,
  ) {
    const component = this.appendComponentToTarget(ComponentClass, componentRef, config, targetComponentRef);
    this.component.instance.childComponentType = ChildComponentClass;

    return component;
  }

  public loadChildComponent(componentType: Type<any>, insertionPoint: ComponentInsertionDirective) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    const viewContainerRef = insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.childComponentRef = viewContainerRef.createComponent(componentFactory);
    return this.childComponentRef;
  }
}
