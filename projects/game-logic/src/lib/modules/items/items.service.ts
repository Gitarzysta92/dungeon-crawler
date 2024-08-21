import { v4 } from "uuid";
import { IInventoryBearer } from "./entities/bearer/inventory-bearer.interface";
import { IItemsDataFeed, IRedistributionDeclaration } from "./items.interface";
import { IItem, IPossesedItem } from "./entities/item/item.interface";
import { IInventorySlot } from "./mixins/inventory-slot/inventory-slot.interface";
import { EntityService } from "../../base/entity/entity.service";

export class ItemsService {
  
  constructor(
    private readonly _entityService: EntityService,
    private readonly _dataFeed: IItemsDataFeed
  ) { }

  public async addItem(bearer: IInventoryBearer, id: string, amount: number) {
    let item: IItem = bearer.getItem(id);
    if (item) {
      return bearer.addItem(item, amount);
    }

    item = await this._dataFeed.getItem(id) as IItem;
    if (!item) {
      throw new Error('There are no items of given id');
    }

    item = (await this._entityService.create(Object.assign(item, { id: v4() }))) as IItem;
    bearer.addItem(item, amount);
  }
  

  public validateRedistribution(
    decs: Array<IRedistributionDeclaration>,
    slots: IInventorySlot[],
  ): boolean {
    if (decs.filter(d => !!d.to && !!d.to.item).some(d => d.from.item !== d.to.item)) {
      return false;
    }
    if (decs.some(d => d.from.stackSize < d.amount)) {
      return false;
    }

    const canBeAssignedToAnySlotWithSameItem = (d: IRedistributionDeclaration) =>
      (!d.to && slots.some(s => s.isAbleToTakeItems(d.amount, d.from.item))) || (d.to && d.to.isAbleToTakeItems(d.amount, d.from.item));
    const canBeAssignedToAnySlot = (d: IRedistributionDeclaration) =>
      (!d.to && slots.some(s => s.isAbleToTakeItems(d.amount, d.from.item))) || (d.to && !d.to.isOccupied && d.to.isAbleToTakeItems(d.amount, d.from.item));
    if (decs.some(d => !canBeAssignedToAnySlot(d) && !canBeAssignedToAnySlotWithSameItem(d))) {
      return false;
    }

    const releasedSlots = decs.filter(d => d.from.stackSize === d.amount).map(d => d.from);
    const reservedSlotMap = new Map<IInventorySlot, number>();
    for (let d of decs) {
      let targetSlot = d.to
      if (!targetSlot) {
        const reservedSlots = Array.from(reservedSlotMap.entries())
        targetSlot = reservedSlots.find(([slot, v]) => slot.isAbleToTakeItems(d.amount + v, d.from.item))[0]
        if (!targetSlot) {
          targetSlot = slots.find(slot => slot.isAbleToTakeItems(d.amount, d.from.item))
        }
        if (!targetSlot) {
          targetSlot = reservedSlots.find(([slot, v]) => !slot.isOccupied && slot.isAbleToTakeItems(d.amount + v, d.from.item))[0]
        }
        if (!targetSlot) {
          targetSlot = slots.find(slot => !slot.isOccupied && slot.isAbleToTakeItems(d.amount, d.from.item))
        }
        if (!targetSlot) {
          targetSlot = releasedSlots.find(slot => !slot.isOccupied && slot.isAbleToTakeItems(d.amount, d.from.item))
        }
      }

      if (!targetSlot) {
        return false;
      }
      const sv = reservedSlotMap.get(d.to);
      const v = sv != null ? sv + d.to.stackSize : d.to.stackSize;
      // Check multiple redistributions to the same slot
      if (v > d.to.stackMaxSize) {
        return false;
      }
      reservedSlotMap.set(d.to, v);
    }

    return true;
  }


  public redistributeItems(defs: Array<IRedistributionDeclaration>, bearer: IInventoryBearer): void {
    if (!this.validateRedistribution(defs, bearer.inventorySlots)) {
      throw new Error("Cannot redistribute items");
    }
    for (let def of defs) {
      const item = def.from.item;
      def.from.removeItem(def.amount);
      bearer.addItem(item, def.amount, def.to);
    }
  }

}