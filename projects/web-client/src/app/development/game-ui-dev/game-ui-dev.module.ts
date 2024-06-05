import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { GameLogicSharedModule } from "../../core/game-logic/game-logic.shared-module";
import { SceneSharedModule } from "../../core/scene/scene.shared-module";
import { GameUiSharedModule } from "../../core/game-ui/game-ui.shared-module";
import { MenusSharedModule } from "../../core/menus/menus.shared-module";
import { GameUiDevRoutingModule } from "./game-ui-dev.routing-module";
import { GameUiDevSharedModule } from "./game-ui-dev.shared-module";
import { HeroBarDevComponent } from './components/hero-bar-dev/hero-bar-dev.component';


@NgModule({
  declarations: [

  
    HeroBarDevComponent
  ],
  imports: [
    SharedModule,
    GameUiDevRoutingModule,
    GameLogicSharedModule,
    SceneSharedModule,
    GameUiSharedModule,
    MenusSharedModule,
    GameUiDevSharedModule
  ],
  providers: []
})
export class GameUiDevModule { }