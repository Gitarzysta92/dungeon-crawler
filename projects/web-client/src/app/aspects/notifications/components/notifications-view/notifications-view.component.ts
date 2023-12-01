import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { slideInFromTopMultipleElements } from 'src/app/shared/animations/predefined-animations';
import { INotification } from '../../models/notification.interface';
import { NotificationsStore } from '../../stores/notifications.store';


@Component({
  selector: 'notifications-view',
  templateUrl: './notifications-view.component.html',
  styleUrls: ['./notifications-view.component.scss'],
  animations: [
    slideInFromTopMultipleElements('slideIn')
  ]
})
export class NotificationsViewComponent implements OnInit {

  public notifications: Observable<INotification[]>;
  public readedNotifications: Observable<INotification[]>;

  constructor(
    private readonly _notificationsStore: NotificationsStore
  ) { }

  ngOnInit(): void {
    this.notifications = this._notificationsStore.state;
    this.readedNotifications = this.notifications
      .pipe(map(ns => ns.filter(n => !n.readed)))
  }

  public markAsReaded(notify: INotification): void {
    this._notificationsStore.markAsReaded(notify);
  }

  public markAllAsReaded(): void {
    this._notificationsStore.markAllAsReaded();
  }

  public trackByFn(index) {
    return index;
  }

}
