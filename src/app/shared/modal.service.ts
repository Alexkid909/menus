import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  ComponentRef, Type
} from '@angular/core';

import {ModalComponent} from './components/modal/modal.component';
import { ComponentConfig } from './component.config';
import { ComponentInjector } from './component.injector';
import { ComponentRefClass } from './classes/component-ref.class';

@Injectable({
  providedIn: 'root'
})

export class ModalService {
  modalComponentRef: ComponentRef<ModalComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector
  ) {}

  appendModalComponentToBody(config: ComponentConfig) {
    const map = new WeakMap();
    map.set(ComponentConfig, config);

    const modalRef = new ComponentRefClass();
    map.set(ComponentRefClass, modalRef);

    const sub = modalRef.afterClosed.subscribe(() => {
      this.removeModalComponentFromBody();
      sub.unsubscribe();
    });


    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    const componentRef = componentFactory.create(new ComponentInjector(this.injector, map));
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    this.appRef.attachView(componentRef.hostView);

    document.body.appendChild(domElem);

    this.modalComponentRef = componentRef;

    return modalRef;
  }

  private removeModalComponentFromBody() {
    this.appRef.detachView(this.modalComponentRef.hostView);
    this.modalComponentRef.destroy();
  }

  public open(componentType: Type<any>, config: ComponentConfig) {
    const modalRef = this.appendModalComponentToBody(config);

    this.modalComponentRef.instance.childComponentType = componentType;

    return modalRef;
  }
}
