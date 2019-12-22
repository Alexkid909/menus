import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { FormComponent } from './components/form/form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { ArtifactsComponent} from './components/artefacts/artifacts.component';
import {SideBarService} from './side-bar.service';
import { ModalComponent } from './components/modal/modal.component';
import {ModalService} from './modal.service';
import { ModalInsertionDirective } from './directives/modal-insertion.directive';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SearchComponent } from './components/search/search.component';
import { ArtifactSubItemComponent } from './components/artifact-sub-item/artifact-sub-item.component';

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
    ArtifactSubItemComponent,
  ],
  exports: [
    ButtonComponent,
    FormComponent,
    SideBarComponent,
    ToolBarComponent,
    ArtifactsComponent,
    SearchComponent,
    ArtifactSubItemComponent
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

