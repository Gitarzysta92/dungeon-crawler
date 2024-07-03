import { Injectable } from "@angular/core";
import { GameLogicLibraryFactory } from "@game-logic/lib";
import { CastEffectCommand } from "../commands/cast-effect.command";
import { UiModule } from "../../game-ui/media.module";
import { AbilityModule } from "@game-logic/lib/modules/abilities/abilities.module";
import { ActorModule } from "@game-logic/lib/modules/actors/actors.module";
import { BoardModule } from "@game-logic/lib/modules/board/board.module";
import { EffectsModule } from "@game-logic/lib/modules/effects/effects.module";
import { QuestModule } from "@game-logic/lib/modules/quest/quest.module";
import { RewardModule } from "@game-logic/lib/modules/rewards/rewards.module";
import { TurnBasedGameplayModule } from "@game-logic/lib/modules/turn-based-gameplay/turn-based-gameplay.module";
import { VendorsModule } from "@game-logic/lib/modules/vendors/vendors.module";
import { IDungeonStateDeclaration } from "@game-logic/gameplay/modules/dungeon/mixins/dungeon-state/dungeon-state.interface";
import { IDungeonGameplayFeed } from "@game-logic/gameplay/modules/dungeon/dungeon.interface";
import { IDungeonGameplayState } from "../interfaces/dungeon-gameplay-state.interface";
import { RoutingService } from "src/app/aspects/navigation/api";
import { ModalService } from "../../game-ui/services/modal.service";
import { SceneModule } from "../../scene/scene.module";
import { SceneService } from "../../scene/services/scene.service";
import { AreasModule } from "@game-logic/lib/modules/areas/areas.module";
import { ItemsModule } from "@game-logic/lib/modules/items/items.module";
import { StatisticModule } from "@game-logic/lib/modules/statistics/statistics.module";
import { DungeonModule } from "@game-logic/gameplay/modules/dungeon/dungeon.module";
import { HeroModule } from "@game-logic/gameplay/modules/heroes/heroes.module";


@Injectable()
export class DungeonGameplayStateFactoryService {

  constructor(
    private readonly _routingService: RoutingService,
    private readonly _sceneService: SceneService,
    private readonly _modalService: ModalService
  ) { }

  public async initializeDungeonGameplay(
    state: IDungeonStateDeclaration,
    dataFeed: IDungeonGameplayFeed,
  ): Promise<IDungeonGameplayState> {
    const lib = GameLogicLibraryFactory.create();
    new UiModule(lib.entityService).initialize();
    new SceneModule(lib.entityService, this._sceneService).initialize();

    const turnBasedGameplayModule = new TurnBasedGameplayModule(lib.eventService).initialize();
    const actorModule = new ActorModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.eventService).initialize();
    const effectModule = new EffectsModule(lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.modifierService, lib.eventService).initialize();
    const questModule = new QuestModule(dataFeed, lib.entityService, lib.eventService, lib.conditionsService, lib.activityService).initialize();
    const tradeModule = new VendorsModule(lib.entityService, lib.activityService).initialize();
    const areaModule = new AreasModule(lib.entityService, lib.actionService, lib.eventService, lib.activityService).initialize();
    const boardModule = new BoardModule(lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.eventService).initialize();
    const abilityModule = new AbilityModule(dataFeed, lib.entityService, lib.actionService, lib.modifierService, lib.selectorService).initialize();
    const rewardsModule = new RewardModule(lib.entityService, lib.actionService, lib.modifierService, lib.eventService, lib.activityService).initialize();
    const statisticModule = new StatisticModule(dataFeed, lib.entityService, lib.actionService, lib.modifierService, lib.eventService, lib.activityService).initialize();
    const itemsModule = new ItemsModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.activityService).initialize();
    new HeroModule(lib.entityService).initialize();
    const dungeonModule = new DungeonModule(
      lib.entityService,
      areaModule.areasService,
      turnBasedGameplayModule.turnBasedService,
      actorModule.actorSevice,
      boardModule.boardService,
      effectModule.effectService,
      questModule.questService,
      abilityModule.abilitiesService,
      tradeModule.tradeService,
      rewardsModule.rewardsService,
      lib.activityService
    ).initialize();

    lib.entityService.useFactories([
      new CastEffectCommand(),
    ])

  
    const s = await lib.mixinFactory.create(state) as unknown as IDungeonGameplayState;
    s.hydrate(state);
    return s;
  }



}
