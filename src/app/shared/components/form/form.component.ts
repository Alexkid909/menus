import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { FormFieldClass } from '../../interfaces/form-field.class';
import { FormFieldGroupClass } from '../../classes/form-field-group.class';
import { FormActionClass } from '../../classes/form-action.class';
import {FormValues} from '../../classes/form-values.class';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit, OnChanges {

  form: FormGroup;
  @Input() formModel: Array<FormFieldGroupClass>;
  @Input() formActions: Array<FormActionClass>;
  @Input() formErrors: Array<string> = [];
  @Input() submissionInProgress = false;
  @Input() submissionSuccessful: boolean;
  @Input() formCSSClass = '';
  @Output() onFormBuild: EventEmitter<FormValues> = new EventEmitter();
  @Input() resetFormSubject: Observable<string>;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    if (this.resetFormSubject) {
      this.resetFormSubject.subscribe(() => {
        this.resetForm();
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // @TODO not sure why this is here?
    // debugger;
    // this.buildForm();
  }

  buildForm() {
    const groupsArray = this.formBuilder.array(Object.keys(this.formModel).map(key => {
      const keyData = new FormArray(this.formModel[key]
        .fields.map((field: FormFieldClass) => new FormControl(field.formState, field.validator, field.asyncValidator)));
      return new FormGroup({fieldsArray: keyData}, this.formModel[key].validators);
    }));

    this.form = this.formBuilder.group({
      groupsArray,
    });

    this.onFormBuild.emit(new FormValues(this.form.value));
  }

  get groupsArray() {
    return this.form.get('groupsArray') as FormArray;
  }

  getGroup(groupIndex: number) {
    const result = this.form.controls.groupsArray['controls'][groupIndex];
    return result;
  }

  getModelGroup(groupIndex: number) {
    const result = this.formModel[groupIndex];
    return result;
  }

  getField(groupIndex: number, fieldIndex: number) {
    const groupName = Object.keys(this.formModel)[groupIndex];
    const group = this.formModel[groupName].fields;
    const result = group[fieldIndex];
    return result;
  }

  getFormGroupFields(formGroup: FormGroup) {
    const result = formGroup.controls.fieldsArray as FormArray;
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

  resetForm() {
    this.buildForm();
  }
}
