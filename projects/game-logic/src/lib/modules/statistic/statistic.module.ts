import { EntityService } from "../../base/entity/entity.service";
import { EventService } from "../../base/event/event.service";
import { ActionService } from "../../cross-cutting/action/action.service";
import { DataGatheringService } from "../../cross-cutting/gatherer/data-gathering-service";
import { ModifierService } from "../../cross-cutting/modifier/modifier.service";
import { SelectorService } from "../../cross-cutting/selector/selector.service";
import { ModifyStatisticByFormulaActionHandler } from "./aspects/actions/modify-statistic-by-formula.action";
import { ModifyStatisticActionHandler } from "./aspects/actions/modify-statistic.action";
import { StatisticModifierHandler } from "./aspects/modifiers/statistic.modifier";
import { StatisticBearer } from "./bearer/statistic-bearer";
import { StatisticsService } from "./statistic.service";

export class StatisticModule {
  constructor(
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _selectorService: SelectorService,
    private readonly _gathererService: DataGatheringService,
    private readonly _modifierService: ModifierService,
    private readonly _eventService: EventService
  ) { }
  
  public initialize() {
    const statisticService = new StatisticsService();

    this._entityService.useFactories([
      new StatisticBearer(this._modifierService),
    ])


    this._actionService.register(new ModifyStatisticActionHandler());
    this._actionService.register(new ModifyStatisticByFormulaActionHandler);

    this._modifierService.register(new StatisticModifierHandler())


    return { statisticService }
  }
}