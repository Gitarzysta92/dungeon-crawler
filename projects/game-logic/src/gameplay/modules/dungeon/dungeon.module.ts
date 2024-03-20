import { EntityService } from "../../../lib/base/entity/entity.service";
import { InteractionsService } from "../../../lib/cross-cutting/interaction/interaction.service";
import { AreaService } from "../../../lib/modules/areas/areas.service";
import { IDungeonDataFeed } from "./dungeon.interface";
import { DungeonAreaFactory } from "./entities/dungeon-area/dungeon-area";

export class DungeonModule {
  constructor(
    private readonly _dungeonGameplayDataFeed: IDungeonDataFeed,
    private readonly _entityService: EntityService,
    private readonly _interactionService: InteractionsService,
    private readonly _areaService: AreaService
  ) { }
  
  public initialize() {
    this._entityService.useFactories([new DungeonAreaFactory(this._areaService, this._entityService, this._dungeonGameplayDataFeed)]);
    //this._interactionService.register(new TradeInteractionHandler())

    return {};
  }
}