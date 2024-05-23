import { ActivityService } from "../../../lib/base/activity/activity.service";
import { EntityService } from "../../base/entity/entity.service";
import { TradeActivityFactory } from "./activities/trade.activity";
import { CustomerFactory } from "./entities/customer/customer.factory";
import { TradableFactory } from "./entities/tradable/tradable.factory";
import { VendorFactory } from "./entities/vendor/vendor.factory";
import { TradeService } from "./vendors.service";

export class VendorsModule {
  constructor(
    private readonly _entityService: EntityService,
    private readonly _activityService: ActivityService
  ) { }
  
  public initialize() {
    const tradeService = new TradeService();
    this._entityService.useFactories([
      new TradableFactory(),
      new VendorFactory(),
      new CustomerFactory()
    ]);
    this._activityService.useFactories([new TradeActivityFactory()])

    return { tradeService }
  }
}