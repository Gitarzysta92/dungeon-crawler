import { Injectable } from "@angular/core";
import { GameLogicLibraryFactory } from "@game-logic/lib";
import { PlayCardCommand } from "../commands/play-card.command";
import { UiModule } from "../../game-ui/media.module";
import { AbilityModule } from "@game-logic/lib/modules/abilities/abilities.module";
import { ActorModule } from "@game-logic/lib/modules/actors/actors.module";
import { BoardModule } from "@game-logic/lib/modules/board/board.module";
import { QuestModule } from "@game-logic/lib/modules/quest/quest.module";
import { RewardModule } from "@game-logic/lib/modules/rewards/rewards.module";
import { TurnBasedGameplayModule } from "@game-logic/lib/modules/turn-based-gameplay/turn-based-gameplay.module";
import { VendorsModule } from "@game-logic/lib/modules/vendors/vendors.module";
import { IDungeonGameplayFeed } from "@game-logic/gameplay/modules/dungeon/dungeon.interface";
import { RoutingService } from "src/app/aspects/navigation/api";
import { ModalService } from "../../game-ui/services/modal.service";
import { SceneModule } from "../../scene/scene.module";
import { SceneService } from "../../scene/services/scene.service";
import { AreasModule } from "@game-logic/lib/modules/areas/areas.module";
import { ItemsModule } from "@game-logic/lib/modules/items/items.module";
import { StatisticModule } from "@game-logic/lib/modules/statistics/statistics.module";
import { DungeonModule } from "@game-logic/gameplay/modules/dungeon/dungeon.module";
import { HeroModule } from "@game-logic/gameplay/modules/heroes/heroes.module";
import { DungeonGameplay } from "./dungeon.gameplay";
import { IDungeonGameplayState } from "./dungeon-gameplay.interface";
import { CardsModule } from "@game-logic/lib/modules/cards/cards.module";
import { TrashCardCommand } from "../commands/trash-card.command";
import { UseAbilityCommand } from "../commands/use-ability.command";
import { DungeonHumanPlayerMixin } from "../mixins/dungeon-human-player/dungeon-human-player.mixin";
import { DungeonComputerPlayerMixin } from "../mixins/dungeon-computer-player/dungeon-computer-player.mixin";
import { FinishTurnCommand } from "../commands/finish-turn.command";
import { StartTurnCommand } from "../commands/start-turn.command";
import { DraggableCardMixin } from "../mixins/draggable-card/draggable-card.mixin";


@Injectable()
export class DungeonGameplayFactory {

  constructor(
    private readonly _routingService: RoutingService,
    private readonly _sceneService: SceneService,
    private readonly _modalService: ModalService
  ) { }


  public async initializeDungeonGameplay(s: IDungeonGameplayState, dataFeed: IDungeonGameplayFeed): Promise<DungeonGameplay> {
    const lib = GameLogicLibraryFactory.create();
    new UiModule(lib.entityService).initialize();
    new SceneModule(lib.entityService, this._sceneService).initialize();

    const turnBasedGameplayModule = new TurnBasedGameplayModule(lib.entityService, lib.eventService, lib.actionService, lib.mixinFactory, lib.activityService).initialize();
    const actorModule = new ActorModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.eventService, lib.gatheringService).initialize();
    const questModule = new QuestModule(dataFeed, lib.entityService, lib.eventService, lib.conditionsService, lib.activityService).initialize();
    const tradeModule = new VendorsModule(lib.entityService, lib.activityService).initialize();
    const areaModule = new AreasModule(lib.entityService, lib.actionService, lib.eventService, lib.activityService).initialize();
    const boardModule = new BoardModule(lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.eventService).initialize();
    const abilityModule = new AbilityModule(dataFeed, lib.entityService, lib.actionService, lib.modifierService, lib.activityService).initialize();
    const rewardsModule = new RewardModule(lib.entityService, lib.actionService, lib.modifierService, lib.eventService, lib.activityService).initialize();
    const statisticModule = new StatisticModule(dataFeed, lib.entityService, lib.actionService, lib.modifierService, lib.eventService, lib.activityService).initialize();
    const itemsModule = new ItemsModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.activityService).initialize();
    const deckModule = new CardsModule(dataFeed, lib.entityService, lib.actionService, lib.eventService, lib.activityService, lib.mixinFactory).initialize();
    new HeroModule(lib.entityService).initialize();
    const dungeonModule = new DungeonModule(
      lib.entityService,
      areaModule.areasService,
      lib.activityService
    ).initialize();

    lib.entityService.useFactories([
      new PlayCardCommand(),
      new TrashCardCommand(),
      new UseAbilityCommand(),
      new FinishTurnCommand(),
      new StartTurnCommand(),
      new DungeonComputerPlayerMixin(),
      new DungeonHumanPlayerMixin(),
      new DraggableCardMixin()
    ])


    const g = new DungeonGameplay(boardModule.boardService, lib.entityService, lib.eventService, lib.mixinFactory, lib.actionService);
    await g.hydrate(s);
    return g;
  }



}
