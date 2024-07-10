import { IEntity } from "../../../../base/entity/entity.interface";
import { EntityService } from "../../../../base/entity/entity.service";
import { JsonPathResolver } from "../../../../infrastructure/extensions/json-path";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { Constructor, Guid, ResolvableReference } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IDefeatIndicator } from "../defeat-indicator/defeat-indicator.interface";
import { IDefeatable, IDefeatableDeclaration } from "./defeatable.interface";

export class DefeatableFactory implements IMixinFactory<IDefeatable> {

  constructor(
    private readonly _entityService: EntityService
  ) { }

  public validate(e: IDefeatableDeclaration): boolean {
    return e.isDefeatable;
  };

  public create(e: Constructor<IEntity>): Constructor<IDefeatable> {
    const entityService = this._entityService
    class Defeatable extends e implements IDefeatable {

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
      public defeatIndicators: IDefeatIndicator[];

      public defeatIndicatorsRef: ResolvableReference<IDefeatIndicator>[] = [];
    
      constructor(d: IDefeatableDeclaration) {
        super(d);
        this.defeatIndicatorsRef = d.defeatIndicatorsRef;
      }

      public onInitialize(): void {
        this._resolveDefeatIndicators();
        if (super.onInitialize) {
          super.onInitialize();
        }
      }

      private _resolveDefeatIndicators(): void {
        const indicators = this.defeatIndicatorsRef.map(r => JsonPathResolver.resolveInline(r, this))
        if (indicators.some(i => !i)) {
          throw new Error("Cannot find referenced indicators");
        }

        Object.defineProperty(this, 'defeatIndicators', {
          value: indicators, 
          enumerable: false
        })
      }

    }
    return Defeatable;
  };
}