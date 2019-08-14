import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TenantsService} from '../tenants.service';
import {FormGroup, Validators} from '@angular/forms';
import {FormField} from '../../shared/interfaces/form-field';
import {FormFieldGroup} from '../../shared/classes/form-field-group';
import {FormAction} from '../../shared/classes/form-action';
import {FormFieldType} from '../../shared/enums/form-field-type.enum';
import {CrudStateEnum} from '../../shared/enums/crud-state.enum';
import {ToolBarFunction} from '../../shared/classes/tool-bar-function';
import { TenantInterface } from '../../shared/interfaces/tenant';
import { TenantClass} from '../classes/tenant';
import {SideBarService} from '../../shared/side-bar.service';
import {ModalService} from '../../shared/modal.service';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {ModalConfig} from '../../shared/modal-config';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss']
})
export class TenantsComponent implements OnInit {

  userTenants: Array<TenantInterface>;
  sideBarTitle: string;
  crudState: CrudStateEnum;
  tenantFormFields: Array<FormField>;
  tenantFormFieldsModel: Array<FormFieldGroup>;
  tenantFormInProgress = false;
  tenantFormSuccessful: boolean;
  tenantFormErrors: Array<string> = [];
  tenantFormActions: Array<FormAction>;
  toolbarFunctions: Array<ToolBarFunction>;
  deleteButtonFunction: ToolBarFunction;
  currentTenantId: string;
  sideBarOpen: boolean;


  constructor(public modal: ModalService,
              private tenantsService: TenantsService,
              private sideBarService: SideBarService,
              private modalService: ModalService) {
    this.saveTenant = this.saveTenant.bind(this);
  }

  ngOnInit() {
    this.tenantsService.tenantsBehaviorSubject.subscribe((tenants: Array<TenantInterface>) => {
      this.userTenants = tenants;
    });

    this.crudState = CrudStateEnum.create;

    this.tenantFormFields = [
      new FormField('tenantName', FormFieldType.text, '', Validators.required)
    ];

    this.tenantFormFieldsModel = [
      new FormFieldGroup('TenantGroup', this.tenantFormFields, []),
    ];

    this.tenantFormActions = [
      new FormAction(this.crudState, this.saveTenant)
    ];

    this.toolbarFunctions = [
      new ToolBarFunction('Create Tenant', this.showCreate, ['btn-mobile-disc'], ['fas fa-plus'])
    ];

    this.toolbarFunctions.forEach((toolbarFunction: any) => {
      toolbarFunction.definition = toolbarFunction.definition.bind(this);
    });

    this.deleteButtonFunction =
      new ToolBarFunction('Delete Tenant', this.initiateDelete, [
        'btn-artifact-action',
        'btn-artifact-action-delete',
      ], ['fas fa-trash-alt']);

    this.deleteButtonFunction.definition = this.deleteButtonFunction.definition.bind(this);
  }

  updateSidebar(state: CrudStateEnum, tenant?: TenantInterface) {
    this.setCrudState(state);
    this.sideBarTitle = `${state} Tenant`;
    this.tenantFormActions.forEach((action: FormAction) => {
      action.name = this.crudState;
    });
    this.tenantFormFields = [
      new FormField('tenantName', FormFieldType.text, tenant ? tenant.name : '', Validators.required)
    ];

    this.tenantFormActions.forEach((action: FormAction) => {
      action.name = this.crudState;
    });

    this.tenantFormFieldsModel = [
      new FormFieldGroup('TenantGroup', this.tenantFormFields, []),
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
    this.tenantsService.createTenant(tenant).subscribe((response: any) => {
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
     this.tenantsService.updateTenant(tenantId, updatedTenant).subscribe((response: any) => {
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
    this.tenantsService.deleteTenant(tenantId).subscribe((response: any) => {
    }, (errorResponse: any) => {
      // @TODO Implement error handling.
    });
  }

}
