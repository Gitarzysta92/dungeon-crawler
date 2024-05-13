import { IAdventureGameplayDataGatherer } from "../gameplay/modules/adventure/mixins/adventure-state/adventure-state.interface";
import { initializeGameLogic } from "../lib";
import { AbilityModule } from "../lib/modules/abilities/abilities.module";
import { ActorModule } from "../lib/modules/actors/actors.module";
import { AreasModule } from "../lib/modules/areas/areas.module";
import { BoardModule } from "../lib/modules/board/board.module";
import { ContinuousGameplayModule } from "../lib/modules/continuous-gameplay/continuous-gameplay.module";
import { EffectsModule } from "../lib/modules/effects/effects.module";
import { ItemsModule } from "../lib/modules/items/items.module";
import { PerksModule } from "../lib/modules/perks/perks.module";
import { QuestModule } from "../lib/modules/quest/quest.module";
import { StatisticModule } from "../lib/modules/statistics/statistics.module";
import { VendorsModule } from "../lib/modules/vendors/vendors.module";
import { DataFeed } from "./data-feed";

export function getEntityFactory(dataFeed: DataFeed) {
  const dataGatherer: IAdventureGameplayDataGatherer = {};
  const lib = initializeGameLogic();
  new ContinuousGameplayModule().initialize();
  new ActorModule(dataFeed, dataGatherer, lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.eventService).initialize();
  new QuestModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.modifierService, lib.eventService, lib.conditionsService).initialize();
  new StatisticModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.modifierService, lib.eventService, lib.interactionService).initialize();
  new ItemsModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.modifierService, lib.eventService, lib.interactionService)
  new AreasModule(dataFeed, lib.entityService, lib.actionService, lib.modifierService, lib.selectorService, lib.eventService, lib.interactionService).initialize();
  new VendorsModule(lib.entityService, lib.interactionService).initialize();
  new EffectsModule(dataGatherer, lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.modifierService, lib.eventService).initialize();
  new BoardModule(dataGatherer, lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.eventService).initialize();
  new PerksModule(lib.entityService, lib.actionService, lib.interactionService, lib.conditionsService).initialize();
  new AbilityModule(dataFeed, lib.entityService, lib.actionService, lib.modifierService, lib.selectorService).initialize();
  return lib.entityFactory;
}