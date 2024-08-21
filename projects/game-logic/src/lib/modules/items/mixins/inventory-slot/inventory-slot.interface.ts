import { IMixin } from "../../../../infrastructure/mixin/mixin.interface";
import { IItem, IPossesedItem } from "../../entities/item/item.interface";
import { InventorySlotType } from "./inventory-slot.constants";


export interface IInventorySlot extends IInventorySlotDeclaration {
  slotType: InventorySlotType;
  isOccupied?: boolean;
  isReserved?: boolean;
  stackSize: number;
  stackMaxSize: number;
  item: IPossesedItem | undefined;
  reservationItem: IPossesedItem | undefined;
  isInventorySlot: true;
  addItem(amount: number, item: IItem): number;
  removeItem(amount?: number): number;
  isAbleToTakeItems(amount: number, item: IItem): boolean;
}

export interface IInventorySlotDeclaration extends IMixin {
  id: number;
  slotType: InventorySlotType;
  stackSize?: number;
  stackMaxSize?: number;
  isInventorySlot: true;
}
