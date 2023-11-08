import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { GameplayUiSharedModule } from "../dungeon-ui/gameplay-ui.shared-module";
import { SceneComponent } from "./components/scene/scene.component";
import { SceneViewModelService } from "./services/scene-view-model/scene-view-model.service";

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
    SceneViewModelService
  ]
})
export class GameplaySceneSharedModule { }