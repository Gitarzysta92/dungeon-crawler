import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ICONS, IconsToken } from './shared/icons/constants/icons';

import { MyProfileSharedModule } from './core/my-profile/api';
import { NotificationsSharedModule } from './aspects/notifications/api';
import { Identity } from './core/identity/identity.routing';
import { MenusModule } from './core/menus/menus.module';
import { CommonsSharedModule } from './core/commons/commons.shared-module';
import { DungeonExitModalComponent } from './core/dungeon-ui/components/dungeon-exit-modal/dungeon-exit-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DungeonExitModalComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MyProfileSharedModule.forRoot(),
    NotificationsSharedModule.forRoot(),
    MenusModule,
    CommonsSharedModule
  ],
  providers: [
    { provide: Window, useValue: window },
    { provide: Document, useValue: document },
    { provide: HTTP_INTERCEPTORS, useClass: Identity.Interceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: ResourcesInterceptor, multi: true },
    { provide: IconsToken, useValue: ICONS },
    //{ provide: ErrorHandler, useClass: MyErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
