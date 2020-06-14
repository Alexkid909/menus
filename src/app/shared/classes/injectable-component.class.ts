import {ComponentRef, Type} from '@angular/core';

export class InjectableComponentClass<T> {
  componentRef: ComponentRef<any>;
  childComponentType: Type<any>;
}
