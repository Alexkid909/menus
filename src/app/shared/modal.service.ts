import {Injectable, Type, ViewContainerRef} from '@angular/core';
import {ComponentService} from './component.service';
import {ComponentConfig} from './component.config';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private componentService: ComponentService) {}

  showNewModal(
    ModalClass: Type<any>,
    ModalComponentRefClass: Type<any>,
    ChildComponentClass: Type<any>,
    config: ComponentConfig,
    targetComponentRef?: ViewContainerRef
  ) {
    const modalComponentRef = new ModalComponentRefClass();

    const sub = modalComponentRef.afterClosed.subscribe(() => {
      this.componentService.removeModalComponentFromBody();
      sub.unsubscribe();
    });
    return this.componentService.addNewComponent(ModalClass, modalComponentRef, ChildComponentClass, config, targetComponentRef);
  }
}
