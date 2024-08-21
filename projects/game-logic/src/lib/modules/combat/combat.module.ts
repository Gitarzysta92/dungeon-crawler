import { ActivityService } from "../../base/activity/activity.service";
import { EntityService } from "../../base/entity/entity.service";
import { ActionService } from "../../cross-cutting/action/action.service";
import { EventService } from "../../cross-cutting/event/event.service";
import { ModifierService } from "../../cross-cutting/modifier/modifier.service";

export class StatisticModule {
  constructor(
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _modifierService: ModifierService,
    private readonly _eventService: EventService,
    private readonly _activityService: ActivityService
  ) { }
  
  public initialize() {
    // const statisticService = new StatisticsService();
    // const formulaService = new FormulaService(this._dataFeed);

    // this._entityService.useFactories([
    //   new StatisticBearerFactory(),
    //   new StatisticFactory(this._modifierService, this._eventService)
    // ])

    // this._activityService.useFactories([
    //   new ImproveStatisticActivityFactory(statisticService)
    // ])


    // this._actionService.register(new ModifyStatisticActionHandler());
    // this._actionService.register(new ModifyStatisticByFormulaActionHandler(formulaService));
    // this._modifierService.register(new StatisticModifierHandler())

    // return {
    //   statisticService,
    //   formulaService
    // }
  }
}