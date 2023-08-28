import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { IPanelTemplateNotificationsMap } from '../../models/panel-template-notifications-map';
import { Notification } from "src/app/aspects/notifications/api"

@Component({
  selector: 'panel-template',
  templateUrl: './panel-template.component.html',
  styleUrls: ['./panel-template.component.scss']
})
export class PanelTemplateComponent { 

  @Input() notificationsMap: IPanelTemplateNotificationsMap;

  public notificationDuration: number = 5000;
  public notifications: Notification[] = [];

  public showFailureNotification(err: HttpErrorResponse): void {
    let n;
    switch (err.status) {
      case 401:
        n = this.notificationsMap.failure;
        break; 
    }

    if (!!n) {
      this.notifications.push(n);
    }
  }

  public showSuccessNotification(): void {
    if (!!this.notificationsMap.success) {
      this.notifications.push(this.notificationsMap.success);
    }
  }

  public removeNotification(notify: Notification): void {
    this.notifications = this.notifications.filter(n => n != notify);
  }
}