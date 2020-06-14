import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  ComponentRef, Type
} from '@angular/core';

import {ModalInjector} from '../modal-injector';
import {ModalRefClass} from '../classes/modal-ref.class';
import {ComponentConfig} from '../component.config';

@Injectable({
  providedIn: 'root'
})

export class ModalService {
  modalComponentRef: ComponentRef<any>;
  // @TODO type this ^^

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector
  ) {}

  appendModalComponentToBody(config: ComponentConfig, modalComponent: any) {
    const map = new WeakMap();
    map.set(ComponentConfig, config);

    const modalRef = new ModalRefClass();
    map.set(ModalRefClass, modalRef);

    const sub = modalRef.afterClosed.subscribe(() => {
      this.removeModalComponentFromBody();
      sub.unsubscribe();
    });


    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(modalComponent);
    const componentRef = componentFactory.create(new ModalInjector(this.injector, map));
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

  public open(componentType: Type<any>, config: ComponentConfig, modalComponent: any) {
    const modalRef = this.appendModalComponentToBody(config, modalComponent);

    this.modalComponentRef.instance.childComponentType = componentType;

    return modalRef;
  }
}
