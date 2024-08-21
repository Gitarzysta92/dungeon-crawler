import { IEntity } from "../../../../base/entity/entity.interface";
import { EntityService } from "../../../../base/entity/entity.service";
import { JsonPathResolver } from "../../../../infrastructure/extensions/json-path";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { Constructor, Guid } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IDefeatIndicator } from "../../mixins/defeat-indicator/defeat-indicator.interface";
import { IDefeatable, IDefeatableDeclaration } from "./defeatable.interface";

export class DefeatableFactory implements IMixinFactory<IDefeatable> {

  constructor(
    private readonly _entityService: EntityService
  ) { }

  public isApplicable(e: IDefeatableDeclaration): boolean {
    return e.isDefeatable;
  };

  public create(e: Constructor<IEntity>): Constructor<IDefeatable> {
    const entityService = this._entityService
    class Defeatable extends e implements IDefeatable {

      public entities: IDefeatIndicator[];

      public defeaterId?: Guid;
      public isDefeatable = true as const;
      public get isDefeated() {
        return this.defeatIndicators.every(di => {
          return di.value <= di.defeatTreshold
        })
      };

      @NotEnumerable()
      public get defeater() { return entityService.getEntityById(this.defeaterId) }

      @NotEnumerable()
      public get defeatIndicators() { return this.getEntities<IDefeatIndicator>(e => e.isDefeatIndicator) }

    
      constructor(d: IDefeatableDeclaration) {
        super(d);
      }

      public onInitialize(): void {
        if (super.onInitialize) {
          super.onInitialize();
        }
      }


    }
    return Defeatable;
  };
}