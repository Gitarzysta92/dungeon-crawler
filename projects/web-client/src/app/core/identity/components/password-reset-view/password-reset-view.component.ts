import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, tap } from 'rxjs';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { JwtParser } from 'src/app/utils/jwt-parser/jwt-parser.service';
import { IdentityNotificationsToken, IdentityNotifications } from '../../constants/notifications';
import { IPanelTemplateNotificationsMap } from '../../models/panel-template-notifications-map';
import { IPasswordResetToken } from '../../models/password-reset-token';
import { AccountService } from '../../services/account/account.service';
import { PanelTemplateComponent } from '../panel-template/panel-template.component';

@Component({
  selector: 'app-password-reset-view',
  templateUrl: './password-reset-view.component.html',
  styleUrls: ['./password-reset-view.component.scss']
})
export class PasswordResetViewComponent implements OnInit {

  public notificationsMap: IPanelTemplateNotificationsMap;
  public rawToken: string;
  public token: IPasswordResetToken;
  public password: string;
  public visible: boolean = false;
  public processing: boolean = false;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _accountService: AccountService,
    private readonly _routingService: RoutingService,
    private readonly _jwtParser: JwtParser,
    @Inject(IdentityNotificationsToken) private readonly _notification: IdentityNotifications,
  ) { }

  ngOnInit(): void {
    this.token = this._jwtParser.decodeV2<IPasswordResetToken>(this._route.snapshot.params.token);
    this.rawToken = this._route.snapshot.params.token;
    this.notificationsMap = {
      failure: this._notification.error,
      success: this._notification.loginSuccess
    };
  }

  public togglePaswordVisibility(): void {
    this.visible = !this.visible;
  }

  public resetPassword(panelTemplate: PanelTemplateComponent): void {
    this.processing = true;
    this._accountService.resetPassword(this.rawToken, { username: this.token.username, password: this.password })
      .pipe(
        tap(() => {
          panelTemplate.showSuccessNotification();
          this.processing = false;
        }),
        delay(panelTemplate.notificationDuration)
      )
      .subscribe({
        complete: () => {
          this._routingService.nagivateToLogin();
        },
        error: err => {
          panelTemplate.showFailureNotification(err);
        }
      })
  }


}
