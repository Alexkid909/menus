import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type} from '@angular/core';
import {SideBarConfig} from './side-bar.config';
import {SideBarRefClass} from './classes/side-bar-ref.class';
import {SideBarComponent} from './components/side-bar/side-bar.component';
import {SideBarInjector} from './side-bar-injector';

@Injectable({
  providedIn: 'root'
})

export class SideBarService {
  sideBarComponentRef: ComponentRef<SideBarComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector
  ) {}

  appendSideBarComponentToBody(config: SideBarConfig) {
    const map = new WeakMap();
    map.set(SideBarConfig, config);

    const sideBarRef = new SideBarRefClass();
    map.set(SideBarRefClass, sideBarRef);

    const sub = sideBarRef.afterClosed.subscribe(() => {
      this.removeSideBarComponentFromBody();
      sub.unsubscribe();
    });

    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(SideBarComponent);
    const componentRef = componentFactory.create(new SideBarInjector(this.injector, map));
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

  public open(componentType: Type<any>, config: SideBarConfig) {
    const sideBarRef = this.appendSideBarComponentToBody(config);

    this.sideBarComponentRef.instance.childComponentType = componentType;

    return sideBarRef;
  }
}
