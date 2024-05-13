import { NgModule } from "@angular/core";
import { DungeonStateStore } from "./stores/dungeon-state.store";
import { DungeonGameplayStateFactoryService } from "./services/dungeon-gameplay-state-factory.service";


@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    DungeonGameplayStateFactoryService,
    DungeonStateStore
  ]
})
export class DungeonSharedModule {}