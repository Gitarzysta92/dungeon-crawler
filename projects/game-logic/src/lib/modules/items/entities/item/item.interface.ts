import { IEntity } from "../../../../base/entity/entity.interface";
import { IInteractionSubject } from "../../../../cross-cutting/interaction/interaction.interface";
import { IModifierExposer } from "../../../../cross-cutting/modifier/modifier.interface";
import { IInventorySlot } from "../inventory-slot/inventory-slot.interface";
import { IInventory } from "../inventory/inventory.interface";
import { Guid } from "../../../../extensions/types";



export interface IItem extends IEntity, IItemDeclaration { 
  addSlot(slotId: Guid);
  removeSlot(slotId: Guid);
}
export interface IItemDeclaration extends IEntity {
  id: string;
  sourceItemId: string;
  isItem: true;
}

export interface IPossesedItem extends IItem {
  readonly associatedSlots: IInventorySlot[];
  associatedInventory: IInventory;
  amount: number;
}
export interface IPossesedItemDeclaration extends IItemDeclaration {
  slotIds: string[];
}

export interface IDisposableItem extends IPossesedItem { }
export interface IDisposableItemDclaration extends IInteractionSubject, IItemDeclaration {
  charges: number;
  preserveWithoutCharges: boolean;
}

export interface IEquipableItem extends IPossesedItem {
  isEquipped: boolean;
  equipableTo: Array<{ slotId: Guid, denyEquppingFor?: [{ slotId: Guid }] }>;
  equip(slot?: IInventorySlot): void;
  unequip(): void;
}

export interface IEquipableItemDeclaration extends IModifierExposer, IInteractionSubject, IItemDeclaration {
  equipableTo: Array<{ slotId: Guid, denyEquppingFor?: [{ slotId: Guid }] }>;
}