import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { GameUiSharedModule } from "../game-ui/game-ui.shared-module";
import { SceneComponent } from "./components/scene/scene.component";
import { SceneViewModelService } from "./services/scene-view-model/scene-view-model.service";
import { SceneService } from "./services/scene.service";
import { DungeonSceneStore } from "./stores/dungeon-scene.store";
import { SceneInteractionService } from "./services/scene-interaction/scene-interaction.service";
import { MenuSceneService } from "./services/menu-scene.service";

@NgModule({
  declarations: [
    SceneComponent
  ],
  imports: [
    SharedModule,
    GameUiSharedModule
  ],
  exports: [
    SceneComponent
  ],
  providers: [
    // SceneService,
    // MenuSceneService,
    // SceneViewModelService,
    // DungeonSceneStore,
    // SceneInteractionService
  ]
})
export class SceneSharedModule { }