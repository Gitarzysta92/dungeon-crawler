import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { GameUiSharedModule } from "../game-ui/game-ui.shared-module";
import { SceneComponent } from "./components/scene/scene.component";
import { SceneService } from "./services/scene.service";

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
    SceneService
  ]
})
export class SceneSharedModule { }