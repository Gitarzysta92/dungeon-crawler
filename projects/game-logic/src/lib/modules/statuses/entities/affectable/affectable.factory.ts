import { Entity } from "../../../../base/entity/entity";
import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IMixinFactory } from "../../../../base/mixin/mixin.interface";
import { Constructor } from "../../../../extensions/types";
import { IStatusDeclaration } from "../../statuses.interface";
import { IAffectable } from "./affectable.interface";

export class AffectableFactory implements IMixinFactory<IAffectable>  {

  constructor() { }

  public validate(e: IEntityDeclaration & Partial<IAffectable>): boolean {
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