import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { FormComponent } from './components/form/form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { ArtifactsComponent} from './components/artefacts/artifacts.component';
import { ModalComponent } from './components/modal/modal.component';
import { SearchComponent } from './components/search/search.component';
import { ArtifactSubItemComponent } from './components/artifact-sub-item/artifact-sub-item.component';
import { SideBarDialogComponent } from './components/side-bar-dialog/side-bar-dialog.component';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {SideBarModalComponent} from './components/side-bar-modal/side-bar-modal.component';
import {ModalService} from './services/modal.service';
import {ComponentInsertionDirective} from './directives/component-insertion.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ButtonComponent,
    FormComponent,
    ToolBarComponent,
    ArtifactsComponent,
    ModalComponent,
    ConfirmDialogComponent,
    SearchComponent,
    ArtifactSubItemComponent,
    SideBarModalComponent,
    SideBarDialogComponent,
    ComponentInsertionDirective
  ],
  exports: [
    ButtonComponent,
    FormComponent,
    ToolBarComponent,
    ArtifactsComponent,
    SearchComponent,
    ArtifactSubItemComponent
  ],
  providers: [
    ModalService
  ],
  entryComponents: [
    ModalComponent,
    SideBarModalComponent,
    ConfirmDialogComponent,
    SideBarDialogComponent
  ]
})
export class SharedModule { }
