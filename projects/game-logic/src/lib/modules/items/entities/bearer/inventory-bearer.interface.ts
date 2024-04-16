import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IActivityResourceProvider } from "../../../../base/activity/activity.interface";
import { IInventory, IInventoryDeclaration } from "../inventory/inventory.interface";
import { IItem } from "../item/item.interface";
import { Guid } from "../../../../extensions/types";


export interface IInventoryBearer extends IEntityDeclaration, IActivityResourceProvider {
  inventory: IInventory;
  isInventoryBearer: true;
  possessItem(item: IItem | Guid, amount: number): boolean
}

export interface IInventoryBearerDeclaration extends IEntityDeclaration {
  inventory: IInventoryDeclaration;
  isInventoryBearer: true;
}