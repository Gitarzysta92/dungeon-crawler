import { NgModule } from "@angular/core";
import { SceneSharedModule } from "../scene/scene.shared-module";
import { SceneService } from "../scene/services/scene.service";
import { AdventureGameplayFactory } from "./gameplay/adventure-gameplay.factory";

@NgModule({
  declarations: [],
  imports: [
    SceneSharedModule
  ],
  exports: [
    SceneSharedModule
  ],
  providers: [
    SceneService,
    AdventureGameplayFactory
  ]
})
export class AdventureSharedModule {}