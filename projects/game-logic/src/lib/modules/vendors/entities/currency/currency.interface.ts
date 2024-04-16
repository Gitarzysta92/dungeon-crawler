import { Guid } from "../../../../extensions/types";
import { IItem, IItemDeclaration } from "../../../items/entities/item/item.interface";

export interface ICurrency extends ICurrencyDeclaration {

} 

export interface ICurrencyDeclaration extends IItemDeclaration {
  id: Guid;
  value: number;
  isCurrency: true
}