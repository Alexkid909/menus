import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()

export class CurrentTenantInterceptorService implements HttpInterceptor {

  headers: HttpHeaders;
  currentTenantID: string;
  newHeaders: HttpHeaders;

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.currentTenantID = localStorage.getItem('currentTenantID');
    this.headers = this.currentTenantID ? req.headers.append('tenant-id', this.currentTenantID) : req.headers;

    const request = req.clone({
      headers: this.headers
    });


    // console.log('current tenant interceptor', request.url, request.headers.keys());

    return next.handle(request);
  }
}
