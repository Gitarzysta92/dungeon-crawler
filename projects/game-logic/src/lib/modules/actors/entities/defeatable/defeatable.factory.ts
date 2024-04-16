import { Entity } from "../../../../base/entity/entity";
import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IMixinFactory } from "../../../../base/mixin/mixin.interface";
import { EntityService } from "../../../../base/entity/entity.service";
import { NotEnumerable } from "../../../../extensions/object-traverser";
import { Constructor, Guid } from "../../../../extensions/types";
import { IDefeatIndicator, IDefeatable, IDefeatableDeclaration, IDefeater } from "./defeatable.interface";

export class DefeatableFactory implements IMixinFactory<IDefeatable<[]>> {

  constructor(
    private readonly _entityService: EntityService
  ) { }

  public validate(e: IEntityDeclaration & Partial<IDefeatable<[]>>): boolean {
    return e.isDefeatable;
  };

  public create(e: typeof Entity): Constructor<IDefeatable<[]>> {
    const entityService = this._entityService
    class Defeatable extends e implements IDefeatable<[]> {

      public defeaterId?: Guid;
      public isDefeatable = true as const;
      public get isDefeated() { return this.defeatIndicators.every(di => di.value >= di.defeatTreshold)};

      @NotEnumerable()
      public get defeater() { return this._entityService.getEntityById(this.defeaterId) }

      private get defeatIndicators(): IDefeatIndicator[] {  
        return Object.entries(this)
          .map(([_, v]) => v as IDefeatIndicator)
          .filter(s => s.isDefeatIndicator);
      }

      private readonly _entityService: EntityService = entityService;
    
      constructor(d: IDefeatableDeclaration<[]>) {
        super(d);
        this.defeaterId = d.defeaterId;
      }

    }
    return Defeatable;
  };
}