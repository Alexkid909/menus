import {last} from 'rxjs/operators';

export class Registration {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;

  constructor(firstName: string, lastName: string, userName: string, email: string, password: string, passwordConfirm: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.passwordConfirm = passwordConfirm;
  }

}
