import { NgModule } from "@angular/core";
import { DungeonStateStore } from "./stores/dungeon-state.store";
import { DungeonGameplayFactory } from "./gameplay/dungeon-gameplay.factory";


@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    DungeonGameplayFactory,
    DungeonStateStore
  ]
})
export class DungeonSharedModule {}