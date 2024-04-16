import { EntityService } from "../../base/entity/entity.service";
import { EventService } from "../../cross-cutting/event/event.service";
import { ActionService } from "../../cross-cutting/action/action.service";
import { DataGatheringService } from "../../cross-cutting/gatherer/data-gathering-service";
import { ModifierService } from "../../cross-cutting/modifier/modifier.service";
import { SelectorService } from "../../cross-cutting/selector/selector.service";
import { ItemSelector } from "./aspects/selectors/item.selector";
import { InventoryBearerFactory } from "./entities/bearer/inventory-bearer.factory";
import { IItemsDataFeed } from "./items.interface";
import { ItemFactory } from "./entities/item/item.factory";
import { InventorySlotFactory } from "./entities/inventory-slot/inventory-slot.factory";
import { InventoryFactory } from "./entities/inventory/inventory.factory";
import { ItemsService } from "./items.service";
import { SpawnItemAction } from "./aspects/actions/spawn-item.action";
import { EquipInteractionHandler } from "./aspects/interactions/equip.interaction";
import { ActivityService } from "../../base/activity/activity.service";

export class ItemsModule {
  constructor(
    private readonly _dataFeed: IItemsDataFeed,
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _selectorService: SelectorService,
    private readonly _gathererService: DataGatheringService,
    private readonly _modifierService: ModifierService,
    private readonly _eventService: EventService,
    private readonly _interactionService: ActivityService
  ) { }
  
  public initialize() {
    const itemsService = new ItemsService(this._entityService, this._dataFeed);

    this._entityService.useFactories([
      new InventoryBearerFactory(),
      new InventoryFactory(),
      new InventorySlotFactory(),
      new ItemFactory(),
    ]);

    this._actionService.register(new SpawnItemAction(itemsService));
    this._selectorService.register(new ItemSelector());
    this._interactionService.register(new EquipInteractionHandler());

    return { }
  }
}