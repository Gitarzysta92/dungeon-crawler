import { AbilityModule } from "../lib/modules/abilities/abilities.module";
import { ActorModule } from "../lib/modules/actors/actors.module";
import { BoardModule } from "../lib/modules/board/board.module";
import { EffectsModule } from "../lib/modules/effects/effects.module";
import { QuestModule } from "../lib/modules/quest/quest.module";
import { RewardModule } from "../lib/modules/rewards/rewards.module";
import { TurnBasedGameplayModule } from "../lib/modules/turn-based-gameplay/turn-based-gameplay.module";
import { VendorsModule } from "../lib/modules/vendors/vendors.module";
import { DungeonGameplayLogicState } from "../gameplay/modules/dungeon/mixins/dungeon-gameplay/dungeon-gameplay.factory";
import { IDungeonGameplayStateDto } from "../gameplay/modules/dungeon/mixins/dungeon-gameplay/dungeon-gameplay.interface";
import { IDungeonGameplayFeed } from "../gameplay/modules/dungeon/dungeon.interface";
import { GameLogicLibraryFactory } from "../lib/index";

export class DungeonGameplayFactory {

  public static async create(
    stateDto: IDungeonGameplayStateDto,
    dataFeed: IDungeonGameplayFeed,
    lib: ReturnType<typeof GameLogicLibraryFactory.create>
  ): Promise<DungeonGameplayLogicState> {

    const turnBasedGameplayModule = new TurnBasedGameplayModule(lib.eventService).initialize();
    const actorModule = new ActorModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.eventService).initialize();
    const boardModule = new BoardModule(lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.eventService).initialize();
    const effectModule = new EffectsModule(lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.modifierService, lib.eventService).initialize();
    const questModule = new QuestModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.modifierService, lib.eventService, lib.conditionsService).initialize();
    const abilityModule = new AbilityModule(dataFeed, lib.entityService, lib.actionService, lib.modifierService, lib.selectorService).initialize();
    const tradeModule = new VendorsModule(lib.entityService, lib.interactionService).initialize();
    const rewardsModule = new RewardModule(lib.entityService, lib.actionService, lib.selectorService, lib.modifierService, lib.eventService, lib.interactionService).initialize();

    lib.entityService.hydrate(stateDto);

    return new DungeonGameplayLogicState(
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