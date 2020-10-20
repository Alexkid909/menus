import {Component, OnInit} from '@angular/core';
import {Notification, NotificationType} from './../../interfaces/notification';
import { NotificationsService } from './../../notifications.service';
import {animate, style, transition, query, trigger, stagger, group} from '@angular/animations';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [
    trigger('presence', [
      transition('*=> *', [
        query(':enter', style( {
          opacity: 0,
          transform: 'translateY(-50%)',
        }), { optional: true }),
        query(':enter',
          stagger('500ms', group([
            animate('500ms',
              style({
                opacity: 1,
                transform: 'translateY(0)',
              })
            )
          ])), { optional: true }
        ),
        query(':leave',
          stagger('500ms', [
            animate('300ms',
              style({
                transform: 'translateY(-50%)',
              })
            ),
            animate('200ms',
              style({
                opacity: 0,
              })
            )]
          ), { optional: true }
        )
      ]),
    ])
  ]
})

export class NotificationsComponent implements OnInit {

  public notifications: Array<Notification>;
  translateXValue: string;

  constructor(private notificationsService: NotificationsService) {
    this.notifications = [];
  }

  ngOnInit(): void {
    this.notificationsService.notificationsBehaviourSubject.subscribe((notifications: Array<Notification>) => {
      if (notifications.length) {
        this.notifications = notifications;
      }
    });
  }

  dismissNotification(index: number): void {
    this.notificationsService.removeNotification(index);
  }
}
