import { Component, Inject, OnInit } from '@angular/core';
import { delay, tap } from 'rxjs';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { IdentityNotifications, IdentityNotificationsToken } from '../../constants/notifications';
import { AuthPolicies, PoliciesToken } from '../../constants/policies';
import { TERMS_AND_CONDITIONS_URL } from '../../constants/terms-and-conditions-url';
import { IPanelTemplateNotificationsMap } from '../../models/panel-template-notifications-map';
import { IRegistrationEvent } from '../../models/registration-event';
import { AccountService } from '../../services/account/account.service';
import { PanelTemplateComponent } from '../panel-template/panel-template.component';


@Component({
  templateUrl: './registration-view.component.html',
  styleUrls: ['./registration-view.component.scss']
})
export class RegistrationViewComponent implements OnInit {

  public notifications: Notification[] = [];
  public termsAndConditionsUrl: string = TERMS_AND_CONDITIONS_URL;
  public notificationsMap: IPanelTemplateNotificationsMap;

  constructor(
    private readonly _accountService: AccountService,
    private readonly _routing: RoutingService,
    @Inject(IdentityNotificationsToken) private readonly _notification: IdentityNotifications,
    @Inject(PoliciesToken) public readonly policies: AuthPolicies,
  ) { }

  ngOnInit(): void {
    this.notificationsMap = {
      failure: this._notification.error,
      success: this._notification.loginSuccess
    };
  }

  public registerUser(registration: IRegistrationEvent, panelTemplate: PanelTemplateComponent): void {
    this._accountService.register(registration)
      .pipe(
        tap(() => {
          panelTemplate.showSuccessNotification();
          registration.resolve();
        }),
        delay(panelTemplate.notificationDuration)
      )
      .subscribe({
        complete: () => {
          this._routing.nagivateToLogin();
        },
        error: err => {
          panelTemplate.showFailureNotification(err);
          registration.reject();
        }
      });
  }
}
