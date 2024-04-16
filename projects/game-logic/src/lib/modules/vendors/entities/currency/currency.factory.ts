import { IEntity } from "../../../../base/entity/entity.interface";
import { IMixinFactory } from "../../../../base/mixin/mixin.interface";
import { Constructor } from "../../../../extensions/types";
import { IItem } from "../../../items/entities/item/item.interface";
import { ICurrency } from "./currency.interface";

export class CurrencyFactory implements IMixinFactory<ICurrency> {

  constructor() { }

  public validate(e: ICurrency): boolean {
    return e.isCurrency;
  };

  public create(e: Constructor<IItem>): Constructor<ICurrency> {
    return class Currency extends e implements ICurrency {
      value: number;
      isCurrency = true as const;
      
    } 
  };
}