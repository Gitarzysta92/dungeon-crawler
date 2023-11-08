import { NgModule } from "@angular/core";
import { NavigationModule } from "src/app/aspects/navigation/navigation.module";
import { SoundEffectsModule } from "src/app/aspects/sound-effects/sound-effects.module";
import { ViewTemplatesModule } from "src/app/infrastructure/view-templates/view-templates.module";
import { MyProfileSharedModule } from "../my-profile/my-profile.shared-module";
import { MainMenuViewComponent } from './components/main-menu-view/main-menu-view.component';
import { MenusRoutingModule } from "./menus.routing-module";
import { CommonsSharedModule } from "../commons/commons.shared-module";
import { DevLogFeedComponent } from './components/dev-log-feed/dev-log-feed.component';
import { MenusSharedModule } from "./menus.shared-module";

@NgModule({
  declarations: [
    MainMenuViewComponent,
    MainMenuViewComponent,
    DevLogFeedComponent,
  ],
  imports: [
    MenusSharedModule,
    CommonsSharedModule,
    ViewTemplatesModule,
    NavigationModule,
    MyProfileSharedModule,
    SoundEffectsModule,
    MenusRoutingModule
  ]
})
export class MenusModule { }