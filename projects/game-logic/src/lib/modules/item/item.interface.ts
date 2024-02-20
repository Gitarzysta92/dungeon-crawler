import { IEntity } from "../../base/entity/entity.interface";
import { IInteractionSubject } from "../../cross-cutting/interaction/interaction.interface";
import { IModifierExposer } from "../../cross-cutting/modifier/modifier.interface";
import { Guid } from "../../extensions/types";
import { InventoryBearer } from "./bearer/inventory-bearer";
import { IItemSlotAssignment } from "./inventory/inventory.interface";


export interface IItem extends IEntity {
  id: string;
  maxStackSize: number;
  sourceItemId: string;
  isItem: true;
}


export interface IEquipable extends IModifierExposer, IInteractionSubject {
  requiredSlots: IItemSlotAssignment[];
  isEquipped?: boolean;
  equipableBearer?: string | InventoryBearer;
}


export interface IPossesedItem {
  slotIds: string[];
  amountInStack: number;
}

export interface IItemDataFeed {
  getItems: (ids?: Guid[]) => Promise<IItem[]>;
  getItem: (id: Guid) => Promise<IItem>;
}
