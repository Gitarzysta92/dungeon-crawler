import { IEntity } from "../../../../base/entity/entity.interface";
import { EntityService } from "../../../../base/entity/entity.service";
import { IProcedureDeclaration } from "../../../../base/procedure/procedure.interface";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { IModifierDeclaration, IModifierExposer } from "../../../../cross-cutting/modifier/modifier.interface";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IStatus } from "../status/status.interface";
import { IStatusInstance, IStatusInstanceDeclaration } from "./status-instance.interface";

export class StatusInstanceFactory implements IMixinFactory<IStatusInstance>  {

  constructor(
    private readonly _entityService: EntityService
  ) { }

  public isApplicable(e: IStatusInstance): boolean {
    return e.associatedStatusId
  };

  public create(e: Constructor<IEntity & Partial<IModifierExposer>>): Constructor<IStatusInstance> {
    const entityService = this._entityService;
    class StatusInstance extends e implements IStatusInstance {
      public statusInstanceId: string;
      public duration: number;
      public isPerpetual: boolean;
      public isStackable: boolean;
      public modifiers?: IModifierDeclaration[];
      public pocedures?: ({ triggers: IEventListenerDeclaration<unknown>[]; } & IProcedureDeclaration)[];
      public associatedStatusId = true as const; 

      constructor(data: IStatusInstanceDeclaration) {
        super(data);
        this.isPerpetual = data.isPerpetual;
        this.isStackable = data.isStackable;
        this.modifiers = data.modifiers;
        this.associatedStatusId = data.associatedStatusId
      }
      
      public stack(): void {
        
      }

      public canBeStacked(): boolean {
        return false
      }


      private _createStatusInstance(): IStatusInstance {
        return entityService.createSync<IStatusInstance>(this)
      }


      private _stackInstance(i: IStatusInstance) {
        i.stack 
      }

    }

    return StatusInstance;
  };
}