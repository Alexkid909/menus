import {Component, OnInit} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { RegistrationClass } from '../../classes/registration.class';
import { Router } from '@angular/router';
import { FormFieldClass } from '../../../shared/interfaces/form-field.class';
import { FormFieldGroupClass } from '../../../shared/classes/form-field-group.class';
import { FormActionClass } from '../../../shared/classes/form-action.class';
import { FormFieldType} from '../../../shared/enums/form-field-type.enum';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {

  passwordRegex: RegExp;
  registrationFormFieldsModel: Array<FormFieldGroupClass>;
  registrationInProgress = false;
  registrationErrors: Array<string> = [];
  registrationSuccessful: boolean;
  userDataFields: Array<FormFieldClass>;
  userIdentifierFields: Array<FormFieldClass>;
  passwordFields: Array<FormFieldClass>;
  registrationFormActions: Array<FormActionClass>;


  constructor(private authService: AuthService, private router: Router) {
    this.register = this.register.bind(this);
  }

  ngOnInit() {
    this.userDataFields = [
      new FormFieldClass('firstName', FormFieldType.text, '', Validators.required),
      new FormFieldClass('lastName', FormFieldType.text, '', Validators.required),
    ];

    this.userIdentifierFields = [
      new FormFieldClass('userName', FormFieldType.text, ''),
      new FormFieldClass('email', FormFieldType.text, '', [Validators.email, Validators.required]),
    ];

    this.passwordFields = [
      new FormFieldClass('password', FormFieldType.password, '', [
        Validators.required,
        Validators.pattern(this.passwordRegex),
        Validators.minLength(8),
      ]),
      new FormFieldClass('passwordConfirm', FormFieldType.password, '', [
        Validators.required,
        Validators.pattern(this.passwordRegex),
        Validators.minLength(8),
      ])
    ];

    this.registrationFormFieldsModel = [
      new FormFieldGroupClass('userDataGroup', this.userDataFields, []),
      new FormFieldGroupClass('userIdentifierGroup', this.userIdentifierFields, []),
      new FormFieldGroupClass('passwordGroup', this.passwordFields, [this.passwordMatchValidator])
    ];

    this.registrationFormActions = [
      new FormActionClass('Submit', this.register, { buttonClasses: 'btn-wide' })
    ];
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const condition2 = formGroup.controls.fieldsArray['controls'].every((control: FormControl) => control.dirty);
    const condition = !formGroup.controls.fieldsArray.value.every( (val, i, arr) => val === arr[0] );
    return condition && condition2 ? {passwordsDoNotMatch: true} : null;
  }

  getField(groupIndex: number, fieldIndex: number) {
    const groupName = Object.keys(this.registrationFormFieldsModel)[groupIndex];
    const group = this.registrationFormFieldsModel[groupName].fields;
    const result = group[fieldIndex];
    return result;
  }

  register(form: FormGroup) {
    const formValues: any = {};
    form.get('groupsArray').value.forEach((group, groupIndex) => {
      group.fieldsArray.forEach((value, fieldIndex) => {
        const fieldTitle = this.getField(groupIndex, fieldIndex).title;
        formValues[fieldTitle] = value;
      });
    });

    this.registrationInProgress = true;
    const {firstName, lastName, userName, email, password, passwordConfirm} = formValues;
    const registration = new RegistrationClass(firstName, lastName, userName, email, password, passwordConfirm);
    this.authService.register(registration).subscribe(() => {
      this.registrationInProgress = false;
      this.registrationSuccessful = true;
      this.router.navigate(['tenants']);
    }, (errorResponse: any ) => {
      this.registrationSuccessful = false;
      this.registrationErrors = errorResponse.error.messages;
      console.log(this.registrationErrors);
      this.registrationInProgress = false;
    });
  }

}
