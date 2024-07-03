import { NgModule } from "@angular/core";
import { GameDataSharedModule } from "../game-data/game-data.shared-module";
import { GameBuilderService } from "./services/game-builder.service";

@NgModule({
  declarations: [],
  imports: [
    GameDataSharedModule
  ],
  exports: [

  ],
  providers: [
    GameBuilderService
  ]
})
export class GameBuilderSharedModule {}