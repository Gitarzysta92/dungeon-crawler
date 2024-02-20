import { InventorySlotType } from "./inventory.constants";
import { IItem, IPossesedItem } from "../item.interface";

export interface IInventoryDefinition {
  slots: IInventorySlot[];
  itemBindings: any;
}

export interface IInventory {
  slots: IInventorySlot[];
  items: Array<IPossesedItem & IItem>;
}

export interface IInventorySlot {
  id: string;
  slotType: InventorySlotType;
  isOccupied?: boolean;
  maxItemsStack?: number;
}

export interface IItemSlotAssignment {
  slotType: InventorySlotType,
  amount: number;
}


