import { Injectable } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs/internal/observable/throwError';
import {NotificationsService} from './notifications.service';
import {NotificationType} from './interfaces/notification';
import {Notification} from './classes/notification';
import {catchError} from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private notificationsService: NotificationsService) {
    this.handleError = this.handleError.bind(this);
  }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.messages}`);
    }

    this.notificationsService.newGeneralErrorNotification();
    return of([]);
  }
}
