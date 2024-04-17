import { v4 } from "uuid";
import { EntityService } from "../../base/entity/entity.service";
import { IInventoryBearer } from "./entities/bearer/inventory-bearer.interface";
import { IItemsDataFeed } from "./items.interface";
import { IItem, IPossesedItem } from "./entities/item/item.interface";
import { IInventorySlot } from "./entities/inventory-slot/inventory-slot.interface";

export class ItemsService {
  
  constructor(
    private readonly _entityService: EntityService,
    private readonly _dataFeed: IItemsDataFeed
  ) { }

  public async addItem(bearer: IInventoryBearer, id: string, amount: number) {
    let item: IItem = bearer.inventory.getItem(id);
    if (item) {
      return bearer.inventory.addItem(item, amount);
    }

    item = await this._dataFeed.getItem(id) as IItem;
    if (!item) {
      throw new Error('There are no items of given id');
    }

    item = (await this._entityService.create(Object.assign(item, { id: v4() }))) as IItem;
    const slot = bearer.inventory.getEmptyCommonSlot();
    slot.addItem(amount, item);
  }
  
  public getAssociatedSlots(item: IPossesedItem): IInventorySlot[] {
    const bearer = this._entityService.getEntity<IInventoryBearer>(e => e.isInventoryBearer && e.inventory.hasItem(item));
    if (!bearer) {
      throw new Error("Item is not associated with any bearer");
    }
    return bearer.inventory.getSlotsByItem(item);
  }

}