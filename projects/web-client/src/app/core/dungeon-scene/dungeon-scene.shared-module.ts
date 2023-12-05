import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { DungeonUiSharedModule } from "../dungeon-ui/dungeon-ui.shared-module";
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
    DungeonUiSharedModule
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
export class DungeonSceneSharedModule { }