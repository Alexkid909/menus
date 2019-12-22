import {Component, OnInit} from '@angular/core';
import {TenantsService} from '../../tenants.service';
import {FormGroup, Validators} from '@angular/forms';
import {FormFieldInterface} from '../../../shared/interfaces/form-field.interface';
import {FormFieldGroupClass} from '../../../shared/classes/form-field-group.class';
import {FormActionClass} from '../../../shared/classes/form-action.class';
import {FormFieldType} from '../../../shared/enums/form-field-type.enum';
import {CrudStateEnum} from '../../../shared/enums/crud-state.enum';
import {ToolBarFunctionClass} from '../../../shared/classes/tool-bar-function.class';
import { TenantInterface } from '../../../shared/interfaces/tenant.interface';
import { TenantClass} from '../../classes/tenant.interface';
import {SideBarService} from '../../../shared/side-bar.service';
import {ModalService} from '../../../shared/modal.service';
import {ConfirmDialogComponent} from '../../../shared/confirm-dialog/confirm-dialog.component';
import {ModalConfig} from '../../../shared/modal-config';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss']
})
export class TenantsComponent implements OnInit {

  userTenants: Array<TenantInterface>;
  sideBarTitle: string;
  crudState: CrudStateEnum;
  tenantFormFields: Array<FormFieldInterface>;
  tenantFormFieldsModel: Array<FormFieldGroupClass>;
  tenantFormInProgress = false;
  tenantFormSuccessful: boolean;
  tenantFormErrors: Array<string> = [];
  tenantFormActions: Array<FormActionClass>;
  toolbarFunctions: Array<ToolBarFunctionClass>;
  deleteButtonFunction: ToolBarFunctionClass;
  currentTenantId: string;
  sideBarOpen: boolean;


  constructor(public modal: ModalService,
              private tenantsService: TenantsService,
              private sideBarService: SideBarService) {
    this.saveTenant = this.saveTenant.bind(this);
  }

  ngOnInit() {
    this.tenantsService.tenantsBehaviorSubject.subscribe((tenants: Array<TenantInterface>) => {
      this.userTenants = tenants;
    });

    this.crudState = CrudStateEnum.create;

    this.tenantFormFields = [
      new FormFieldInterface('tenantName', FormFieldType.text, '', Validators.required)
    ];

    this.tenantFormFieldsModel = [
      new FormFieldGroupClass('TenantGroup', this.tenantFormFields, []),
    ];

    this.tenantFormActions = [
      new FormActionClass(this.crudState, this.saveTenant, {
        buttonClasses: 'btn-wide'
      })
    ];

    this.toolbarFunctions = [
      new ToolBarFunctionClass('Create Tenant', this.showCreate, ['btn-mobile-disc'], ['fas fa-plus fa-lg'])
    ];

    this.toolbarFunctions.forEach((toolbarFunction: any) => {
      toolbarFunction.definition = toolbarFunction.definition.bind(this);
    });

    this.deleteButtonFunction =
      new ToolBarFunctionClass('Delete Tenant', this.initiateDelete, [
        'btn-artifact-action',
        'btn-artifact-action-delete',
      ], ['fas fa-trash-alt']);

    this.deleteButtonFunction.definition = this.deleteButtonFunction.definition.bind(this);
  }

  updateSidebar(state: CrudStateEnum, tenant?: TenantInterface) {
    this.setCrudState(state);
    this.sideBarTitle = `${state} Tenant`;
    this.tenantFormActions.forEach((action: FormActionClass) => {
      action.name = this.crudState;
    });
    this.tenantFormFields = [
      new FormFieldInterface('tenantName', FormFieldType.text, tenant ? tenant.name : '', Validators.required)
    ];

    this.tenantFormActions.forEach((action: FormActionClass) => {
      action.name = this.crudState;
    });

    this.tenantFormFieldsModel = [
      new FormFieldGroupClass('TenantGroup', this.tenantFormFields, []),
    ];

    this.sideBarService.open();
  }


  showCreate() {
    this.updateSidebar(CrudStateEnum.create);
  }

  showEdit(tenant) {
    this.updateSidebar(CrudStateEnum.edit, tenant);
    this.currentTenantId = tenant._id;
  }

  setCrudState(state: CrudStateEnum) {
    this.crudState = state;
  }

  saveTenant(form: FormGroup) {
    const formValues: any = {};
    form.get('groupsArray').value.forEach((group, groupIndex) => {
      group.fieldsArray.forEach((value, fieldIndex) => {
        const fieldTitle = this.getField(groupIndex, fieldIndex).title;
        formValues[fieldTitle] = value;
      });
    });

    const {tenantName} = formValues;
    const tenant = new TenantClass(tenantName);


    if (this.crudState === CrudStateEnum.create) {
      this.createTenant(tenant);
    } else {
      this.updateTenant(this.currentTenantId, tenant);
    }
  }

  getField(groupIndex: number, fieldIndex: number) {
    const groupName = Object.keys(this.tenantFormFieldsModel)[groupIndex];
    const group = this.tenantFormFieldsModel[groupName].fields;
    const result = group[fieldIndex];
    return result;
  }

  createTenant(tenant: TenantClass) {
    this.tenantFormInProgress = true;
    this.tenantsService.createTenant(tenant).subscribe(() => {
      this.tenantFormInProgress = false;
      this.tenantFormSuccessful = true;
      this.sideBarService.close();
    }, (errorResponse: any) => {
      this.tenantFormErrors = errorResponse.error.messages;
      this.tenantFormInProgress = false;
      this.tenantFormSuccessful = false;
    });

  }

  updateTenant(tenantId: string, updatedTenant: TenantClass) {
     this.tenantsService.updateTenant(tenantId, updatedTenant).subscribe(() => {
      this.tenantFormInProgress = false;
      this.tenantFormSuccessful = true;
      this.sideBarService.close();
    }, (errorResponse: any) => {
      this.tenantFormErrors = errorResponse.error.messages;
      this.tenantFormInProgress = false;
      this.tenantFormSuccessful = false;
    });
  }

  initiateDelete(event: Event, tenant: TenantInterface) {
    event.stopPropagation();
    const config: ModalConfig = {
      data: {
        title: `Delete ${tenant.name}?`,
        message: `Are you sure you want to delete ${tenant.name}?`,
        confirmationFunction: this.deleteTenant.bind(this),
        confirmationData: tenant._id
      }
    };
    this.modal.open(ConfirmDialogComponent, config);
  }

  deleteTenant(tenantId: string) {
    this.tenantsService.deleteTenant(tenantId).subscribe(() => {
    }, (errorResponse: any) => {
      // @TODO Implement error handling.
    });
  }

}