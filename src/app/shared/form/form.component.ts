import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractControlOptions, AsyncValidatorFn, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import { FormField } from '../interfaces/form-field';
import { FormFieldGroup } from '../classes/form-field-group';
import { FormAction } from '../classes/form-action';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit, OnChanges {

  form: FormGroup;
  @Input() formModel: Array<FormFieldGroup>;
  @Input() formActions: Array<FormAction>;
  @Input() formErrors: Array<string> = [];
  @Input() submissionInProgress = false;
  @Input() submissionSuccessful: boolean;
  @Input() formCSSClass = '';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
  }

  buildForm() {
    const groupsArray = this.formBuilder.array(Object.keys(this.formModel).map(key => {
      const keyData = new FormArray(this.formModel[key]
        .fields.map((field: FormField) => new FormControl(field.formState, field.validator, field.asyncValidator)));
      return new FormGroup({fieldsArray: keyData}, this.formModel[key].validators);
    }));

    this.form = this.formBuilder.group({
      groupsArray,
    });

    // console.log('this.form', this.form);
  }

  get groupsArray() {
    return this.form.get('groupsArray') as FormArray;
  }

  getGroup(groupIndex: number) {
    return this.form.controls.groupsArray['controls'][groupIndex];
  }

  getField(groupIndex: number, fieldIndex: number) {
    const groupName = Object.keys(this.formModel)[groupIndex];
    const group = this.formModel[groupName].fields;
    const result = group[fieldIndex];
    return result;
  }

  getFormGroupFields(formGroup: FormGroup) {
    const result = formGroup.controls.fieldsArray as FormArray;
    // console.log('getFormGroupFields', result.value);
    return result;
  }


  getGroupValidationErrorMessages(group: FormGroup) {
    if (group.errors) {
      return  Object.keys(group.errors).map(error => {
        let message;
        switch (error) {
          case 'passwordsDoNotMatch':
            message = 'Password and Password Confirmation must match';
            break;
        }
        return message;
      });
    }
  }

  getFieldValidationErrorMessages(field: FormControl) {
    if (field.errors) {
      return  Object.keys(field.errors).map(error => {
        let message;
        switch (error) {
          case 'required':
            message = 'This field is required';
            break;
          case 'minlength':
            message = `Please enter a value ${field.errors[error].requiredLength} or more characters long.`;
            break;
          case 'pattern':
            message = 'Please enter a value containing letters numbers and special characters.';
            break;
          case 'email':
            message = 'Please enter a valid email address.';
            break;
        }
        return message;
      });
    }
  }

  submitForm() {

  }

}
