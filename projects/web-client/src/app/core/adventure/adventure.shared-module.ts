import { NgModule } from "@angular/core";
import { AdventureGameplayStateFactoryService } from "./services/adventure-gameplay-state-factory.service";
import { SceneSharedModule } from "../scene/scene.shared-module";

@NgModule({
  declarations: [],
  imports: [
    SceneSharedModule
  ],
  exports: [
    SceneSharedModule
  ],
  providers: [
    AdventureGameplayStateFactoryService,
  ]
})
export class AdventureSharedModule {}