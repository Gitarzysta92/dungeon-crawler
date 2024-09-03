import { IDelegateDeclaration } from "../../infrastructure/delegate/delegate.interface";
import { DelegateService } from "../../infrastructure/delegate/delegate.service";
import { JsonPathResolver } from "../../infrastructure/extensions/json-path";
import { IConditionHandler } from "./condition.interface";

export class ConditionService extends DelegateService<IConditionHandler<unknown>> {
  constructor() { 
    super();
  }

  public check(ds: IDelegateDeclaration[], ctx?: unknown): boolean {
    return ds.every(d => {
      d = JSON.parse(JSON.stringify(d))
      const delegate = this.useDelegate(d);
      if (ctx) {
        JsonPathResolver.resolve(d.payload, ctx);
      }
      return delegate.process(d.payload);
    })
  }
  
}