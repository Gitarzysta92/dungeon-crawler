
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
      this.useDelegate(d)?.select(d, a), this._entityService.getAllEntities());
    return result as T[];
  }

  public process2<T>(d: ISelectorDeclaration<unknown>[], data: T[]): T[] {
    const result = d.reduce((a, d) =>
      this.useDelegate(d)?.select(d, a), data);
    return result as T[];
  }

  public process3<T>(d: ISelectorDeclaration<unknown>[], i: T): T | undefined {
    const data = [i];
    const result = d.reduce((a, d) => this.useDelegate(d)?.select(d, a), data);
    return result[0] as T;
  } 
}
