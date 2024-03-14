import { IEntity } from "../../../../base/entity/entity.interface";
import { IInteractionResourceProvider } from "../../../../cross-cutting/interaction/interaction.interface";
import { IInventory, IInventoryDeclaration } from "../inventory/inventory.interface";


export interface IInventoryBearer extends IEntity, IInteractionResourceProvider {
  inventory: IInventory;
  isInventoryBearer: true;
}

export interface IInventoryBearerDeclaration extends IEntity {
  inventory: IInventoryDeclaration;
  isInventoryBearer: true;
}