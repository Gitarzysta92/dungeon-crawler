
import { ActionService } from "../../cross-cutting/action/action.service";
import { SelectorService } from "../../cross-cutting/selector/selector.service";
import { ItemSelector } from "./aspects/selectors/item.selector";
import { InventoryBearerFactory } from "./entities/bearer/inventory-bearer.factory";
import { IItemsDataFeed } from "./items.interface";
import { ItemFactory } from "./entities/item/item.factory";
import { InventorySlotFactory } from "./mixins/inventory-slot/inventory-slot.factory";
import { ItemsService } from "./items.service";
import { SpawnItemAction } from "./aspects/actions/spawn-item.action";
import { ActivityService } from "../../base/activity/activity.service";
import { MoveItemActivityFactory } from "./activities/move-item/move-item.activity";
import { UseItemActivityFactory } from "./activities/use-item/use-item.activity";
import { EquipItemActivityFactory } from "./activities/equip-item/equip-item.activity";
import { EntityService } from "../../base/entity/entity.service";
import { DataGatheringService } from "../../cross-cutting/gatherer/data-gathering.service";
import { ItemDataProvider } from "./aspects/providers/item.data-provider";

export class ItemsModule {
  constructor(
    private readonly _dataFeed: IItemsDataFeed,
    private readonly _entityService: EntityService,
    private readonly _actionService: ActionService,
    private readonly _selectorService: SelectorService,
    private readonly _activityService: ActivityService,
    private readonly _gathererService: DataGatheringService
  ) { }
  
  public initialize() {
    const itemsService = new ItemsService(this._entityService, this._dataFeed);

    this._entityService.useFactories([
      new InventoryBearerFactory(itemsService),
      new InventorySlotFactory(),
      new ItemFactory(itemsService),
    ]);

    this._activityService.useFactories([
      new MoveItemActivityFactory(),
      new UseItemActivityFactory(),
      new EquipItemActivityFactory()
    ]);

    this._actionService.register(new SpawnItemAction(itemsService));
    this._selectorService.register(new ItemSelector());
    this._gathererService.registerProvider(new ItemDataProvider(itemsService, this._selectorService))

    return { }
  }
}