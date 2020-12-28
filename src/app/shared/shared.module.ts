import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { FormComponent } from './components/form/form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { ArtifactsComponent} from './components/artefacts/artifacts.component';
import { ModalComponent } from './components/modal/modal.component';
import { ComponentService } from './component.service';
import {ComponentInsertionDirective} from './directives/component-insertion.directive';
import { ModalInsertionDirective } from './directives/modal-insertion.directive';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SearchComponent } from './components/search/search.component';
import { ArtifactSubItemComponent } from './components/artifact-sub-item/artifact-sub-item.component';
import { SideBarInsertionDirective } from './directives/side-bar-insertion.directive';
import { SideBarDialogComponent } from './components/side-bar-dialog/side-bar-dialog.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NotificationsService } from './notifications.service';
import { NotificationComponent } from './components/notification/notification.component';
import { SortComponent } from './components/sort/sort.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule
  ],
  declarations: [
    ButtonComponent,
    FormComponent,
    ToolBarComponent,
    ArtifactsComponent,
    ModalComponent,
    SortComponent,
    ModalInsertionDirective,
    ConfirmDialogComponent,
    SearchComponent,
    ArtifactSubItemComponent,
    SideBarComponent,
    SideBarInsertionDirective,
    SideBarDialogComponent,
    NotificationsComponent,
    NotificationComponent,
    ComponentInsertionDirective,
  ],
  exports: [
    ButtonComponent,
    FormComponent,
    ToolBarComponent,
    ArtifactsComponent,
    SearchComponent,
    ArtifactSubItemComponent,
    NotificationsComponent,
    SortComponent,
  ],
  providers: [
    ComponentService,
    NotificationsService,
  ],
  entryComponents: [
    ModalComponent,
    SideBarComponent,
    ConfirmDialogComponent,
    SideBarDialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }

