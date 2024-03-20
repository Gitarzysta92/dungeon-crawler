import { Guid } from "../../extensions/types";
import { IItem, IItemDeclaration } from "./entities/item/item.interface";

export interface IItemsDataFeed {
  getItems: (ids?: Guid[]) => Promise<IItemDeclaration[]>;
  getItem: (id: Guid) => Promise<IItemDeclaration>;
}



