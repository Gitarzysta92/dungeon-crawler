import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { IInventory } from "../inventory/inventory.interface";
import { IItem, IPossesedItem } from "../item/item.interface";
import { InventorySlotType } from "./inventory-slot.constants";


export interface IInventorySlot extends IEntityDeclaration, IInventorySlotDeclaration{
  id: Guid;
  slotType: InventorySlotType;
  isOccupied?: boolean;
  isReserved?: boolean;
  stackSize: number;
  stackMaxSize: number;
  item: IPossesedItem | undefined;
  reservationItem: IPossesedItem | undefined;
  isInventorySlot: true;
  associatedInventory: IInventory;
  addItem(amount: number, item?: IItem): number;
  removeItem(amount?: number): number;
  isAbleToTakeItems(amount: number, item: IItem): boolean;
}

export interface IInventorySlotDeclaration extends IEntityDeclaration {
  id: Guid;
  slotType: InventorySlotType;
  stackSize?: number;
  stackMaxSize?: number;
  isInventorySlot: true;
}
