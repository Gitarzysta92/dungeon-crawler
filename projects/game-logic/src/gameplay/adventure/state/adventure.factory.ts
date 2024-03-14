import { EntityFactory } from "../../../lib/base/entity/entity.factory";
import { EntityService } from "../../../lib/base/entity/entity.service";
import { ActionService } from "../../../lib/cross-cutting/action/action.service";
import { EventService } from "../../../lib/cross-cutting/event/event.service";
import { DataGatheringService } from "../../../lib/cross-cutting/gatherer/data-gathering-service";
import { InteractionsService } from "../../../lib/cross-cutting/interaction/interaction.service";
import { ModifierService } from "../../../lib/cross-cutting/modifier/modifier.service";
import { SelectorService } from "../../../lib/cross-cutting/selector/selector.service";
import { ActorModule } from "../../../lib/modules/actors/actors.module";
import { AreaModule } from "../../../lib/modules/areas/areas.module";
import { ContinuousGameplayModule } from "../../../lib/modules/continuous-gameplay/continuous-gameplay.module";
import { EffectsModule } from "../../../lib/modules/effects/effects.module";
import { QuestModule } from "../../../lib/modules/quest/quest.module";
import { TradeModule } from "../../../lib/modules/vendors/trade.module";
import { AdventureGameplay } from "./adventure-gameplay";


export class AdventureGameplayFactory {

  constructor() { }
  
  static create(dataFeed: any, dataGatherer: any): AdventureGameplay {
    const entityFactory = new EntityFactory()
    const entityService = new EntityService(entityFactory);

    const eventService = new EventService();
    const modifierService = new ModifierService(entityService);
    const actionService = new ActionService();
    const selectorService = new SelectorService(entityService);
    const gatheringService = new DataGatheringService();
    const interactionService = new InteractionsService();

    const cgModule = new ContinuousGameplayModule().initialize();
    const actorModule = new ActorModule(dataFeed, entityService, actionService, selectorService, gatheringService).initialize();
    const questModule = new QuestModule(entityService, actionService, selectorService, gatheringService, modifierService, eventService).initialize();
    const areaModule = new AreaModule(dataFeed, entityService, actionService, modifierService, selectorService).initialize();
    const tradingModule = new TradeModule(dataGatherer, entityService, actionService, selectorService, modifierService, eventService).initialize();
    const effectsModule = new EffectsModule(dataGatherer, gatheringService, entityService, actionService, selectorService, modifierService, eventService).initialize();
  
    return new AdventureGameplay(
      interactionService,
      cgModule.continuousService,
      actorModule.actorSevice,
      questModule.questService,
      areaModule.areasService,
      tradingModule.questService,
      effectsModule.effectService
    )
  }
}
