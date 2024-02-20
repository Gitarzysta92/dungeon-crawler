import { EntityService } from "../../base/entity/entity.service";
import { EventService } from "../../base/event/event.service";
import { ActionService } from "../../cross-cutting/action/action.service";
import { DataGatheringService } from "../../cross-cutting/gatherer/data-gathering-service";
import { ModifierService } from "../../cross-cutting/modifier/modifier.service";
import { SelectorService } from "../../cross-cutting/selector/selector.service";
import { TradableFactory } from "./tradable.factory";
import { TradeService } from "./trade.service"

export class TradeModule {
  constructor(
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _selectorService: SelectorService,
    private readonly _gathererService: DataGatheringService,
    private readonly _modifierService: ModifierService,
    private readonly _eventService: EventService
  ) { }
  
  public initialize() {
    const tradeService = new TradeService();
    this._entityService.useFactories([
      new TradableFactory()
    ])

    return { questService: tradeService }
  }
}