import { Guid } from "../../infrastructure/extensions/types";
import { IItemDeclaration } from "./entities/item/item.interface";
import { IInventorySlot } from "./mixins/inventory-slot/inventory-slot.interface";


export interface IRedistributionDeclaration {
  from: IInventorySlot;
  to?: IInventorySlot;
  amount: number;
}




export interface IItemsDataFeed {
  getItems: (ids?: Guid[]) => Promise<IItemDeclaration[]>;
  getItem: (id: Guid) => Promise<IItemDeclaration>;
}



