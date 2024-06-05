import { IActivitySubjectDeclaration } from "../../../../base/activity/activity.interface";
import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IModifierExposer } from "../../../../cross-cutting/modifier/modifier.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { ItemRarity } from "../../items.constants";
import { IInventorySlot } from "../inventory-slot/inventory-slot.interface";
import { IInventory } from "../inventory/inventory.interface";



export interface IItem extends IEntityDeclaration, IItemDeclaration { 
  addSlot(slotId: Guid);
  removeSlot(slotId: Guid);
}

export interface IItemDeclaration extends IEntityDeclaration {
  id: string;
  sourceItemId: string;
  isItem: true;
  rarity: ItemRarity
}

export interface IPossesedItem extends IItem, IPossesedItemDeclaration {
  readonly associatedSlots: IInventorySlot[];
  associatedInventory: IInventory;
  readonly amount: number;
}

export interface IPossesedItemDeclaration extends IItemDeclaration {
  associatedSlotIds: string[];
}

export interface IDisposableItem extends IPossesedItem { }
export interface IDisposableItemDclaration extends IActivitySubjectDeclaration, IItemDeclaration {
  charges: number;
  preserveWithoutCharges: boolean;
}

export interface IEquipableItem extends IPossesedItem {
  isEquipped: boolean;
  equipableTo: Array<{ slotId: Guid, reserveSlotId?: Guid[] }>;
  reservedSlotIds: Guid[];
  equip(toSlot: IInventorySlot, fromSlot: IInventorySlot): void;
  unequip(): void;
}

export interface IEquipableItemDeclaration extends IActivitySubjectDeclaration, IItemDeclaration, Partial<IModifierExposer> {
  equipableTo: Array<{ slotId: Guid, reserveSlotId?: Guid[] }>;
}