import { DelegateService } from "../../base/delegate/delegate.service";
import { IEntity } from "../../base/entity/entity.interface";
import { EntityService } from "../../base/entity/entity.service";
import { IModificable, IModifierDeclaration, IModifierExposer, IModifierHandler, } from "./modifier.interface";

export class ModifierService extends DelegateService<IModifierHandler<unknown>> {

  constructor(
    private readonly _entityService: EntityService,
  ) { 
    super();
  }

  public apply(modifier: IModifierDeclaration<unknown>, exposer: IModifierExposer) {
    exposer.exposeModifiers.push(modifier);
  }

  public  process(s: IModificable, context: IEntity): any {
    const modifiers = this._aggregateModifiersFromContext(context);
    return modifiers.reduce((r, m) => m.validate(r) ? m.process(r, context) : r, s)
  }

  private _aggregateModifiersFromContext(context: unknown): any[] {
    return this._entityService.traverse(context, () => true);
  }
}
