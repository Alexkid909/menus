import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {Registration} from './classes/registration';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  api = 'https://localhost:8443';
  modulePath = 'users';
  token: string;
  loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loggedIn = false;

  constructor(private http: HttpClient) {
    this.getToken();
    if (this.token) {
      this.updateLoggedInState(true);
    }
  }

  private getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  private setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', this.token);
  }

  login(userName: string, password: string) {
    const body = {userName, password };
    return this.http.post(`${this.api}/users/authenticate`, body)
      .pipe(map((response: any) => {
        this.setToken(response.data.token);
        this.updateLoggedInState(true);
        return response;
      }));
  }

  logout(): Observable<string> {
    localStorage.removeItem('auth_token');
    return new Observable((observer: any) => {
      observer.next('You have logged out');
      observer.complete();
    });
    this.updateLoggedInState(false);
  }

  register(registration: Registration) {
    return this.http.post(`${this.api}/${this.modulePath}/register`, registration).pipe(
      map((response: any) => {
        console.log(response);
        this.setToken(response.data.token);
        this.updateLoggedInState(true);
        return response;
      }), (error: any) => {
        return error;
      });
  }

  updateLoggedInState(newState: boolean) {
    this.loggedIn = newState;
    this.loggedInSubject.next(this.loggedIn);
  }

  // loggedIn(): boolean {
  //   return !!localStorage.getItem('auth_token');
  // }
}
