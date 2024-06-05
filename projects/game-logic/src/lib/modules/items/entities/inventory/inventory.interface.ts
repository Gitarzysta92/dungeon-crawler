
import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { InventorySlotType } from "../inventory-slot/inventory-slot.constants";
import { IInventorySlot, IInventorySlotDeclaration } from "../inventory-slot/inventory-slot.interface";
import { IEquipableItem, IItem, IPossesedItem, IPossesedItemDeclaration } from "../item/item.interface";

export interface IInventory extends IEntityDeclaration {
  slots: IInventorySlot[];
  items: Array<IPossesedItem>;
  isInventory: true;
  hasItem(item: IItem | Guid, amount?: number): boolean;
  getItem(item: IPossesedItem | Guid): IPossesedItem;
  addItem(item: IItem | Guid, amount: number, slot?: IInventorySlot): void;
  removeItem(item: IPossesedItem | Guid, amount: number): void;
  hasSlot(slot: IInventorySlot): boolean;
  getSlotsByItem(itemId): IInventorySlot[] | undefined;
  getEmptyCommonSlot(): IInventorySlot;
  getSlot(query: { slotId?: Guid, slotType?: InventorySlotType }): IInventorySlot;
  redistributeItems(def: Array<{ from: IInventorySlot; to?: IInventorySlot; amount: number; }>): void;
  validateRedistribution(defs: Array<{ from: IInventorySlot; to?: IInventorySlot; amount: number; }>): boolean 
  getReservationItem(slot: IInventorySlot): IEquipableItem;
}

export interface IInventoryDeclaration extends IEntityDeclaration {
  slots: IInventorySlotDeclaration[];
  items: Array<IPossesedItemDeclaration>;
  isInventory: true;
}

export interface IRedistributionDeclaration {
  from: IInventorySlot;
  to?: IInventorySlot;
  amount: number;
}

