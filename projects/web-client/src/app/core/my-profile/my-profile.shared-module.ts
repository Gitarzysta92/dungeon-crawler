import { ModuleWithProviders, NgModule } from '@angular/core';
import { MAIN_INITIALIZE } from 'src/app/infrastructure/configuration/api';
import { SharedModule } from 'src/app/shared/shared.module';
import { IntegratedInputComponent } from './components/integrated-input/integrated-input.component';
import { MyAvatarWidgetComponent } from './components/my-avatar-widget/my-avatar-widget.component';
import { MyProfileWidgetComponent } from './components/my-profile-widget/my-profile-widget.component';
import { SettingsWidgetComponent } from './components/settings-widget/settings-widget.component';
import { MyProfileNotificationsToken, MY_PROFILE_NOTIFICATIONS } from './constants/my-profile-notifications';
import { MyAccountStore } from './stores/my-account.store';
import { MyProfileStore } from './stores/my-profile.store';
import { MySettingsStore } from './stores/my-settings.store';


@NgModule({
  declarations: [
    MyProfileWidgetComponent,
    MyAvatarWidgetComponent,
    IntegratedInputComponent,
    SettingsWidgetComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    MyProfileWidgetComponent,
    MyAvatarWidgetComponent,
    SharedModule,
    IntegratedInputComponent,
    SettingsWidgetComponent
  ]
})
export class MyProfileSharedModule { 
  static forRoot(): ModuleWithProviders<MyProfileSharedModule> {
    return {
      ngModule: MyProfileSharedModule,
      providers: [
        { provide: MyProfileNotificationsToken, useValue: MY_PROFILE_NOTIFICATIONS },
        { provide: MAIN_INITIALIZE, useExisting: MyProfileStore, multi: true },
        { provide: MAIN_INITIALIZE, useExisting: MyAccountStore, multi: true },
        { provide: MAIN_INITIALIZE, useExisting: MySettingsStore, multi: true }
      ]
    };
  }
}