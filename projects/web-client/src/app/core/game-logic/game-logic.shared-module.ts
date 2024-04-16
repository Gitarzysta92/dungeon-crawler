import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module"
import { EffectPayloadProviderService } from "./services/effect-payload-provider.service";
import { DungeonArtificialIntelligenceService } from "./services/dungeon-artificial-intelligence.service";
import { DungeonStateStore } from "../dungeon/stores/dungeon-state.store";

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
  ],
  exports: [],
  providers: [
    DungeonStateStore,
    EffectPayloadProviderService,
    DungeonArtificialIntelligenceService
  ]
})
export class GameLogicSharedModule {}