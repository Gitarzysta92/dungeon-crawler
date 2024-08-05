import { Injectable } from "@angular/core";
import { GameLogicLibraryFactory } from "@game-logic/lib";
import { UiModule } from "../../game-ui/media.module";
import { ActorModule } from "@game-logic/lib/modules/actors/actors.module";
import { PickerStep, GameBuilderState, FormStep } from "../state/game-builder.state";
import { DataFeedService } from "../../game-data/services/data-feed.service";
import { AbilityModule } from "@game-logic/lib/modules/abilities/abilities.module";
import { PerksModule } from "@game-logic/lib/modules/perks/perks.module";
import { ItemsModule } from "@game-logic/lib/modules/items/items.module";
import { StatisticModule } from "@game-logic/lib/modules/statistics/statistics.module";
import { IBuilderInitialData } from "../interfaces/state-initial-data.interface";
import { CLASS_STEP_NAME, ORIGIN_STEP_NAME, RACE_STEP_NAME } from "@game-logic/gameplay/modules/heroes/heroes.constants";
import { IDENTITY_STEP_NAME } from "../constants/game-builder.constants";
import { BoardAreasModule } from "@game-logic/gameplay/modules/board-areas/board-areas.module";
import { HeroModule } from "@game-logic/gameplay/modules/heroes/heroes.module";
import { BoardModule } from "@game-logic/lib/modules/board/board.module";
import { SceneModule } from "../../scene/scene.module";
import { QuestModule } from "@game-logic/lib/modules/quest/quest.module";
import { VendorsModule } from "@game-logic/lib/modules/vendors/vendors.module";
import { ProgressionModule } from "@game-logic/lib/modules/progression/progression.module";
import { ContinuousGameplayModule } from "@game-logic/lib/modules/continuous-gameplay/continuous-gameplay.module";
import { TurnBasedGameplayModule } from "@game-logic/lib/modules/turn-based-gameplay/turn-based-gameplay.module";
import { AreasModule } from "@game-logic/lib/modules/areas/areas.module";
import { RewardModule } from "@game-logic/lib/modules/rewards/rewards.module";
import { DungeonModule } from "@game-logic/gameplay/modules/dungeon/dungeon.module";
import { AdventureModule } from "@game-logic/gameplay/modules/adventure/adventure.module";
import { CardsModule } from "@game-logic/lib/modules/cards/cards.module";

@Injectable()
export class GameBuilderStateService {

  constructor( ) { }

  public async initializeState(
    initialData: IBuilderInitialData,
    dataFeed: DataFeedService,
  ) {
    const lib = GameLogicLibraryFactory.create();

    new UiModule(lib.entityService).initialize();
    new SceneModule(lib.entityService, {} as any).initialize()

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
    const progressionModule = new ProgressionModule(lib.entityService, lib.actionService, lib.eventService).initialize();
    const perksModule = new PerksModule(lib.entityService, lib.actionService, lib.activityService, lib.conditionsService).initialize();
    const heroModule = new HeroModule(lib.entityService).initialize();
    const deckModule = new CardsModule(dataFeed, lib.entityService, lib.actionService, lib.eventService, lib.activityService, lib.mixinFactory).initialize();
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
    
    const raceStep = new PickerStep({
      stepId: 0,
      narrative: { name: "game-builder.step-names.race", description: "game-builder.step-description.race" },
      items: initialData.races.map((r, i) => Object.assign(r, { isSelected: false, isDefault: i === 0 })),
      isMixin: true,
      isNarrationMedium: true,
      stepName: RACE_STEP_NAME,
    });
  
    const classStep = new PickerStep({
      stepId: 1,
      narrative: { name: "game-builder.step-names.class", description: "game-builder.step-description.class" },
      items: initialData.classes.map((r, i) => Object.assign(r, { isSelected: false, isDefault: i === 0 })),
      isMixin: true,
      isNarrationMedium: true,
      stepName: CLASS_STEP_NAME,
    })

    const originStep = new PickerStep({
      stepId: 2,
      narrative: { name: "game-builder.step-names.origin", description: "game-builder.step-description.origin" },
      items: initialData.origins.map((r, i) => Object.assign(r, { isSelected: false, isDefault: i === 0 })),
      isMixin: true,
      isNarrationMedium: true,
      stepName: ORIGIN_STEP_NAME,
    })
    
    const identityStep = new FormStep({
      stepId: 3,
      data: {
        name: null,
        avatarUrl: "hero/avatar.png"
      },
      selectionPropertyName: 'name',
      narrative: { name: "game-builder.step-names.identity", description: "game-builder.step-description.identity" },
      isMixin: true,
      isNarrationMedium: true,
      stepName: IDENTITY_STEP_NAME,
    })

    return new GameBuilderState(
      await lib.mixinFactory.create(initialData.hero),
      [raceStep, classStep, originStep, identityStep],
      initialData.adventureMap, lib.entityService)
  }

}
