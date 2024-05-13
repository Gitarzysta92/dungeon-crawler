// import { GameLogicLibraryFactory } from "../lib";
// import { ActorModule } from "../lib/modules/actors/actors.module";
// import { AreasModule } from "../lib/modules/areas/areas.module";
// import { ContinuousGameplayModule } from "../lib/modules/continuous-gameplay/continuous-gameplay.module";
// import { EffectsModule } from "../lib/modules/effects/effects.module";
// import { QuestModule } from "../lib/modules/quest/quest.module";
// import { VendorsModule } from "../lib/modules/vendors/vendors.module";
// import { DungeonModule } from "../gameplay/modules/dungeon/dungeon.module";
// import { AdventureGameplayLogicState } from "../gameplay/modules/adventure/mixins/adventure-state/adventure-state.factory";
// import { IAdventureGameplayDataGatherer, IAdventureGameplayStateDto } from "../gameplay/modules/adventure/mixins/adventure-state/adventure-state.interface";
// import { IAdventureGameplayFeed } from "../gameplay/modules/adventure/adventure.interface";


// export class AdventureGameplayFactory {
  
//   static async create(
//     stateDto: IAdventureGameplayStateDto,
//     dataFeed: IAdventureGameplayFeed,
//     lib: ReturnType<typeof GameLogicLibraryFactory.create>
//   ): Promise<AdventureGameplayLogicState> {
    

//     const cgModule = new ContinuousGameplayModule().initialize();
//     const actorModule = new ActorModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.eventService).initialize();
//     const questModule = new QuestModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.modifierService, lib.eventService, lib.conditionsService).initialize();
//     const areaModule = new AreasModule(dataFeed, lib.entityService, lib.actionService, lib.modifierService, lib.selectorService, lib.eventService, lib.interactionService).initialize();
//     const vendorsModule = new VendorsModule(lib.entityService, lib.interactionService).initialize();
//     const effectModule = new EffectsModule(lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.modifierService, lib.eventService).initialize();
//     new DungeonModule(dataFeed, lib.entityService, lib.interactionService, areaModule.areasService);

//     lib.entityService.hydrate(stateDto);
  
//     return new AdventureGameplayLogicState(
//       lib.entityService,
//       cgModule.continuousService,
//       actorModule.actorSevice,
//       questModule.questService,
//       areaModule.areasService,
//       vendorsModule.tradeService,
//       effectModule.effectService
//     )
//   }

// }
