import { ValidatorFn } from '@angular/forms';
import { FormFieldClass } from '../interfaces/form-field.class';

export class FormFieldGroupClass {
  name: string;
  fields: Array<FormFieldClass>;
  validators: Array<ValidatorFn>;
  cssClasses?: string | Array<string>;

  constructor(name: string,
              fields: Array<FormFieldClass>,
              validators: Array<ValidatorFn>,
              cssClasses?: string | Array<string>) {
    this.name = name;
    this.fields = fields;
    this.validators = validators;
    this.cssClasses = cssClasses;
  }
}
