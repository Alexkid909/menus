import { ValidatorFn } from '@angular/forms';
import { FormFieldInterface } from '../interfaces/form-field.interface';

export class FormFieldGroupClass {
  name: string;
  fields: Array<FormFieldInterface>;
  validators: Array<ValidatorFn>;
  cssClasses?: string | Array<string>;

  constructor(name: string,
              fields: Array<FormFieldInterface>,
              validators: Array<ValidatorFn>,
              cssClasses?: string | Array<string>) {
    this.name = name;
    this.fields = fields;
    this.validators = validators;
    this.cssClasses = cssClasses;
  }
}
