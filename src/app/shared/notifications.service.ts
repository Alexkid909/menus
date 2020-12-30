import {Injectable} from '@angular/core';
import {Notification as NotificationInterface, NotificationType} from './interfaces/notification';
import { BehaviorSubject } from 'rxjs';
import {Notification} from './classes/notification';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notifications: Array<NotificationInterface> | undefined = [];
  notificationsBehaviourSubject = new BehaviorSubject<Array<NotificationInterface>>([]);

  constructor() {}

  private broadcastNotifications(): void {
    this.notificationsBehaviourSubject.next(this.notifications);
  }

  newNotification(notification: NotificationInterface): void {
    this.notifications.push(notification);
    this.broadcastNotifications();
  }

  removeNotification(index: number) {
    if (index > -1) {
      this.notifications.splice(index, 1);
    }
    this.broadcastNotifications();
  }

  public newGeneralErrorNotification() {
    // tslint:disable-next-line:quotemark
    const errorNotification = new Notification(NotificationType.Warning, "Oh no, looks like something's gone wrong, please try again", 'Ooops', true);
    this.notifications.push(errorNotification);
    this.broadcastNotifications();
  }
}
