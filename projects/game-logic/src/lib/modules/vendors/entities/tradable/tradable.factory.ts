import { Entity } from "../../../../base/entity/entity";
import { IEntityFactory, IEntity } from "../../../../base/entity/entity.interface";
import { IInteractionDeclaration } from "../../../../cross-cutting/interaction/interaction.interface";
import { Constructor } from "../../../../extensions/types";
import { ITradable, ITradePrice } from "./trade.interface";

export class TradableFactory implements IEntityFactory<ITradable> {

  constructor() { }

  public validate(e: IEntity & Partial<ITradable>): boolean {
    return e.isTradable;
  };

  public create(e: typeof Entity): Constructor<ITradable> {
    return class Tradable extends e implements ITradable {
      isTradable = true as const;
      sellBasePrice: ITradePrice[];
      buyBasePrice: ITradePrice[];
      interaction: IInteractionDeclaration[];
    } 
  };
}