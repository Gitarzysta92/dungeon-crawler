import { IInteractionSubject } from "../../cross-cutting/interaction/interaction.interface";


export interface ITradable extends IInteractionSubject {
  sellBasePrice: ITradePrice[];
  buyBasePrice: ITradePrice[];
  isTradable: true;
}


export interface ITradePrice {
  value: number;
}

export interface ICurrency {
  value: number;
}