import { IActivityDoer } from "../../../../base/activity/activity.interface";
import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { IRedistributionDeclaration } from "../../items.interface";
import { IInventorySlot, IInventorySlotDeclaration } from "../../mixins/inventory-slot/inventory-slot.interface";
import { IItem, IPossesedItem } from "../item/item.interface";

export interface IInventoryBearer extends IEntity, IActivityDoer {
  inventorySlots: IInventorySlot[];
  isInventoryBearer: true;
  items: IPossesedItem[]
  possessItem(itemId: Guid, amount: number): boolean;
  getItem(itemId: Guid): IPossesedItem | undefined;
  addItem(i: IItem, amount: number, slot?: IInventorySlot): void;
  redistributeItems(defs: Array<IRedistributionDeclaration>): void;
  validateRedistribution(defs: Array<IRedistributionDeclaration>): boolean;
}

export interface IInventoryBearerDeclaration extends IEntityDeclaration {
  inventorySlots: IInventorySlotDeclaration[];
  isInventoryBearer: true;
}