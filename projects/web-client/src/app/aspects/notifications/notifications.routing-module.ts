import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NotificationsViewComponent } from "./components/notifications-view/notifications-view.component";
import { Notifications } from "./notifications.routing";


@NgModule({
  imports: [RouterModule.forChild(Notifications.routes.bindComponents({
    me: NotificationsViewComponent
  }).toDefaultFormat())],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }