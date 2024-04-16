import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { InventorySlotType } from "./inventory-slot.constants";
import { IItem, IPossesedItem } from "../item/item.interface";
import { Guid } from "../../../../extensions/types";
import { IInventory } from "../inventory/inventory.interface";


export interface IInventorySlot extends IEntityDeclaration, IInventorySlotDeclaration{
  id: Guid;
  slotType: InventorySlotType;
  isOccupied?: boolean;
  stackSize: number;
  stackMaxSize: number;
  item: IPossesedItem | undefined;
  isInventorySlot: true;
  associatedInventory: IInventory;
  isAbleToTakeItems(amount: number): boolean;
  addItem(amount: number, item?: IItem): number;
  removeItem(amount?: number): IItem;
  canBeAssigned(amount: number): boolean;
}

export interface IInventorySlotDeclaration extends IEntityDeclaration {
  id: Guid;
  slotType: InventorySlotType;
  stackSize?: number;
  stackMaxSize?: number;
  isInventorySlot: true;
}
