import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { GameUiSharedModule } from "../game-ui/game-ui.shared-module";
import { SceneComponent } from "./components/scene/scene.component";
import { SceneService } from "./services/scene.service";
import { SceneAssociatedContainerComponent } from "./components/scene-associated-container/scene-associated-container.component";

@NgModule({
  declarations: [
    SceneComponent,
    SceneAssociatedContainerComponent
  ],
  imports: [
    SharedModule,
    GameUiSharedModule
  ],
  exports: [
    SceneComponent,
    SceneAssociatedContainerComponent
  ],
  providers: [
    SceneService
  ]
})
export class SceneSharedModule { }