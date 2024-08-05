import { Injectable } from "@angular/core";
import { GameLogicLibraryFactory } from "@game-logic/lib";
import { UiModule } from "../../game-ui/media.module";
import { ActorModule } from "@game-logic/lib/modules/actors/actors.module";
import { QuestModule } from "@game-logic/lib/modules/quest/quest.module";
import { VendorsModule } from "@game-logic/lib/modules/vendors/vendors.module";
import { DungeonModule } from "@game-logic/gameplay/modules/dungeon/dungeon.module";
import { AreasModule } from "@game-logic/lib/modules/areas/areas.module";
import { ContinuousGameplayModule } from "@game-logic/lib/modules/continuous-gameplay/continuous-gameplay.module";
import { EnterDungeonCommand } from "../commands/enter-dungeon.command";
import { RoutingService } from "src/app/aspects/navigation/api";
import { AdventureModule } from "@game-logic/gameplay/modules/adventure/adventure.module";
import { IAdventureGameplayDataFeed } from "@game-logic/gameplay/modules/adventure/adventure.interface";
import { BoardModule } from "@game-logic/lib/modules/board/board.module";
import { AbilityModule } from "@game-logic/lib/modules/abilities/abilities.module";
import { TurnBasedGameplayModule } from "@game-logic/lib/modules/turn-based-gameplay/turn-based-gameplay.module";
import { RewardModule } from "@game-logic/lib/modules/rewards/rewards.module";
import { SceneModule } from "../../scene/scene.module";
import { BoardAreasModule } from "@game-logic/gameplay/modules/board-areas/board-areas.module";
import { HeroModule } from "@game-logic/gameplay/modules/heroes/heroes.module";
import { ItemsModule } from "@game-logic/lib/modules/items/items.module";
import { StatisticModule } from "@game-logic/lib/modules/statistics/statistics.module";
import { BoardTravelCommandFactory } from "../commands/board-travel.command";
import { SceneService } from "../../scene/services/scene.service";
import { StartQuestCommandFactory } from "../../game/commands/start-quest.command";
import { FinishQuestCommandFactory } from "../../game/commands/finish-quest.command";
import { TradeCommandFactory } from "../../game/commands/trade.command";
import { ModalService } from "../../game-ui/services/modal.service";
import { CardsModule } from "@game-logic/lib/modules/cards/cards.module";
import { IAdventureGameplayState } from "./adventure-gameplay.interface";
import { AdventureGameplay } from "./adventure.gameplay";


@Injectable()
export class AdventureGameplayFactory {

  constructor(
    private readonly _routingService: RoutingService,
    private readonly _sceneService: SceneService,
    private readonly _modalService: ModalService
  ) { }

  public async initializeAdventureGameplay(state: IAdventureGameplayState, dataFeed: IAdventureGameplayDataFeed): Promise<AdventureGameplay> {
    const lib = GameLogicLibraryFactory.create();
    new UiModule(lib.entityService).initialize();
    new SceneModule(lib.entityService, this._sceneService).initialize();

    const continousGameplay = new ContinuousGameplayModule().initialize()
    const turnBasedGameplay = new TurnBasedGameplayModule(lib.entityService, lib.eventService, lib.actionService, lib.mixinFactory, lib.activityService).initialize();
    const actorModule = new ActorModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.eventService, lib.gatheringService).initialize();
    const questModule = new QuestModule(dataFeed, lib.entityService, lib.eventService, lib.conditionsService, lib.activityService).initialize();
    const tradeModule = new VendorsModule(lib.entityService, lib.activityService).initialize();
    const areaModule = new AreasModule(lib.entityService, lib.actionService, lib.eventService, lib.activityService).initialize();
    const boardModule = new BoardModule(lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.eventService).initialize();
    const abilityModule = new AbilityModule(dataFeed, lib.entityService, lib.actionService, lib.modifierService, lib.activityService).initialize();
    const rewardsModule = new RewardModule(lib.entityService, lib.actionService, lib.modifierService, lib.eventService, lib.activityService).initialize();
    const boardAreasModule = new BoardAreasModule(lib.entityService, lib.eventService, lib.activityService, boardModule.pathfindingService, boardModule.boardService).initialize();
    const statisticModule = new StatisticModule(dataFeed, lib.entityService, lib.actionService, lib.modifierService, lib.eventService, lib.activityService).initialize();
    const itemsModule = new ItemsModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.activityService, lib.gatheringService).initialize();
    const deckModule = new CardsModule(dataFeed, lib.entityService, lib.actionService, lib.eventService, lib.activityService, lib.mixinFactory).initialize()
    const dungeonModule = new DungeonModule(
      lib.entityService,
      areaModule.areasService,
      lib.activityService
    ).initialize();
    new AdventureModule(
      lib.mixinFactory,
      lib.entityService,
      actorModule.actorSevice,
      questModule.questService,
      areaModule.areasService,
      tradeModule.tradeService,
      dungeonModule.dungeonService
    ).initialize();

    new HeroModule(lib.entityService).initialize();

    lib.entityService.useFactories([
      new EnterDungeonCommand(),
      new BoardTravelCommandFactory(this._sceneService, boardAreasModule.areasService),
      new StartQuestCommandFactory(),
      new FinishQuestCommandFactory(),
      new TradeCommandFactory()
    ])
    
    const g = new AdventureGameplay(lib.entityService, lib.actionService, lib.eventService);
    await g.hydrate(state);
    return g
  }



}
