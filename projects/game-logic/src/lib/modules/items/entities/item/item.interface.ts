import { IActivitySubjectDeclaration } from "../../../../base/activity/activity.interface";
import { ICountable } from "../../../../base/countable/countable.interface";
import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IModifierExposer } from "../../../../cross-cutting/modifier/modifier.interface";
import { ItemRarity } from "../../items.constants";
import { IInventorySlot } from "../../mixins/inventory-slot/inventory-slot.interface";
import { IInventoryBearer } from "../bearer/inventory-bearer.interface";



export interface IItem extends IEntity {
  id: string;
  sourceItemId: string;
  isItem: true;
  rarity: ItemRarity
  addSlot(slotId: number);
  removeSlot(slotId: number);
}

export interface IItemDeclaration extends IEntityDeclaration {
  id: string;
  sourceItemId: string;
  isItem: true;
  rarity: ItemRarity
}

export interface IPossesedItem extends IItem, ICountable {
  associatedSlotIds: number[];
  readonly associatedSlots: IInventorySlot[];
  //associatedInventory: IInventory;
  readonly quantity: number;
  setBearer(bearer: IInventoryBearer): void
}

export interface IPossesedItemDeclaration extends IItemDeclaration, ICountable {
  associatedSlotIds: number[];
}

export interface IDisposableItem extends IPossesedItem { }
export interface IDisposableItemDclaration extends IActivitySubjectDeclaration, IItemDeclaration {
  charges: number;
  preserveWithoutCharges: boolean;
}

export interface IEquipableItem extends IPossesedItem {
  isEquipped: boolean;
  equipableTo: Array<{ slotId: number, reserveSlotId?: number[] }>;
  reservedSlotIds: number[];
  equip(toSlot: IInventorySlot, fromSlot: IInventorySlot): void;
  unequip(): void;
}

export interface IEquipableItemDeclaration extends IActivitySubjectDeclaration, IItemDeclaration, Partial<IModifierExposer> {
  equipableTo: Array<{ slotId: number, reserveSlotId?: number[] }>;
}