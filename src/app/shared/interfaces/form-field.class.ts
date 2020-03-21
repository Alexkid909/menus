import {AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn} from '@angular/forms';
import { FormFieldType} from '../enums/form-field-type.enum';


export class FormFieldClass extends FormControl {
  title: string;
  type: FormFieldType;
  formState: string;
  cssClasses?: string | Array<string>;

  constructor(title: string,
              type: FormFieldType,
              formState?: any,
              validator?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
              asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
              cssClasses?: string | Array<string>
  ) {
    super(formState, validator, asyncValidator);
    this.title = title;
    this.type = type;
    this.formState = formState;
    this.cssClasses = cssClasses;
  }

  get name() {
    const capitalize = (word) => {
      return word.charAt(0).toUpperCase() + word.substring(1);
    };
    const words = this.title.match(/[A-Za-z][a-z]*/g) || [];
    return words.map(capitalize).join(' ');
  }
}
