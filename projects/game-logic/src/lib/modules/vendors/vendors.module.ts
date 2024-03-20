import { EntityService } from "../../base/entity/entity.service";
import { InteractionsService } from "../../cross-cutting/interaction/interaction.service";
import { TradeInteractionHandler } from "./aspects/interactions/trade.interaction";
import { TradableFactory } from "./entities/tradable/tradable.factory";
import { TradeService } from "./vendors.service"

export class VendorsModule {
  constructor(
    private readonly _entityService: EntityService,
    private readonly _interactionService: InteractionsService
  ) { }
  
  public initialize() {
    const tradeService = new TradeService();
    this._entityService.useFactories([new TradableFactory()]);
    this._interactionService.register(new TradeInteractionHandler())

    return { tradeService }
  }
}