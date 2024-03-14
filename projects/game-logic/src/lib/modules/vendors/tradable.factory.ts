import { IEntityFactory, IEntity } from "../../base/entity/entity.interface";
import { Tradable } from "./tradable";
import { ITradable } from "./trade.interface";

export class TradableFactory implements IEntityFactory<ITradable> {
  public get classDefinition() { return Tradable };

  constructor() { }
  
  public create(e: ITradable & IEntity): Tradable {
    return new Tradable();
  };

  public validate(e: IEntity & Partial<ITradable>): boolean {
    return e.isTradable;
  };
}