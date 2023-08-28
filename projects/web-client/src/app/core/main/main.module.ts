import { NgModule } from "@angular/core";
import { NavigationModule } from "src/app/aspects/navigation/navigation.module";
import { SoundEffectsModule } from "src/app/aspects/sound-effects/sound-effects.module";
import { ViewTemplatesModule } from "src/app/infrastructure/view-templates/view-templates.module";
import { MyProfileSharedModule } from "../my-profile/my-profile.shared-module";
import { MobileMenuButtonComponent } from "./components/mobile-menu-button/mobile-menu-button.component";
import { NotFoundViewComponent } from "./components/not-found-view/not-found-view.component";
import { MainMenuViewComponent } from './components/main-menu-view/main-menu-view.component';
import { MainRoutingModule } from "./main.routing-module";

@NgModule({
  declarations: [
    NotFoundViewComponent,
    MobileMenuButtonComponent,
    MainMenuViewComponent,
    MainMenuViewComponent
  ],
  imports: [
    ViewTemplatesModule,
    NavigationModule,
    MyProfileSharedModule,
    SoundEffectsModule,
    MainRoutingModule
  ]
})
export class MainModule { }