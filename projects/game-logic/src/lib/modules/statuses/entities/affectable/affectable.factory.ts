import { Entity } from "../../../../base/entity/entity";
import { IEntityFactory, IEntity } from "../../../../base/entity/entity.interface";
import { Constructor } from "../../../../extensions/types";
import { IStatusDeclaration } from "../../statuses.interface";
import { IAffectable } from "./affectable.interface";

export class AffectableFactory implements IEntityFactory<IAffectable>  {

  constructor() { }

  public validate(e: IEntity & Partial<IAffectable>): boolean {
    return e.isAffectable;
  };

  public create(e: typeof Entity): Constructor<IAffectable> {
    return class Affectable extends e implements IAffectable {
      id: string;
      isAffectable: true;
      appliedStatuses: IStatusDeclaration[];
    }
  };
}