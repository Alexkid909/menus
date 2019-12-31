import { Injectable } from '@angular/core';
import {FormFieldGroupClass} from './shared/classes/form-field-group.class';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() {}

  public getField(groupIndex: number, fieldIndex: number, formFieldsModel: Array<FormFieldGroupClass>) {
    const groupName = Object.keys(formFieldsModel)[groupIndex];
    const group = formFieldsModel[groupName].fields;
    return group[fieldIndex];
  }
}
