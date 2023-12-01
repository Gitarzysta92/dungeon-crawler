import { InventorySlotType } from "./inventory.constants";
import { IItem } from "./items.interface";

export interface IItemSlot {
  id: string;
  slotType: InventorySlotType;
  isOccupied?: boolean;
  maxItemsStack?: number;
}

export interface IItemSlotQuery {
  slotType: InventorySlotType,
  amount: number;
}

export interface IInventory {
  id: string;
  actorId: string;
  slots: IItemSlot[];
  items: Array<IPossesedItem & IItem>;
}

export interface IPossesedItem {
  slotIds: string[];
  amountInStack: number;
}

