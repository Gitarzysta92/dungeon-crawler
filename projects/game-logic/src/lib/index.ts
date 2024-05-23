import { ActivitySubjectFactory } from "./base/activity/activity-subject.factory";
import { ActivityService } from "./base/activity/activity.service";
import { EntityFactory } from "./base/entity/entity.factory";
import { EntityService } from "./base/entity/entity.service";

import { ActionService } from "./cross-cutting/action/action.service";
import { ConditionService } from "./cross-cutting/condition/condition.service";
import { EventService } from "./cross-cutting/event/event.service";
import { DataGatheringService } from "./cross-cutting/gatherer/data-gathering-service";
import { ModifierService } from "./cross-cutting/modifier/modifier.service";
import { SelectorService } from "./cross-cutting/selector/selector.service";
import { MixinService } from "./infrastructure/mixin/mixin.service";


export class GameLogicLibraryFactory {
  public static create() {
    const mixinFactory = new MixinService();
    const entityService = new EntityService(mixinFactory);
    const activityService = new ActivityService(mixinFactory);
    const eventService = new EventService();
    const modifierService = new ModifierService(entityService);
    const actionService = new ActionService();
    const selectorService = new SelectorService(entityService);
    const gatheringService = new DataGatheringService();
    const conditionsService = new ConditionService();


    mixinFactory.useFactories([
      new EntityFactory(),
      new ActivitySubjectFactory()
    ])

    return {
      eventService,
      entityService,
      modifierService,
      actionService,
      selectorService,
      gatheringService,
      activityService,
      conditionsService,
      mixinFactory
    }
  }
}