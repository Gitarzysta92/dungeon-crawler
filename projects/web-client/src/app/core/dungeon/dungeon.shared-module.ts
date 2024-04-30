import { NgModule } from "@angular/core";
import { DungeonStateStore } from "./stores/dungeon-state.store";
import { DungeonStateFactory } from "./state/dungeon-gameplay-state.factory";


@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    DungeonStateFactory,
    DungeonStateStore
  ]
})
export class DungeonSharedModule {}