import { IDelegateDeclaration } from "../../infrastructure/delegate/delegate.interface";
import { DelegateService } from "../../infrastructure/delegate/delegate.service";
import { JsonPathResolver } from "../../infrastructure/extensions/json-path";
import { IActionHandler } from "./action.interface";

export class ActionService extends DelegateService<IActionHandler<unknown>> {
  constructor() { 
    super();
  }

  public getAction(d: IDelegateDeclaration) {
    return this.useDelegate(d)
  }

  public async exectue(d: IDelegateDeclaration, ctx?: unknown): Promise<void> {
    const delegate = this.useDelegate(d);
    if (!delegate) {
      throw new Error(`Cannot find delegate for action execution: ${d.delegateId}`)
    }
    if (ctx) {
      JsonPathResolver.resolve(d, ctx);
    }
    await delegate.process(d, ctx);
  }
  
}