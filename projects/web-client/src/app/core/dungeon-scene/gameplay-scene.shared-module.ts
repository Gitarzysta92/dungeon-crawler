import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { GameplayUiSharedModule } from "../dungeon-ui/gameplay-ui.shared-module";
import { SceneComponent } from "./components/scene/scene.component";

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
  ]
})
export class GameplaySceneSharedModule { }