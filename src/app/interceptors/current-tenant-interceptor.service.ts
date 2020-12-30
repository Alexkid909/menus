import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class CurrentTenantInterceptorService implements HttpInterceptor {

  headers: HttpHeaders;
  currentTenantID: string;

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.currentTenantID = localStorage.getItem('currentTenantID');
    this.headers = this.currentTenantID ? req.headers.set('tenant-id', this.currentTenantID) : req.headers;

    const request = req.clone({
      headers: this.headers
    });

    return next.handle(request);
  }
}
