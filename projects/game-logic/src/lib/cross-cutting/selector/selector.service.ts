import { IDelegateDeclaration } from "../../base/delegate/delegate.interface";
import { DelegateService } from "../../base/delegate/delegate.service";
import { EntityService } from "../../base/entity/entity.service";
import { ISelectorDefaultPayload, ISelectorHandler } from "./selector.interface";

export class SelectorService extends DelegateService<ISelectorHandler<ISelectorDefaultPayload, unknown>> {

  constructor(
    private readonly _entityService: EntityService
  ) { 
    super();
  }

  public process<T>(declarations: IDelegateDeclaration<ISelectorDefaultPayload>[]): T[] {
    const result = declarations.reduce((a, d) =>
      this._delegates.get(d.delegateId)?.select(d.payload, a), this._entityService.getAllEntities());
    return result as T[];
  }
}
