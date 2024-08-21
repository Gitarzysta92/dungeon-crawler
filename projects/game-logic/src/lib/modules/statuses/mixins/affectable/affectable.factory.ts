import { IEntity } from "../../../../base/entity/entity.interface";
import { EntityService } from "../../../../base/entity/entity.service";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IStatusExposer } from "../status-exposer/status-exposer.interface";
import { IStatusInstance } from "../status-instance/status-instance.interface";
import { IAffectableDeclaration } from "./affectable.interface";

export class AffectableFactory implements IMixinFactory<IAffectableDeclaration>  {

  constructor(
    private readonly _entityService: EntityService
  ) { }

  public isApplicable(e: IAffectableDeclaration): boolean {
    return e.isAffectable;
  };

  public create(e: Constructor<IEntity>): Constructor<IAffectableDeclaration> {
    const entityService = this._entityService;
    return class Affectable extends e implements IAffectableDeclaration {

      public isAffectable = true as const;
      
      constructor(data: IAffectableDeclaration) {
        super(data);
      }

      public applyStatus(s: IStatusInstance): void {
        this.registerEntity(s)
      }

      public onUpdate(): void {
        const exposers = entityService.getEntities<IStatusExposer>(e => e.isStatusExposer);
        for (let exposer of exposers) {
          const statuses = exposer.getApplicableStatuses(this);
          for (let status of statuses) {
            status.affect(this);
          }
        }
        if (super.onUpdate) {
          super.onUpdate();
        }
      }

      public onDestroy(): void {
        
      }

    }
  };
}