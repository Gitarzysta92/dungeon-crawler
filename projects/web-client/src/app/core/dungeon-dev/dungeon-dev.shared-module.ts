import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { DevelopmentFlagsStore } from "./stores/development-flags.store";
import { DungeonDevService } from "./services/dungeon-dev.service";


@NgModule({
  declarations: [

  ],
  imports: [
    SharedModule,
  ],
  exports: [

  ],
  providers: [
    DevelopmentFlagsStore,
    DungeonDevService
  ]
})
export class DungeonDevSharedModule { }