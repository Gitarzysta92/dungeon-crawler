import { ActivityService } from "../../base/activity/activity.service";
import { EntityService } from "../../base/entity/entity.service";
import { ActionService } from "../../cross-cutting/action/action.service";
import { ConditionService } from "../../cross-cutting/condition/condition.service";
import { EventService } from "../../cross-cutting/event/event.service";
import { ModifierService } from "../../cross-cutting/modifier/modifier.service";
import { MixinService } from "../../infrastructure/mixin/mixin.service";
import { DealDamageActionHandler } from "../combat/aspects/actions/deal-damage.action";
import { ImproveStatisticActivityFactory } from "./activities/improve-statistic.activity";
import { ModifyStatisticByFormulaActionHandler } from "./aspects/actions/modify-statistic-by-formula.action";
import { ModifyStatisticActionHandler } from "./aspects/actions/modify-statistic.action";
import { StatisticHasValueConditionHandler } from "./aspects/conditions/statistic-has-value.condition";
import { StatisticModifierFactory } from "./aspects/modifiers/statistic-modifier.mixin";
import { StatisticBearerFactory } from "./entities/bearer/statistic-bearer.factory";
import { StatisticFactory } from "./entities/statistic/statistic.factory";
import { FormulaService } from "./formula/formula.service";
import { IStatisticDataFeed } from "./statistics.interface";
import { StatisticsService } from "./statistics.service";

export class StatisticModule {
  constructor(
    private readonly _dataFeed: IStatisticDataFeed,
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _modifierService: ModifierService,
    private readonly _eventService: EventService,
    private readonly _activityService: ActivityService,
    private readonly _mixinService: MixinService,
    private readonly _conditionService: ConditionService
  ) { }
  
  public initialize() {
    const statisticService = new StatisticsService();
    const formulaService = new FormulaService(this._dataFeed);

    this._mixinService.useFactories([
      new StatisticModifierFactory()
    ])

    this._entityService.useFactories([
      new StatisticBearerFactory(),
      new StatisticFactory()
    ]);

    this._activityService.useFactories([
      new ImproveStatisticActivityFactory(statisticService)
    ]);

    this._actionService.register(new ModifyStatisticActionHandler());
    this._actionService.register(new ModifyStatisticByFormulaActionHandler(formulaService));
    this._actionService.register(new DealDamageActionHandler(this._eventService));

    this._conditionService.register(new StatisticHasValueConditionHandler())

    return {
      statisticService,
      formulaService
    }
  }
}