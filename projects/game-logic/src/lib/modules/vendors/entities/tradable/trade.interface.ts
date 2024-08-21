import { Guid } from "../../../../infrastructure/extensions/types";
import { IItem, IItemDeclaration } from "../../../items/entities/item/item.interface";

export interface ITradable extends Omit<ITradableDeclaration, 'entities'>, IItem {
  sellBasePrice: ITradePrice[];
  buyBasePrice: ITradePrice[];
  isTradable: true;
}

export interface ITradableDeclaration extends IItemDeclaration {
  sellBasePrice: ITradePrice[];
  buyBasePrice: ITradePrice[];
  isTradable: true;
}

export interface ITradePrice {
  currencyId: Guid;
  value: number;
}