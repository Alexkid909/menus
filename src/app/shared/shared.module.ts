import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalComponent} from './modal/modal.component';
import { ButtonComponent } from './button/button.component';
import { FormComponent } from './form/form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { SideBarComponent } from './side-bar/side-bar.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ModalComponent,
    ButtonComponent,
    FormComponent,
    SideBarComponent,
  ],
  exports: [
    ModalComponent,
    ButtonComponent,
    FormComponent,
    SideBarComponent
  ]
})
export class SharedModule { }

