import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ICONS, IconsToken } from './shared/icons/constants/icons';
import { NotificationsSharedModule } from './aspects/notifications/api';
import { MenusModule } from './core/menus/menus.module';
import { CommonsSharedModule } from './core/commons/commons.shared-module';
import { EffectsBarComponent } from './core/game-ui/components/effects-bar/effects-bar.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GameModule } from './core/game/game.module';
import { SettingsModule } from './core/settings/settings.module';
import { GamePersistenceModule } from './core/game-persistence/game-persistence.module';


@NgModule({
  declarations: [
    AppComponent,
    EffectsBarComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NotificationsSharedModule.forRoot(),
    GamePersistenceModule.forRoot(),
    MenusModule,
    GameModule,
    SettingsModule.forRoot(),
    CommonsSharedModule,
    TranslateModule.forRoot({      
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: Window, useValue: window },
    { provide: Document, useValue: document },
    { provide: IconsToken, useValue: ICONS },
    //{ provide: ErrorHandler, useClass: MyErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
