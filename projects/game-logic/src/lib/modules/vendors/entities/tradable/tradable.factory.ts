
import { IActivityDeclaration } from "../../../../base/activity/activity.interface";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";

import { IItem } from "../../../items/entities/item/item.interface";
import { ITradable, ITradePrice } from "./trade.interface";

export class TradableFactory implements IMixinFactory<ITradable> {

  constructor() { }

  public validate(e: ITradable): boolean {
    return e.isTradable;
  };

  public create(e: Constructor<IItem>): Constructor<ITradable> {
    return class Tradable extends e implements ITradable {
      isActivitySubject: true;
      activities: IActivityDeclaration[];
      isTradable = true as const;
      sellBasePrice: ITradePrice[];
      buyBasePrice: ITradePrice[];
    } 
  };
}