import { IEntityFactory, IEntity } from "../../../base/entity/entity.interface";
import { Affectable } from "./affectable";
import { IAffectable } from "./affectable.interface";

export class AffectableFactory implements IEntityFactory<IAffectable>  {

  public get classDefinition() { return Affectable };

  constructor() { }
  
  public create(e: IAffectable & IEntity): Affectable {
    return new Affectable();
  };

  public validate(e: IEntity & Partial<IAffectable>): boolean {
    return e.isAffectable;
  };

}