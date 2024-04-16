import { IActivitySubjectDeclaration } from "../../../../base/activity/activity.interface";
import { Guid } from "../../../../extensions/types";
import { IItem, IItemDeclaration } from "../../../items/entities/item/item.interface";

export interface ITradable extends ITradableDeclaration, IItem {
  sellBasePrice: ITradePrice[];
  buyBasePrice: ITradePrice[];
  isTradable: true;
}

export interface ITradableDeclaration extends IActivitySubjectDeclaration, IItemDeclaration {
  sellBasePrice: ITradePrice[];
  buyBasePrice: ITradePrice[];
  isTradable: true;
}

export interface ITradePrice {
  currencyId: Guid;
  value: number;
}