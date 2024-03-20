import { EntityService } from "../../../lib/base/entity/entity.service";
import { InteractionsService } from "../../../lib/cross-cutting/interaction/interaction.service";
import { IAdventureGameplayDataFeed } from "./adventure.interface";

export class AdventureModule {
  constructor(
    private readonly _adventureDataFeed: IAdventureGameplayDataFeed,
    private readonly _entityService: EntityService,
    private readonly _interactionService: InteractionsService,
  ) { }
  
  public initialize() {
    //this._entityService.useFactories([new DungeonAreaFactory(this._areaService, this._entityService, this._adventureDataFeed)]);
    //this._interactionService.register(new TradeInteractionHandler())

    return {};
  }
}