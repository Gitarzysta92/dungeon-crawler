import { EntityService } from "../../../lib/base/entity/entity.service";
import { ActivityService } from "../../../lib/base/activity/activity.service";
import { IAdventureDataFeed } from "./adventure.interface";

export class AdventureModule {
  constructor(
    private readonly _adventureDataFeed: IAdventureDataFeed,
    private readonly _entityService: EntityService,
    private readonly _interactionService: ActivityService,
  ) { }
  
  public initialize() {
    //this._entityService.useFactories([new DungeonAreaFactory(this._areaService, this._entityService, this._adventureDataFeed)]);
    //this._interactionService.register(new TradeInteractionHandler())

    return {};
  }
}