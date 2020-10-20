import { Notification as NotificationInt, NotificationType } from './../interfaces/notification';
export class Notification implements NotificationInt {
  type; message; title; dismissible;

  constructor(type: NotificationType, message: string, title: string, dismissible = true) {
    this.type = type;
    this.message = message;
    this.title = title;
    this.dismissible = dismissible;
  }
}
