import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()

export class AuthTokenInterceptorService implements HttpInterceptor {

  headers: any;

  constructor() {
      this.headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem('auth_token')) {
      this.headers.authorization = `Bearer ${localStorage.getItem('auth_token')}`;
    }

    let headers: HttpHeaders = req.headers;
    for (const headerName in this.headers) {
      if (this.headers.hasOwnProperty(headerName)) {
        headers = headers.set(headerName, this.headers[headerName]);
      }
    }

    const request = req.clone({
      headers
    });

    return next.handle(request);
   }
}
