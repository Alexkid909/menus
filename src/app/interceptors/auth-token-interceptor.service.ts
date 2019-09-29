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
        'authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      };
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers: HttpHeaders = req.headers;
    for (const headerName in this.headers) {
      if (this.headers.hasOwnProperty(headerName)) {
        headers = headers.append(headerName, this.headers[headerName]);
      }
    }

    const request = req.clone({
      headers
    });

    // console.log('auth token interceptor', request.url, request.headers.keys());


    return next.handle(request);
   }
}
