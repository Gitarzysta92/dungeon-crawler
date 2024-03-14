import { initializeLib } from "../lib";
import { AbilityModule } from "../lib/modules/abilities/abilities.module";
import { ActorModule } from "../lib/modules/actors/actors.module";
import { BoardModule } from "../lib/modules/board/board.module";
import { EffectsModule } from "../lib/modules/effects/effects.module";
import { QuestModule } from "../lib/modules/quest/quest.module";
import { RewardModule } from "../lib/modules/rewards/rewards.module";
import { TradeModule } from "../lib/modules/vendors/trade.module";
import { DungeonGameplayFactory } from "./dungeon/state/dungeon-gameplay.factory";

export class GameplayFactory {
  // static initializeDungeonGameplayFactory(dataFeed: any): DungeonGameplayFactory {
  //   const lib = initializeLib();
  
  //   const playstyleModule = new PlaystyleModule().initialize();
  //   const actorModule = new ActorModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService).initialize();
  //   const boardModule = new BoardModule(lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.eventService).initialize();
  //   const effectModule = new EffectsModule(lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.modifierService, lib.eventService).initialize();
  //   const questModule = new QuestModule(lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.modifierService, lib.eventService).initialize();
  //   const abilityModule = new AbilityModule(dataFeed, lib.entityService, lib.actionService, lib.modifierService, lib.selectorService).initialize();
  //   const tradeModule = new TradeModule(lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.modifierService, lib.eventService).initialize();
  //   const rewardsModule = new RewardModule(lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.modifierService, lib.eventService).initialize();
  
  //   return new DungeonGameplayFactory(
  //     lib.entityService,
  //     lib.interactionService,
  //     playstyleModule.turnBasedService,
  //     actorModule.actorSevice,
  //     boardModule.boardService,
  //     effectModule.effectService,
  //     questModule.questService,
  //     abilityModule.
  //   )
  // }

  static initializeAdventureGameplayFactory(dataFeed: any): AdventureGameplayFactory {
    const lib = initializeLib();
  
    const playstyleModule = new PlaystyleModule().initialize();
    const actorModule = new ActorModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService).initialize();
    const boardModule = new BoardModule(lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.eventService).initialize();
    const effectModule = new EffectsModule(lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.modifierService, lib.eventService).initialize();
    const questModule = new QuestModule(lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.modifierService, lib.eventService).initialize();
    const abilityModule = new AbilityModule(dataFeed, lib.entityService, lib.actionService, lib.modifierService, lib.selectorService).initialize();
    const tradeModule = new TradeModule(lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.modifierService, lib.eventService).initialize();
    const rewardsModule = new RewardModule(lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.modifierService, lib.eventService).initialize();
  
    return new DungeonGameplayFactory(
      lib.entityService,
      lib.interactionService,
      playstyleModule.turnBasedService,
      actorModule.actorSevice,
      boardModule.boardService,
      effectModule.effectService,
      questModule.questService,
      abilityModule.
    )
  }
}