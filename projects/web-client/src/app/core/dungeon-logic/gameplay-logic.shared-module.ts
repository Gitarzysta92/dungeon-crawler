import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { EffectResolverService } from "./services/effect-resolver/effect-resolver.service";
import { DungeonStateStore } from "./stores/dungeon-state.store";

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
  ],
  exports: [],
  providers: [
    EffectResolverService,
    DungeonStateStore
  ]
})
export class GameplayLogicSharedModule {}