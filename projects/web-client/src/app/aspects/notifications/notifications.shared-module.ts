import { ModuleWithProviders, NgModule } from "@angular/core";
import { MAIN_INITIALIZE } from "src/app/infrastructure/configuration/api";
import { SharedModule } from "src/app/shared/shared.module";
import { NotificationWidgetComponent } from "./components/notification-widget/notification-widget.component";
import { NotificationsCountWidgetComponent } from './components/notifications-count-widget/notifications-count-widget.component';
import { COMMON_NOTIFICATIONS, CommonNotificationsToken } from "./constants/common-notifications";
import { NotificationsStore } from "./stores/notifications.store";


@NgModule({
  declarations: [
    NotificationWidgetComponent,
    NotificationsCountWidgetComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    NotificationWidgetComponent,
    SharedModule,
    NotificationsCountWidgetComponent
  ],
})
export class NotificationsSharedModule {
  static forRoot(): ModuleWithProviders<NotificationsSharedModule> {
    return {
      ngModule: NotificationsSharedModule,
      providers: [
        NotificationsStore,
        { provide: CommonNotificationsToken, useValue: COMMON_NOTIFICATIONS },
        { provide: MAIN_INITIALIZE, useExisting: NotificationsStore, multi: true }
      ]
    };
  }
}