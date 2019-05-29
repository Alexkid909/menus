import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FormFieldGroup} from '../../shared/classes/form-field-group';
import {FormField} from '../../shared/interfaces/form-field';
import {FormAction} from '../../shared/classes/form-action';
import { FormFieldType} from '../../shared/enums/form-field-type.enum';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginFields: Array<FormField>;
  loginFormFieldsModel: Array<FormFieldGroup>;
  passwordRegex: RegExp;
  loginInProgress: boolean = false;
  loginSuccessful: boolean;
  loginErrors: Array<string> = [];
  loginFormActions: Array<FormAction>;

  constructor(private authService: AuthService, private router: Router) {
    this.passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    this.login = this.login.bind(this);

  }

  ngOnInit() {
    this.loginFields = [
      new FormField('userName', FormFieldType.text, '', Validators.required),
      new FormField('password', FormFieldType.password, '', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.passwordRegex)
      ])
    ];

    this.loginFormFieldsModel = [
      new FormFieldGroup('loginGroup', this.loginFields, []),
    ];

    this.loginFormActions = [
      new FormAction('Login', this.login)
    ];
  }

  getField(groupIndex: number, fieldIndex: number) {
    const groupName = Object.keys(this.loginFormFieldsModel)[groupIndex];
    const group = this.loginFormFieldsModel[groupName].fields;
    const result = group[fieldIndex];
    return result;
  }

  login(form: FormGroup) {
    const formValues: any = {};
    form.get('groupsArray').value.forEach((group, groupIndex) => {
      group.fieldsArray.forEach((value, fieldIndex) => {
        const fieldTitle = this.getField(groupIndex, fieldIndex).title;
        formValues[fieldTitle] = value;
      });
    });


    const {userName, password} = formValues;

    this.loginInProgress = true;
    this.authService.login(userName, password).subscribe((response: any) => {
      this.loginInProgress = false;
      this.loginSuccessful = true;
      this.router.navigate(['tenants']);
    }, (errorResponse: any) => {
      this.loginErrors = errorResponse.error.messages;
      this.loginInProgress = false;
      this.loginSuccessful = false;
    });
  }

  getFieldFromName(name: string) {
    const field = this.loginForm.get(name);
    return field;
  }

  getFieldValidationErrorMessages(fieldName: string) {
    const field = this.getFieldFromName(fieldName);
    if (field.errors) {
      return Object.keys(field.errors).map(error => {
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
}
