
import { EntityService } from "../../base/entity/entity.service";
import { DelegateService } from "../../infrastructure/delegate/delegate.service";
import { ISelectorDeclaration, ISelectorHandler } from "./selector.interface";

export class SelectorService extends DelegateService<ISelectorHandler<unknown>> {

  constructor(
    private readonly _entityService: EntityService
  ) { 
    super();
  }

  public process<T>(declarations: ISelectorDeclaration<unknown>[]): T[] {
    const result = declarations.reduce((a, d) =>
      this._delegates.get(d.delegateId)?.select(d, a), this._entityService.getAllEntities());
    return result as T[];
  }
}
