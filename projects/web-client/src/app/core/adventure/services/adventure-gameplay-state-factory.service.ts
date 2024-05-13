import { Injectable } from "@angular/core";
import { GameLogicLibraryFactory } from "@game-logic/lib";
import { MediaModule } from "../../game-ui/media.module";
import { ActorModule } from "@game-logic/lib/modules/actors/actors.module";
import { EffectsModule } from "@game-logic/lib/modules/effects/effects.module";
import { QuestModule } from "@game-logic/lib/modules/quest/quest.module";
import { VendorsModule } from "@game-logic/lib/modules/vendors/vendors.module";
import { DungeonModule } from "@game-logic/gameplay/modules/dungeon/dungeon.module";
import { AreasModule } from "@game-logic/lib/modules/areas/areas.module";
import { ContinuousGameplayModule } from "@game-logic/lib/modules/continuous-gameplay/continuous-gameplay.module";
import { EnterDungeonCommand } from "../commands/enter-dungeon.command";
import { RoutingService } from "src/app/aspects/navigation/api";
import { AdventureModule } from "@game-logic/gameplay/modules/adventure/adventure.module";
import { IAdventureStateDeclaration } from "@game-logic/gameplay/modules/adventure/mixins/adventure-state/adventure-state.interface";
import { IAdventureDataFeed } from "@game-logic/gameplay/modules/adventure/adventure.interface";
import { IAdventureGameplayState } from "../interfaces/adventure-gameplay-state.interface";
import { BoardModule } from "@game-logic/lib/modules/board/board.module";
import { AbilityModule } from "@game-logic/lib/modules/abilities/abilities.module";
import { TurnBasedGameplayModule } from "@game-logic/lib/modules/turn-based-gameplay/turn-based-gameplay.module";
import { RewardModule } from "@game-logic/lib/modules/rewards/rewards.module";

@Injectable()
export class AdventureGameplayStateFactoryService {

  constructor(
    private readonly _routingService: RoutingService
  ) { }

  public async initializeAdventureGameplay(
    state: IAdventureStateDeclaration,
    dataFeed: IAdventureDataFeed,
  ): Promise<IAdventureGameplayState> {
    const lib = GameLogicLibraryFactory.create();
    (new MediaModule(lib.entityService)).initialize();
    this._initializeCommands(lib);

    const continousGameplay = new ContinuousGameplayModule().initialize()
    const turnBasedGameplay = new TurnBasedGameplayModule(lib.eventService).initialize();
    const actorModule = new ActorModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.eventService).initialize();
    const effectModule = new EffectsModule(lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.modifierService, lib.eventService).initialize();
    const questModule = new QuestModule(dataFeed, lib.entityService, lib.eventService, lib.conditionsService, lib.activityService).initialize();
    const tradeModule = new VendorsModule(lib.entityService, lib.activityService).initialize();
    const areaModule = new AreasModule(lib.entityService, lib.actionService, lib.eventService, lib.activityService).initialize();
    const boardModule = new BoardModule(lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.eventService).initialize();
    const abilityModule = new AbilityModule(dataFeed, lib.entityService, lib.actionService, lib.modifierService, lib.selectorService).initialize();
    const rewardsModule = new RewardModule(lib.entityService, lib.actionService, lib.modifierService, lib.eventService, lib.activityService).initialize();
    const dungeonModule = new DungeonModule(lib.entityService, areaModule.areasService, turnBasedGameplay.turnBasedService, actorModule.actorSevice, boardModule.boardService, effectModule.effectService, questModule.questService, abilityModule.abilitiesService, tradeModule.tradeService, rewardsModule.rewardsService).initialize();
    new AdventureModule(lib.mixinFactory, lib.entityService, continousGameplay.continuousService, actorModule.actorSevice, questModule.questService, areaModule.areasService, tradeModule.tradeService, effectModule.effectService, dungeonModule.dungeonService).initialize();

    lib.entityService.hydrate(state);
    return await lib.mixinFactory.create(state) as IAdventureGameplayState;
  }

  private _initializeCommands(lib: ReturnType<typeof GameLogicLibraryFactory.create>) {
    lib.entityService.useFactories([
      new EnterDungeonCommand(this._routingService),
    ])
  }

}
