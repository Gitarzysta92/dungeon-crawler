import { ActivityResourceFactory } from "./base/activity/activity-resource.factory";
import { ActivitySubjectFactory } from "./base/activity/activity-subject.factory";
import { ActivityService } from "./base/activity/activity.service";
import { EntityFactory } from "./base/entity/entity.mixin";
import { EntityService } from "./base/entity/entity.service";
import { PawnFactory } from "./base/pawn/pawn.mixin";
import { PlayerMixin } from "./base/player/player.mixin";
import { ProcedureFactory } from "./base/procedure/procedure.factory";
import { ProcedureService } from "./base/procedure/procedure.service";
import { MakeActionProcedureStepFactory } from "./cross-cutting/action/action-procedure-step.factory";
import { ActionService } from "./cross-cutting/action/action.service";
import { ConditionService } from "./cross-cutting/condition/condition.service";
import { EventService } from "./cross-cutting/event/event.service";
import { DataGatheringService } from "./cross-cutting/gatherer/data-gathering.service";
import { GatheringDataProcedureStepFactory } from "./cross-cutting/gatherer/gathering-data-procedure-step.factory";
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
    const procedureService = new ProcedureService();

    procedureService.registerStepFactory(new GatheringDataProcedureStepFactory(gatheringService));
    procedureService.registerStepFactory(new MakeActionProcedureStepFactory(actionService))

    mixinFactory.useFactories([
      new EntityFactory(),
      new ActivitySubjectFactory(),
      new ActivityResourceFactory(),
      new ProcedureFactory(procedureService),
      new PlayerMixin(),
      new PawnFactory()
    ]);

    return {
      eventService,
      entityService,
      modifierService,
      actionService,
      selectorService,
      gatheringService,
      activityService,
      conditionsService,
      mixinFactory,
      procedureService
    }
  }
}