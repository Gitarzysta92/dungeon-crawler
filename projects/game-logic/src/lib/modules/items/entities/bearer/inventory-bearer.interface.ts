import { IActivityDoer } from "../../../../base/activity/activity.interface";
import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { IInventory, IInventoryDeclaration } from "../inventory/inventory.interface";
import { IItem } from "../item/item.interface";


export interface IInventoryBearer extends IEntityDeclaration, IActivityDoer {
  inventory: IInventory;
  isInventoryBearer: true;
  possessItem(item: IItem | Guid, amount: number): boolean
}

export interface IInventoryBearerDeclaration extends IEntityDeclaration {
  inventory: IInventoryDeclaration;
  isInventoryBearer: true;
}