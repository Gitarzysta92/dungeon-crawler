import { IEntity } from "../../../../base/entity/entity.interface";
import { EntityService } from "../../../../base/entity/entity.service";
import { IProcedureDeclaration } from "../../../../base/procedure/procedure.interface";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { IModifierDeclaration, IModifierExposer } from "../../../../cross-cutting/modifier/modifier.interface";
import { ISelectorDeclaration } from "../../../../cross-cutting/selector/selector.interface";
import { SelectorService } from "../../../../cross-cutting/selector/selector.service";
import { JsonPathResolver } from "../../../../infrastructure/extensions/json-path";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { Constructor, ResolvableReference } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IAffectable } from "../affectable/affectable.interface";
import { IStatusExposer } from "../status-exposer/status-exposer.interface";
import { IStatusInstance } from "../status-instance/status-instance.interface";
import { IStatus, IStatusDeclaration } from "./status.interface";
import { v4 } from "uuid";


export class StatusFactory implements IMixinFactory<IStatus>  {

  constructor(
    private readonly _selectorService: SelectorService,
    private readonly _entityService: EntityService
  ) { }

  public isApplicable(e: IStatus): boolean {
    return e.isStatus;
  };

  public create(e: Constructor<IEntity>): Constructor<IStatus> {
    const selectorService = this._selectorService;
    const entityService = this._entityService;
    class Status extends e implements IStatus {
      public duration: number;
      public isPerpetual: boolean;
      public isStackable: boolean;
      public selectors?: ISelectorDeclaration<unknown>[];
      public modifiers?: IModifierDeclaration[];
      public procedures?: ({ triggers: IEventListenerDeclaration<unknown>[]; } & IProcedureDeclaration)[];
      public isStatus = true as const;
      public isStatusInstance?: true; 

      @NotEnumerable()
      public exposer: ResolvableReference<IStatusExposer>;

      constructor(data: IStatusDeclaration) {
        super(data);
        this.isPerpetual = data.isPerpetual;
        this.isStackable = data.isStackable;
        this.selectors = data.selectors;
        this.modifiers = data.modifiers;
        this.modifiers = data.modifiers;
      }


      public onInitialize(): void {
        if (this.selectors) {
          for (let selector of this.selectors) {
            JsonPathResolver.resolve(selector, this)
          }
        }
        if (super.onInitialize) {
          super.onInitialize()
        }
      }

      public affect(target: IAffectable): void {
        const appliedStatuses = target.getEntities<IStatusInstance>(e => e.associatedStatusId);
        const statusInstance = appliedStatuses.find(s => s.statusInstanceId === this.id);
        if (statusInstance && !statusInstance.canBeStacked()) {
          return;
        }
        if (statusInstance) {
          statusInstance.stack()
          return;
        }

        target = selectorService.process3(this.selectors, target)
        if (!target) {
          return;
        }
        target.applyStatus(this._createStatusInstance())
      }


      public canAffect(target: IAffectable): boolean {
        const appliedStatuses = target.getEntities<IStatusInstance>(e => e.associatedStatusId);
        const statusInstance = appliedStatuses.find(s => s.statusInstanceId === this.id);
        if (statusInstance && !statusInstance.canBeStacked()) {
          return false;
        }
        return !!selectorService.process3(this.selectors, target)
      }


      private _createStatusInstance(): IStatusInstance {
        return entityService.createSync<IStatusInstance>({
          id: v4(),
          duration: this.duration,
          isPerpetual: this.isPerpetual,
          isStackable: this.isStackable,
          modifiers: this.modifiers,
          pocedures: this.procedures,
          associatedStatusId: true,
          isEntity: true,
          isMixin: true,
          statusInstanceId: this.id
        });
      }

    }

    return Status;
  };
}