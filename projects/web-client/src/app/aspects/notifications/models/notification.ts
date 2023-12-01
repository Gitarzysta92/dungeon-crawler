
import { NotificationType } from "../api";
import { INotification } from "./notification.interface";
import { v4 as uuid } from 'uuid';
import { notificationApperance } from "src/app/shared/commons/components/notification/notification.component";

export class Notification implements INotification {
  public id: string;
  public type: NotificationType;
  public icon: string;
  public title: string;
  public content: string;
  public readed: boolean;
  public createdAt: Date;
  public apperance: string;
  

  constructor(data: Partial<Notification>) {
    this.id = uuid()
    this.type = data.type;
    this.icon = data.icon;
    this.title = data.title;
    this.content = data.content;
    this.readed = data.readed;
    this.apperance = this._setApperance(this.type);
  }


  private _setApperance(type: NotificationType): string {
    let apperance = notificationApperance.default;
    switch(type) {
      case NotificationType.Error:
        apperance = notificationApperance.error;
        break;
      case NotificationType.Warning:
        apperance = notificationApperance.warning;
        break;
      case NotificationType.Success:
        apperance = notificationApperance.success;
        break;
    }
    return apperance;
  }
}
