import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { SideBarInsertionDirective } from './directives/side-bar-insertion.directive';
import { SideBarDialogComponent } from './components/side-bar-dialog/side-bar-dialog.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NotificationsService } from './notifications.service';
import { NotificationComponent } from './components/notification/notification.component';

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
    ModalInsertionDirective,
    ConfirmDialogComponent,
    SearchComponent,
    ArtifactSubItemComponent,
    SideBarComponent,
    SideBarInsertionDirective,
    SideBarDialogComponent,
    NotificationsComponent,
    NotificationComponent,
  ],
  exports: [
    ButtonComponent,
    FormComponent,
    ToolBarComponent,
    ArtifactsComponent,
    SearchComponent,
    ArtifactSubItemComponent,
    NotificationsComponent
  ],
  providers: [
    SideBarService,
    ModalService,
    NotificationsService
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

