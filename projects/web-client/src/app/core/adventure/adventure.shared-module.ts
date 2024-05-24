import { NgModule } from "@angular/core";
import { SceneSharedModule } from "../scene/scene.shared-module";
import { SceneService } from "../scene/services/scene.service";

@NgModule({
  declarations: [],
  imports: [
    SceneSharedModule
  ],
  exports: [
    SceneSharedModule
  ],
  providers: [
    SceneService
  ]
})
export class AdventureSharedModule {}