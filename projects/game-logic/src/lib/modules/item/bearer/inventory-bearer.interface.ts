import { IInventory } from "../inventory/inventory.interface";



export interface IInventoryBearer {
  inventory: IInventory;
  isInventoryBearer: true;
}
