import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { catchError, finalize, Subscription, throwError } from 'rxjs';
import { IdentityNotifications, IdentityNotificationsToken } from '../../constants/notifications';
import { GuestFormComponent } from '../guest-form/guest-form.component';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ILoginEvent } from '../../models/login-event';
import { PanelTemplateComponent } from '../panel-template/panel-template.component';
import { IPanelTemplateNotificationsMap } from '../../models/panel-template-notifications-map';

@Component({
  selector: 'login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('User => Guest', [
        style({ position: 'relative' }),
        query(':enter', [
          style({ 
            transform: 'translate(150%, 0)',
            display: 'block',
          })
        ]),
        query(':leave', [
          style({ 
            transform: 'translate(0, 0)',
            display: 'block',
            position: 'absolute'
          })
        ]),
        query(':leave', animateChild()),
        group([
          query(':enter', [
            animate('150ms 100ms ease-out', style({ transform: 'translate(0, 0)' }))
          ]),
          query(':leave', [
            animate('150ms ease-out', style({ transform: 'translate(-150%, 0)' }))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
      transition('Guest => User', [
        style({ position: 'relative' }),
        query(':enter', [
          style({ 
            transform: 'translate(-150%, 0)',
            display: 'block',
          })
        ]),
        query(':leave', [
          style({ 
            transform: 'translate(0, 0)',
            display: 'block',
            position: 'absolute',
            width: "100%"
          })
        ]),
        query(':leave', animateChild()),
        group([
          query(':enter', [
            animate('150ms 150ms ease-out', style({ transform: 'translate(0, 0)' }))
          ]),
          query(':leave', [
            animate('150ms ease-out', style({ transform: 'translate(150%, 0)' }))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
    ])
  ]
})
export class LoginViewComponent implements OnInit {

  public notificationsMap: IPanelTemplateNotificationsMap;
  public mode: string = "user";
  private _formSubscription: Subscription;

  constructor(
    private readonly _routingService: RoutingService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _authenticationService: AuthenticationService,
    @Inject(IdentityNotificationsToken) private readonly _notification: IdentityNotifications,
  ) { }

  ngOnInit(): void {
    this.notificationsMap = {
      failure: this._notification.error
    };
  }

  public toggleMode(mode: string) {
    this._router.navigate([mode], { relativeTo: this._route });
    this.mode = mode;
  }

  public navigateToRegistration(): void {
    this._routingService.navigateToRegistration();
  }
  public navigateToPasswordRecovery(): void {
    this._routingService.navigateToPasswordRecovery();
  }

  public prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  public onOutletLoaded(form: UserLoginFormComponent, panelTemplate: PanelTemplateComponent) {
    this._formSubscription && this._formSubscription.unsubscribe();
    if (form instanceof UserLoginFormComponent)
    this._formSubscription = form.onSubmit.subscribe(submission => this.loginAsUser(submission, panelTemplate));

    if (form instanceof GuestFormComponent)
    this._formSubscription = form.onSubmit.subscribe(submission => this.loginAsGuest(submission, panelTemplate));
  }

  public loginAsUser(submission: ILoginEvent, panelTemplate: PanelTemplateComponent): void {
    this._authenticationService.authenticate(submission)
      .pipe(
        catchError(err => {
          panelTemplate.showFailureNotification(err);
          submission.reject();
          return throwError(err);
        }),
        finalize(() => {
          submission.resolve();
        })
      )
      .subscribe(isAuthenticated => {
        if (isAuthenticated) this._routingService.navigateToLobby();
      });
  }

  public loginAsGuest(submission: any, panelTemplate: PanelTemplateComponent): void { }

}