import { IEntityDeclaration } from "../../base/entity/entity.interface";
import { EntityService } from "../../base/entity/entity.service";
import { DelegateService } from "../../infrastructure/delegate/delegate.service";
import { IModificableDeclaration, IModifierDeclaration, IModifierExposer, IModifierHandler, } from "./modifier.interface";

export class ModifierService extends DelegateService<IModifierHandler<unknown>> {

  constructor(
    private readonly _entityService: EntityService,
  ) { 
    super();
  }

  public apply(modifier: IModifierDeclaration<unknown>, exposer: IModifierExposer) {
    exposer.modifiers.push(modifier);
  }

  public  process(s: IModificableDeclaration, context: IEntityDeclaration): any {
    const modifiers = this._aggregateModifiersFromContext(context);
    return modifiers.reduce((r, m) => m.validate(r) ? m.process(r, context) : r, s)
  }

  private _aggregateModifiersFromContext(context: unknown): any[] {
    return this._entityService.traverse(context, () => true);
  }
}
