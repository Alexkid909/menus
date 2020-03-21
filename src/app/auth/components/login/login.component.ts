import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {FormFieldGroupClass} from '../../../shared/classes/form-field-group.class';
import {FormFieldClass} from '../../../shared/interfaces/form-field.class';
import {FormActionClass} from '../../../shared/classes/form-action.class';
import { FormFieldType} from '../../../shared/enums/form-field-type.enum';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFields: Array<FormFieldClass>;
  loginFormFieldsModel: Array<FormFieldGroupClass>;
  passwordRegex: RegExp;
  loginInProgress = false;
  loginSuccessful: boolean;
  loginErrors: Array<string> = [];
  loginFormActions: Array<FormActionClass>;

  constructor(private authService: AuthService, private router: Router) {
    this.passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    this.login = this.login.bind(this);

  }

  ngOnInit() {
    this.loginFields = [
      new FormFieldClass('userName', FormFieldType.text, '', Validators.required),
      new FormFieldClass('password', FormFieldType.password, '', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.passwordRegex)
      ])
    ];

    this.loginFormFieldsModel = [
      new FormFieldGroupClass('loginGroup', this.loginFields, []),
    ];

    this.loginFormActions = [
      new FormActionClass('Login', this.login, { buttonClasses: 'btn-wide' })
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
    this.authService.login(userName, password).subscribe(() => {
      this.loginInProgress = false;
      this.loginSuccessful = true;
      this.router.navigate(['tenants']);
    }, (errorResponse: any) => {
      this.loginErrors = errorResponse.error.messages;
      this.loginInProgress = false;
      this.loginSuccessful = false;
    });
  }
}
