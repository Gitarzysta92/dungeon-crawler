import { IDelegateDeclaration } from "../../base/delegate/delegate.interface";
import { DelegateService } from "../../base/delegate/delegate.service";
import { EntityService } from "../../base/entity/entity.service";
import { IActionHandler } from "./action.interface";

export class ActionService extends DelegateService<IActionHandler<unknown, unknown>> {
  constructor(
    private readonly _entityService: EntityService,
  ) { 
    super();
  }

  public async exectue(d: IDelegateDeclaration<unknown>, ctx: unknown): Promise<void> {
    const delegate = this.useDelegate(d);
    await delegate.process(delegate.prepare(d, ctx));
  }
  
}