import { IInteraction } from "../../cross-cutting/interaction/interaction.interface";
import { ITradable, ITradePrice } from "./trade.interface";

export class Tradable implements ITradable {
  isTradable: true;
  sellBasePrice: ITradePrice[];
  buyBasePrice: ITradePrice[];
  interaction: IInteraction[];

} 