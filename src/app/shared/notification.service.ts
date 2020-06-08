import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  ComponentRef
} from '@angular/core';

import { NotificationComponent } from './components/notification/notification.component';
import { ComponentService } from './component.service';
import {InjectableComponentClass} from './classes/injectable-component.class';

@Injectable({
  providedIn: 'root'
})

export class NotificationService extends ComponentService {
  componentRef: ComponentRef<InjectableComponentClass<NotificationComponent>>;

  constructor(componentFactoryResolver: ComponentFactoryResolver,
              appRef: ApplicationRef,
              injector: Injector
  ) {
    super(componentFactoryResolver, appRef, injector);
  }
}
