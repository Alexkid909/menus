import {Component, OnInit} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Registration } from '../classes/registration';
import { Router } from '@angular/router';
import { FormField } from '../../shared/interfaces/form-field';
import { FormFieldGroup } from '../../shared/classes/form-field-group';
import { FormAction } from '../../shared/classes/form-action';
import { FormFieldType} from '../../shared/enums/form-field-type.enum';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {

  passwordRegex: RegExp;
  registrationFormFieldsModel: Array<FormFieldGroup>;
  registrationInProgress = false;
  registrationErrors: Array<string> = [];
  registrationSuccessful: boolean;
  userDataFields: Array<FormField>;
  userIdentifierFields: Array<FormField>;
  passwordFields: Array<FormField>;
  registrationFormActions: Array<FormAction>;


  constructor(private authService: AuthService, private router: Router) {
    this.register = this.register.bind(this);
  }

  ngOnInit() {
    this.userDataFields = [
      new FormField('firstName', FormFieldType.text, 'Alex', Validators.required),
      new FormField('lastName', FormFieldType.text, 'Robinson', Validators.required),
    ];

    this.userIdentifierFields = [
      new FormField('userName', FormFieldType.text, 'alexkid5'),
      new FormField('email', FormFieldType.text, 'alex5@robinson.com', [Validators.email, Validators.required]),
    ];

    this.passwordFields = [
      new FormField('password', FormFieldType.password, 'P@ssword321', [
        Validators.required,
        Validators.pattern(this.passwordRegex),
        Validators.minLength(8),
      ]),
      new FormField('passwordConfirm', FormFieldType.password, 'P@ssword321', [
        Validators.required,
        Validators.pattern(this.passwordRegex),
        Validators.minLength(8),
      ])
    ];

    this.registrationFormFieldsModel = [
      new FormFieldGroup('userDataGroup', this.userDataFields, []),
      new FormFieldGroup('userIdentifierGroup', this.userIdentifierFields, []),
      new FormFieldGroup('passwordGroup', this.passwordFields, [this.passwordMatchValidator])
    ];

    this.registrationFormActions = [
      new FormAction('Submit', this.register)
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
    const registration = new Registration(firstName, lastName, userName, email, password, passwordConfirm);
    this.authService.register(registration).subscribe((success: any) => {
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
