import { initializeLib } from "../../../lib";
import { ActorModule } from "../../../lib/modules/actors/actors.module";
import { AreaModule } from "../../../lib/modules/areas/areas.module";
import { ContinuousGameplayModule } from "../../../lib/modules/continuous-gameplay/continuous-gameplay.module";
import { EffectsModule } from "../../../lib/modules/effects/effects.module";
import { QuestModule } from "../../../lib/modules/quest/quest.module";
import { VendorsModule } from "../../../lib/modules/vendors/vendors.module";
import { DungeonModule } from "../../modules/dungeon/dungeon.module";
import { AdventureGameplay } from "./adventure-gameplay";
import { IAdventureGameplayFeed, IAdventureGameplayDataGatherer } from "./adventure-gameplay.interface";


export class AdventureGameplayFactory {
  
  static async create(
    dataFeed: IAdventureGameplayFeed,
    dataGatherer: IAdventureGameplayDataGatherer,
  ): Promise<AdventureGameplay> {
    
    const lib = initializeLib();

    const cgModule = new ContinuousGameplayModule().initialize();
    const actorModule = new ActorModule(dataFeed, dataGatherer, lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.eventService).initialize();
    const questModule = new QuestModule(dataFeed, lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.modifierService, lib.eventService, lib.conditionsService).initialize();
    const areaModule = new AreaModule(dataFeed, lib.entityService, lib.actionService, lib.modifierService, lib.selectorService, lib.eventService, lib.interactionService).initialize();
    const vendorsModule = new VendorsModule(lib.entityService, lib.interactionService).initialize();
    const effectModule = new EffectsModule(dataGatherer, lib.entityService, lib.actionService, lib.selectorService, lib.gatheringService, lib.modifierService, lib.eventService).initialize();
    new DungeonModule(dataFeed, lib.entityService, lib.interactionService, areaModule.areasService);
  
    return new AdventureGameplay(
      lib.entityService,
      cgModule.continuousService,
      actorModule.actorSevice,
      questModule.questService,
      areaModule.areasService,
      vendorsModule.tradeService,
      effectModule.effectService
    )
  }
}
