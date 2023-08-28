import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GuestFormComponent } from "./components/guest-form/guest-form.component";
import { LoginViewComponent } from "./components/login-view/login-view.component";
import { LogoutViewComponent } from "./components/logout-view/logout-view.component";
import { PasswordRecoveryViewComponent } from "./components/password-recovery-view/password-recovery-view.component";
import { PasswordResetViewComponent } from "./components/password-reset-view/password-reset-view.component";
import { RegistrationViewComponent } from "./components/registration-view/registration-view.component";
import { SessionExpiredViewComponent } from "./components/session-expired-view/session-expired-view.component";
import { UserLoginFormComponent } from "./components/user-login-form/user-login-form.component";
import { Identity } from "./identity.routing";


Identity.routes.bindComponents({
  login: { 
    _: LoginViewComponent,
    user: UserLoginFormComponent,
    guest: GuestFormComponent
  },
  signup: RegistrationViewComponent,
  recovery: {
    root: PasswordRecoveryViewComponent,
    sessionExpired: SessionExpiredViewComponent,
    token: PasswordResetViewComponent
  },
  logout: LogoutViewComponent
});

@NgModule({
  imports: [RouterModule.forChild(Identity.routes.toDefaultFormat())],
  exports: [RouterModule]
})
export class IdentityRoutingModule { }