import { ModuleWithProviders, NgModule } from '@angular/core';
import { LanguagePickerComponent } from './components/language-picker/language-picker.component';
import { SettingsRoutingModule } from './settings.routing-module';
import { SettingsViewComponent } from './components/settings-view/settings-view.component';
import { SettingsWidgetComponent } from './components/settings-widget/settings-widget.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsStore } from './stores/settings.store';
import { MAIN_INITIALIZE } from 'src/app/infrastructure/configuration/api';


@NgModule({
  declarations: [
    LanguagePickerComponent,
    SettingsViewComponent,
    SettingsWidgetComponent
  ],
  imports: [
    SharedModule,
    SettingsRoutingModule,
  ],
  providers: []
})
export class SettingsModule {
  static forRoot(): ModuleWithProviders<SettingsModule> {
    return {
      ngModule: SettingsModule,
      providers: [
        SettingsStore,
        { provide: MAIN_INITIALIZE, useExisting: SettingsStore, multi: true }
      ]
    };
  }
}