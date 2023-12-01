import { NgModule } from "@angular/core";
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationsViewComponent } from './components/notifications-view/notifications-view.component';
import { NotificationsRoutingModule } from "./notifications.routing-module";
import { NotificationsSharedModule } from "./notifications.shared-module";

@NgModule({
  declarations: [
    NotificationsViewComponent,
    NotificationComponent
  ],
  imports: [
    NotificationsRoutingModule,
    NotificationsSharedModule 
  ]
})
export class NotificationsModule { }

