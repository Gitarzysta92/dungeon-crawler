import { IDelegateDeclaration } from "../../base/delegate/delegate.interface";
import { DelegateService } from "../../base/delegate/delegate.service";
import { JsonPathResolver } from "../../extensions/json-path";
import { IConditionHandler } from "./condition.interface";

export class ConditionService extends DelegateService<IConditionHandler<unknown>> {
  constructor() { 
    super();
  }

  public check(ds: IDelegateDeclaration[], ctx?: unknown): boolean {
    return ds.every(d => {
      const delegate = this.useDelegate(d);
      if (ctx) {
        d = JsonPathResolver.resolve(d, ctx);
      }
      return delegate.process(d);
    })
  }
  
}