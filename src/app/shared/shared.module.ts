import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { FormComponent } from './form/form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { ArtifactsComponent} from '../artefacts/artifacts.component';
import {SideBarService} from './side-bar.service';
import { ModalComponent } from './modal/modal.component';
import {ModalService} from './modal.service';
import { ModalInsertionDirective } from './directives/modal-insertion.directive';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ButtonComponent,
    FormComponent,
    SideBarComponent,
    ToolBarComponent,
    ArtifactsComponent,
    ModalComponent,
    ModalInsertionDirective,
    ConfirmDialogComponent,
    SearchComponent,
  ],
  exports: [
    ButtonComponent,
    FormComponent,
    SideBarComponent,
    ToolBarComponent,
    ArtifactsComponent,
    SearchComponent
  ],
  providers: [
    SideBarService,
    ModalService
  ],
  entryComponents: [
    ModalComponent,
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
