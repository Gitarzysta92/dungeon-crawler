import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { RegistrationViewComponent } from './components/registration-view/registration-view.component';
import { PasswordRecoveryViewComponent } from './components/password-recovery-view/password-recovery-view.component';
import { UserLoginFormComponent } from './components/user-login-form/user-login-form.component';
import { GuestFormComponent } from './components/guest-form/guest-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { PasswordResetViewComponent } from './components/password-reset-view/password-reset-view.component';
import { SessionExpiredViewComponent } from './components/session-expired-view/session-expired-view.component';
import {  IdentityNotificationsToken, IDENTITY_NOTIFICATIONS } from './constants/notifications';
import { policies, PoliciesToken } from './constants/policies';
import { LogoutViewComponent } from './components/logout-view/logout-view.component';
import { IdentityRoutingModule } from './identity.routing-module';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { PanelTemplateComponent } from './components/panel-template/panel-template.component';


@NgModule({
  declarations: [
    LoginViewComponent,
    RegistrationViewComponent,
    PasswordRecoveryViewComponent,
    UserLoginFormComponent,
    GuestFormComponent,
    RegistrationFormComponent,  
    PasswordResetViewComponent, 
    SessionExpiredViewComponent, LogoutViewComponent, TermsAndConditionsComponent, PanelTemplateComponent
  ],
  imports: [
    SharedModule,
    IdentityRoutingModule
  ],
  providers: [
    { provide: IdentityNotificationsToken, useValue: IDENTITY_NOTIFICATIONS },
    { provide: PoliciesToken, useValue: policies }
  ]
})
export class IdentityModule {}


