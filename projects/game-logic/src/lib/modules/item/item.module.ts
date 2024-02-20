import { EntityService } from "../../base/entity/entity.service";
import { EventService } from "../../base/event/event.service";
import { ActionService } from "../../cross-cutting/action/action.service";
import { DataGatheringService } from "../../cross-cutting/gatherer/data-gathering-service";
import { ModifierService } from "../../cross-cutting/modifier/modifier.service";
import { SelectorService } from "../../cross-cutting/selector/selector.service";
import { ItemSelector } from "./aspects/selectors/item.selector";
import { InventoryBearerFactory } from "./bearer/inventory-bearer.factory";
import { ItemFactory } from "./item.factory";
import { IItemDataFeed } from "./item.interface";

export class StatisticModule {
  constructor(
    private readonly _dataFeed: IItemDataFeed,
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _selectorService: SelectorService,
    private readonly _gathererService: DataGatheringService,
    private readonly _modifierService: ModifierService,
    private readonly _eventService: EventService
  ) { }
  
  public initialize() {

    this._entityService.useFactories([
      new ItemFactory(this._dataFeed),
      new InventoryBearerFactory()
    ])


    this._selectorService.register(new ItemSelector());

    return { }
  }
}