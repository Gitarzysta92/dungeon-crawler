import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";

import { IItem } from "../../../items/entities/item/item.interface";
import { ITradable, ITradableDeclaration, ITradePrice } from "./trade.interface";

export class TradableFactory implements IMixinFactory<ITradable> {

  constructor() { }

  public isApplicable(e: ITradable): boolean {
    return e.isTradable;
  };

  public create(e: Constructor<IItem>): Constructor<ITradable> {
    return class Tradable extends e implements ITradable {
      isTradable = true as const;
      sellBasePrice: ITradePrice[];
      buyBasePrice: ITradePrice[];

      constructor(d: ITradableDeclaration) {
        super(d);
        this.sellBasePrice = d.sellBasePrice;
        this.buyBasePrice = d.buyBasePrice;
      }
    } 
  };
}