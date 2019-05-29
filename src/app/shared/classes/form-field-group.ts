import { ValidatorFn } from '@angular/forms';
import { FormField } from '../interfaces/form-field';

export class FormFieldGroup {
  name: string;
  fields: Array<FormField>;
  validators: Array<ValidatorFn>;

  constructor(name: string, fields: Array<FormField>, validators: Array<ValidatorFn>) {
    this.name = name;
    this.fields = fields;
    this.validators = validators;
  }
}
