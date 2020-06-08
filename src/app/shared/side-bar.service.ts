import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type} from '@angular/core';
import {ComponentConfig} from './component.config';
import { ComponentRefClass } from './classes/component-ref.class';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ComponentInjector } from './component.injector';

@Injectable({
  providedIn: 'root'
})

export class SideBarService {
  sideBarComponentRef: ComponentRef<SideBarComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector
  ) {}

  appendSideBarComponentToBody(config: ComponentConfig) {
    const map = new WeakMap();
    map.set(ComponentConfig, config);

    const sideBarRef = new ComponentRefClass();
    map.set(ComponentRefClass, sideBarRef);

    const sub = sideBarRef.afterClosed.subscribe(() => {
      this.removeSideBarComponentFromBody();
      sub.unsubscribe();
    });

    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(SideBarComponent);
    const componentRef = componentFactory.create(new ComponentInjector(this.injector, map));
    const domElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    this.appRef.attachView(componentRef.hostView);

    document.body.appendChild(domElement);

    this.sideBarComponentRef = componentRef;

    return sideBarRef;
  }

  removeSideBarComponentFromBody() {
    this.appRef.detachView(this.sideBarComponentRef.hostView);
    this.sideBarComponentRef.destroy();
  }

  public open(componentType: Type<any>, config: ComponentConfig) {
    const sideBarRef = this.appendSideBarComponentToBody(config);

    this.sideBarComponentRef.instance.childComponentType = componentType;

    return sideBarRef;
  }
}
