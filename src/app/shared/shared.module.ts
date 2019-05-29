import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalComponent} from './modal/modal.component';
import { ButtonComponent } from './button/button.component';
import { FormComponent } from './form/form.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ModalComponent,
    ButtonComponent,
    FormComponent
  ],
  exports: [
    ModalComponent,
    ButtonComponent,
    FormComponent
  ]
})
export class SharedModule { }

