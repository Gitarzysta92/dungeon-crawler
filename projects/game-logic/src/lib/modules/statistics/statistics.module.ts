import { EntityService } from "../../base/entity/entity.service";
import { EventService } from "../../cross-cutting/event/event.service";
import { ActionService } from "../../cross-cutting/action/action.service";
import { ModifierService } from "../../cross-cutting/modifier/modifier.service";
import { ModifyStatisticByFormulaActionHandler } from "./aspects/actions/modify-statistic-by-formula.action";
import { ModifyStatisticActionHandler } from "./aspects/actions/modify-statistic.action";
import { StatisticModifierHandler } from "./aspects/modifiers/statistic.modifier";
import { StatisticBearerFactory } from "./entities/bearer/statistic-bearer.factory";
import { FormulaService } from "./formula/formula.service";
import { IStatisticDataFeed } from "./statistics.interface";
import { StatisticsService } from "./statistics.service";
import { StatisticFactory } from "./entities/statistic/statistic.factory";
import { ActivityService } from "../../base/activity/activity.service";
import { ImproveStatisticActivityFactory } from "./activities/improve-statistic.activity";

export class StatisticModule {
  constructor(
    private readonly _dataFeed: IStatisticDataFeed,
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _modifierService: ModifierService,
    private readonly _eventService: EventService,
    private readonly _activityService: ActivityService
  ) { }
  
  public initialize() {
    const statisticService = new StatisticsService();
    const formulaService = new FormulaService(this._dataFeed);

    this._entityService.useFactories([
      new StatisticBearerFactory(),
      new StatisticFactory(this._modifierService, this._eventService)
    ])

    this._activityService.useFactories([
      new ImproveStatisticActivityFactory(statisticService)
    ])


    this._actionService.register(new ModifyStatisticActionHandler());
    this._actionService.register(new ModifyStatisticByFormulaActionHandler(formulaService));
    this._modifierService.register(new StatisticModifierHandler())

    return {
      statisticService,
      formulaService
    }
  }
}