import {Injectable, Type} from '@angular/core';
import {ComponentService} from './component.service';
import {ComponentConfig} from './component.config';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private componentService: ComponentService) {}

  showNewModal(ModalClass: Type<any>, ModalComponentRefClass: Type<any>, ChildComponentClass: Type<any>, config: ComponentConfig) {
    return this.componentService.addNewComponent(ModalClass, ModalComponentRefClass, ChildComponentClass, config);
  }
}
