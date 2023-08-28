import { Component, Inject, OnInit } from '@angular/core';
import { delay, tap } from 'rxjs';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { IdentityNotificationsToken, IdentityNotifications } from '../../constants/notifications';
import { IPanelTemplateNotificationsMap } from '../../models/panel-template-notifications-map';
import { AccountService } from '../../services/account/account.service';
import { PanelTemplateComponent } from '../panel-template/panel-template.component';


@Component({
  selector: 'password-recovery-view',
  templateUrl: './password-recovery-view.component.html',
  styleUrls: ['./password-recovery-view.component.scss']
})
export class PasswordRecoveryViewComponent implements OnInit {

  public email: string;
  public processing: boolean = false;
  public notificationsMap: IPanelTemplateNotificationsMap;

  constructor(
    private readonly _accountService: AccountService,
    private readonly _routingService: RoutingService,
    @Inject(IdentityNotificationsToken) private readonly _notification: IdentityNotifications,
  ) { }

  ngOnInit(): void {
    this.notificationsMap = {
      failure: this._notification.error,
      success: this._notification.loginSuccess
    };
  }
  
  public sendRecoveryLink(panelTemplate: PanelTemplateComponent) {
    this.processing = true;
    this._accountService.sendRecoveryLink(this.email)
      .pipe(
        tap(() => {
          this.processing = false;
          panelTemplate.showSuccessNotification();
        }),
        delay(panelTemplate.notificationDuration)
      )
      .subscribe({
        complete: () => {
          this._routingService.nagivateToLogin();
        },
        error: err => {
          this.processing = false;
          panelTemplate.showFailureNotification(err);
        }
      })
  }
}
