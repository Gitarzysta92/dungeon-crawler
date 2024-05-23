import { IEntityDeclaration, IEntity } from "../../../../base/entity/entity.interface";
import { EntityService } from "../../../../base/entity/entity.service";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { Constructor, Guid } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IDefeatIndicator, IDefeatable, IDefeatableDeclaration } from "./defeatable.interface";

export class DefeatableFactory implements IMixinFactory<IDefeatable<[]>> {

  constructor(
    private readonly _entityService: EntityService
  ) { }

  public validate(e: IEntityDeclaration & Partial<IDefeatable<[]>>): boolean {
    return e.isDefeatable;
  };

  public create(e: Constructor<IEntity>): Constructor<IDefeatable<[]>> {
    const entityService = this._entityService
    class Defeatable extends e implements IDefeatable<[]> {

      public defeaterId?: Guid;
      public isDefeatable = true as const;
      public get isDefeated() { return this.defeatIndicators.every(di => di.value >= di.defeatTreshold)};

      @NotEnumerable()
      public get defeater() { return entityService.getEntityById(this.defeaterId) }

      private get defeatIndicators(): IDefeatIndicator[] {  
        return Object.entries(this)
          .map(([_, v]) => v as IDefeatIndicator)
          .filter(s => s.isDefeatIndicator);
      }
    
      constructor(d: IDefeatableDeclaration<[]>) {
        super(d);
        this.defeaterId = d.defeaterId;
      }

    }
    return Defeatable;
  };
}