import { ItemType, CurrencyType } from "./items.constants";

export interface IItem {
  id: string;
  name: string;
  itemType: ItemType;
  maxStackSize: number;
}

export interface ICurrencyItem extends IItem {
  itemType: ItemType.Currency;
  currencyType: CurrencyType;
}