import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { SceneComponent } from "./components/scene/scene.component";
import { BoardBuilderService } from "./services/board-builder/board-builder.service";
import { SceneInitializationService } from "./services/scene-initialization/scene-initialization.service";

@NgModule({
  declarations: [
    SceneComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    SceneComponent
  ],
  providers: [
    SceneInitializationService,
    BoardBuilderService
  ]
})
export class GameplaySceneSharedModule { }