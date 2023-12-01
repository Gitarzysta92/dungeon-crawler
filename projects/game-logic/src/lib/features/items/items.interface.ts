import { ItemType, CurrencyType } from "./items.constants";

export interface IItem {
  id: string;
  name: string;
  itemType: ItemType;
  maxStackSize: number;
  sourceItemId: string;
}

export interface ICurrencyItem extends IItem {
  itemType: ItemType.Currency;
  currencyType: CurrencyType;
}