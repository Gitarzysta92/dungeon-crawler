import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module"
import { DungeonStateStore } from "./stores/dungeon-state.store";

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
  ],
  exports: [],
  providers: [
    DungeonStateStore
  ]
})
export class GameplayLogicSharedModule {}