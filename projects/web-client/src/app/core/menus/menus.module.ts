import { NgModule } from "@angular/core";
import { NavigationModule } from "src/app/aspects/navigation/navigation.module";
import { SoundEffectsModule } from "src/app/aspects/sound-effects/sound-effects.module";
import { ViewTemplatesModule } from "src/app/infrastructure/view-templates/view-templates.module";
import { MainMenuViewComponent } from './components/main-menu-view/main-menu-view.component';
import { MenusRoutingModule } from "./menus.routing-module";
import { DevLogFeedComponent } from './components/dev-log-feed/dev-log-feed.component';
import { SharedModule } from "src/app/shared/shared.module";
import { MenusViewComponent } from './components/menus-view/menus-view.component';
import { SceneSharedModule } from "../scene/scene.shared-module";
import { MenusFooterComponent } from './components/menus-footer/menus-footer.component';
import { GameUiSharedModule } from "../game-ui/game-ui.shared-module";
import { MenusResolver } from "./resolvers/menus.resolver";
import { MenuSceneService } from "../scene/services/menu-scene.service";

@NgModule({
  declarations: [
    MainMenuViewComponent,
    MainMenuViewComponent,
    DevLogFeedComponent,
    MenusViewComponent,
    MenusFooterComponent,
  ],
  imports: [
    SharedModule,
    ViewTemplatesModule,
    NavigationModule,
    SoundEffectsModule,
    MenusRoutingModule,
    SceneSharedModule,
    GameUiSharedModule
  ],
  providers: [
    MenusResolver,
    MenuSceneService
  ]
})
export class MenusModule { }