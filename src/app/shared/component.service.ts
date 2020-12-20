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
  componentRef: ComponentRef<any>;
  childComponentRef: ComponentRef<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector
  ) {}

  appendComponentToTarget(
    ComponentClass: any,
    ComponentRefClass: any,
    componentConfig: ComponentConfig,
    targetComponentRef?: ViewContainerRef
  ) {
    const map = new WeakMap();
    map.set(ComponentConfig, componentConfig);

    const componentRefClass = new ComponentRefClass();

    map.set(ComponentRefClass, componentRefClass);

    const sub = componentRefClass.afterClosed.subscribe(() => {
      this.removeModalComponentFromBody();
      sub.unsubscribe();
    });


    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ComponentClass);
    const componentRef = componentFactory.create(new ComponentInjector(this.injector, map));
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    if (targetComponentRef) {
      targetComponentRef.insert(componentRef.hostView);
    } else {
      this.appRef.attachView(componentRef.hostView);
    }

    document.body.appendChild(domElem);

    this.componentRef = componentRef;

    return componentRefClass;
  }

  private removeModalComponentFromBody() {
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
  }

  public addNewComponent(ComponentClass: Type<any>, ComponentRefClass: Type<any>, ChildComponentClass: Type<any>, config: ComponentConfig) {
    const componentRef = this.appendComponentToTarget(ComponentClass, ComponentRefClass, config);

    this.componentRef.instance.childComponentType = ChildComponentClass;

    return componentRef;
  }

  public loadChildComponent(componentType: Type<any>, insertionPoint: ComponentInsertionDirective) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    const viewContainerRef = insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.childComponentRef = viewContainerRef.createComponent(componentFactory);
    return this.childComponentRef;
  }
}
