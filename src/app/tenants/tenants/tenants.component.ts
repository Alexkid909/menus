import {Component, OnInit} from '@angular/core';
import {TenantsService} from '../tenants.service';
import {Tenant} from '../interfaces/tenant';
import {FormGroup, Validators} from '@angular/forms';
import {FormField} from '../../shared/interfaces/form-field';
import {FormFieldGroup} from '../../shared/classes/form-field-group';
import {FormAction} from '../../shared/classes/form-action';
import {FormFieldType} from '../../shared/enums/form-field-type.enum';
import {CrudStateEnum} from '../../shared/enums/crud-state.enum';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss']
})
export class TenantsComponent implements OnInit {

  userTenants: Array<Tenant>;
  sideBarTitle = 'Create New Tenant';
  crudState: CrudStateEnum;
  tenantFormFields: Array<FormField>;
  tenantFormFieldsModel: Array<FormFieldGroup>;
  tenantFormInProgress = false;
  tenantFormSuccessful: boolean;
  tenantFormErrors: Array<string> = [];
  tenantFormActions: Array<FormAction>;


  constructor(private tenantsService: TenantsService) {
    this.saveTenant = this.saveTenant.bind(this);
  }

  ngOnInit() {
    this.tenantsService.tenantsBehaviorSubject.subscribe((tenants: Array<Tenant>) => {
      this.userTenants = tenants;
      console.log(this.userTenants);
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
  }

  setCrudState(state: CrudStateEnum) {
    this.crudState = state;
  }

  saveTenant(form: FormGroup) {
    if (this.crudState = CrudStateEnum.create) {
      this.createTenant(form);
    } else {
      this.updateTenant();
    }
  }

  getField(groupIndex: number, fieldIndex: number) {
    const groupName = Object.keys(this.tenantFormFieldsModel)[groupIndex];
    const group = this.tenantFormFieldsModel[groupName].fields;
    const result = group[fieldIndex];
    return result;
  }

  createTenant(form: FormGroup) {
    const formValues: any = {};
    form.get('groupsArray').value.forEach((group, groupIndex) => {
      group.fieldsArray.forEach((value, fieldIndex) => {
        const fieldTitle = this.getField(groupIndex, fieldIndex).title;
        formValues[fieldTitle] = value;
      });
    });


    const {tenantName} = formValues;

    this.tenantFormInProgress = true;
    this.tenantsService.createTenant(tenantName).subscribe((response: any) => {
      this.tenantFormInProgress = false;
      this.tenantFormSuccessful = true;
    }, (errorResponse: any) => {
      this.tenantFormErrors = errorResponse.error.messages;
      this.tenantFormInProgress = false;
      this.tenantFormSuccessful = false;
    });

  }

  updateTenant() {


  }

}
