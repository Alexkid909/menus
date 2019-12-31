import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  ComponentRef, Type
} from '@angular/core';

import {ModalComponent} from './components/modal/modal.component';
import {ModalConfig} from './modal.config';
import {ModalInjector} from './modal-injector';
import {ModalRefClass} from './classes/modal-ref.class';

@Injectable({
  providedIn: 'root'
})

export class ModalService {
  modalComponentRef: ComponentRef<ModalComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector
  ) {}

  appendModalComponentToBody(config: ModalConfig) {
    const map = new WeakMap();
    map.set(ModalConfig, config);

    const modalRef = new ModalRefClass();
    map.set(ModalRefClass, modalRef);

    const sub = modalRef.afterClosed.subscribe(() => {
      this.removeModalComponentFromBody();
      sub.unsubscribe();
    });


    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
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

  public open(componentType: Type<any>, config: ModalConfig) {
    const modalRef = this.appendModalComponentToBody(config);

    this.modalComponentRef.instance.childComponentType = componentType;

    return modalRef;
  }
}
