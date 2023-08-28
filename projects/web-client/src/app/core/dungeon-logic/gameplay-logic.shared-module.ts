import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { DungeonStateStore } from "./stores/dugneon-state.store";
import { GamepLoopService } from "./services/game-loop/game-loop.service";

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
  ],
  exports: [],
  providers: [
    GamepLoopService,
    DungeonStateStore
  ]
})
export class GameplayLogicSharedModule {}