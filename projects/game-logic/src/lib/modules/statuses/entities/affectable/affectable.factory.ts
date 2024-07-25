import { IEntity } from "../../../../base/entity/entity.interface";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IStatusDeclaration } from "../../statuses.interface";
import { IAffectable } from "./affectable.interface";

export class AffectableFactory implements IMixinFactory<IAffectable>  {

  constructor() { }

  public isApplicable(e: IAffectable): boolean {
    return e.isAffectable;
  };

  public create(e: Constructor<IEntity>): Constructor<IAffectable> {
    return class Affectable extends e implements IAffectable {
      id: string;
      isAffectable: true;
      appliedStatuses: IStatusDeclaration[];
    }
  };
}