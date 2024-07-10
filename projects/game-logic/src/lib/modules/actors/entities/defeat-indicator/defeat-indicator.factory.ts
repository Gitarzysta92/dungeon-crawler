import { IEntity } from "../../../../base/entity/entity.interface";
import { EntityService } from "../../../../base/entity/entity.service";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IDefeatIndicator, IDefeatIndicatorDeclaration } from "./defeat-indicator.interface";

export class DefeatableIndicatorFactory implements IMixinFactory<IDefeatIndicator> {

  constructor(
    private readonly _entityService: EntityService
  ) { }

  public validate(e: IDefeatIndicatorDeclaration): boolean {
    return e.isDefeatIndicator;
  };

  public create(e: Constructor<IEntity>): Constructor<IDefeatIndicator> {
    const entityService = this._entityService
    class DefeatableIndicator extends e implements IDefeatIndicator {

      public value?: number;
      public defeatTreshold: number;
      public isDefeatIndicator = true as const;
    
      constructor(d: IDefeatIndicatorDeclaration) {
        super(d);
        this.value = d.value;
        this.defeatTreshold = d.defeatTreshold;
      }

    }
    return DefeatableIndicator;
  };
}