import { NgModule } from "@angular/core";
import { SceneSharedModule } from "../scene/scene.shared-module";
import { SceneService } from "../scene/services/scene.service";
import { AdventureGameplayStateFactoryService } from "./services/adventure-gameplay-state-factory.service";

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
    AdventureGameplayStateFactoryService
  ]
})
export class AdventureSharedModule {}