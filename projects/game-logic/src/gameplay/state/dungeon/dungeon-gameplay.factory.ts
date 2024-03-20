import { initializeLib } from "../../../lib";
import { AbilityModule } from "../../../lib/modules/abilities/abilities.module";
import { ActorModule } from "../../../lib/modules/actors/actors.module";
import { BoardModule } from "../../../lib/modules/board/board.module";
import { EffectsModule } from "../../../lib/modules/effects/effects.module";
import { QuestModule } from "../../../lib/modules/quest/quest.module";
import { RewardModule } from "../../../lib/modules/rewards/rewards.module";
import { TurnBasedGameplayModule } from "../../../lib/modules/turn-based-gameplay/turn-based-gameplay.module";
import { VendorsModule } from "../../../lib/modules/vendors/vendors.module";
import { DungeonGameplay } from "./dungeon-gameplay";
import { IDungeonGameplayDataGatherer, IDungeonGameplayFeed, IDungeonGameplayStateDto } from "./dungeon-gameplay.interface";

export class DungeonGameplayFactory {

  public async create(
    dataFeed: IDungeonGameplayFeed,
    dataGatherer: IDungeonGameplayDataGatherer,
  ): Promise<DungeonGameplay> {
    
    const lib = initializeLib();
    const turnBasedGameplayModule = new TurnBasedGameplayModule(lib.eventService).initialize();
    const actorModule = new ActorModule(dataFeed, dataGatherer, lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.eventService).initialize();
    const boardModule = new BoardModule(dataGatherer, lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.eventService).initialize();
    const effectModule = new EffectsModule(dataGatherer, lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.modifierService, lib.eventService).initialize();
    const questModule = new QuestModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.modifierService, lib.eventService, lib.conditionsService).initialize();
    const abilityModule = new AbilityModule(dataFeed, lib.entityService, lib.actionService, lib.modifierService, lib.selectorService).initialize();
    const tradeModule = new VendorsModule(lib.entityService, lib.interactionService).initialize();
    const rewardsModule = new RewardModule(dataGatherer, lib.entityService, lib.actionService, lib.selectorService, lib.modifierService, lib.eventService, lib.interactionService).initialize();

    return new DungeonGameplay(
      lib.entityService,
      turnBasedGameplayModule.turnBasedService,
      actorModule.actorSevice,
      boardModule.boardService,
      effectModule.effectService,
      questModule.questService,
      abilityModule.abilitiesService,
      tradeModule.tradeService,
      rewardsModule.rewardsService
    );
  }
}