export interface Notification {
  type: NotificationType;
  message: string;
  title: string;
  dismissible: boolean;
}

export enum NotificationType {
  Info = 'info',
  Warning = 'warning',
  Success = 'success'
}
