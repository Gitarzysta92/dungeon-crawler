import { EntityService } from "../../base/entity/entity.service";
import { EventService } from "../../cross-cutting/event/event.service";
import { ActionService } from "../../cross-cutting/action/action.service";
import { DataGatheringService } from "../../cross-cutting/gatherer/data-gathering-service";
import { ModifierService } from "../../cross-cutting/modifier/modifier.service";
import { SelectorService } from "../../cross-cutting/selector/selector.service";
import { ModifyStatisticByFormulaActionHandler } from "./aspects/actions/modify-statistic-by-formula.action";
import { ModifyStatisticActionHandler } from "./aspects/actions/modify-statistic.action";
import { StatisticModifierHandler } from "./aspects/modifiers/statistic.modifier";
import { StatisticBearerFactory } from "./entities/bearer/statistic-bearer.factory";
import { FormulaService } from "./formula/formula.service";
import { IStatisticDataFeed } from "./statistics.interface";
import { StatisticsService } from "./statistics.service";
import { StatisticFactory } from "./entities/statistic/statistic.factory";
import { InteractionsService } from "../../cross-cutting/interaction/interaction.service";
import { ImproveStatisticInteractionHandler } from "./aspects/interactions/improve-statistic.interaction";

export class StatisticModule {
  constructor(
    private readonly _dataFeed: IStatisticDataFeed,
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _selectorService: SelectorService,
    private readonly _gathererService: DataGatheringService,
    private readonly _modifierService: ModifierService,
    private readonly _eventService: EventService,
    private readonly _interactionService: InteractionsService
  ) { }
  
  public initialize() {
    const statisticService = new StatisticsService();
    const formulaService = new FormulaService(this._dataFeed);

    this._entityService.useFactories([
      new StatisticBearerFactory(),
      new StatisticFactory(this._modifierService, this._eventService)
    ])


    this._actionService.register(new ModifyStatisticActionHandler());
    this._actionService.register(new ModifyStatisticByFormulaActionHandler(formulaService));
    this._modifierService.register(new StatisticModifierHandler())
    this._interactionService.register(new ImproveStatisticInteractionHandler());

    return {
      statisticService,
      formulaService
    }
  }
}