import { IDelegateDeclaration } from "../../infrastructure/delegate/delegate.interface";
import { DelegateService } from "../../infrastructure/delegate/delegate.service";
import { JsonPathResolver } from "../../infrastructure/extensions/json-path";
import { IActionHandler } from "./action.interface";

export class ActionService extends DelegateService<IActionHandler<unknown>> {
  constructor() { 
    super();
  }

  public async exectue(d: IDelegateDeclaration, ctx?: unknown): Promise<void> {
    const delegate = this.useDelegate(d);
    if (ctx) {
      d = JsonPathResolver.resolve(d, ctx);
    }
    await delegate.process(d);
  }
  
}