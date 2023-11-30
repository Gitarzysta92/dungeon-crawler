import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { GameplayUiSharedModule } from "../dungeon-ui/gameplay-ui.shared-module";
import { SceneComponent } from "./components/scene/scene.component";
import { SceneViewModelService } from "./services/scene-view-model/scene-view-model.service";
import { SceneService } from "./services/scene.service";
import { BoardBuilderService } from "./services/board-builder/board-builder.service";
import { DungeonSceneStore } from "./stores/dungeon-scene.store";
import { SceneInteractionService } from "./services/scene-interaction/scene-interaction.service";

@NgModule({
  declarations: [
    SceneComponent
  ],
  imports: [
    SharedModule,
    GameplayUiSharedModule
  ],
  exports: [
    SceneComponent
  ],
  providers: [
    BoardBuilderService,
    SceneService,
    SceneViewModelService,
    DungeonSceneStore,
    SceneInteractionService
  ]
})
export class GameplaySceneSharedModule { }