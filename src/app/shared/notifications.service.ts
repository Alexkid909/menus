import { Injectable } from '@angular/core';
import {Notification as NotificationInterface, NotificationType} from './interfaces/notification';
import {Observable} from 'rxjs/internal/Observable';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Notification} from './classes/notification';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notifications: Array<NotificationInterface> | undefined = [];
  notificationsBehaviourSubject = new BehaviorSubject<Array<NotificationInterface>>([]);

  constructor() {}

  newNotification(notification: NotificationInterface): void {
    this.notifications.push(notification);
    this.notificationsBehaviourSubject.next(this.notifications);
  }
}
