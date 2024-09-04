import { ProcedureAggregate } from "../../base/procedure/procedure-aggregate";
import { ProcedureStep } from "../../base/procedure/procedure-step";
import { IProcedureContext, IProcedureStepResult } from "../../base/procedure/procedure.interface";
import { JsonPathResolver } from "../../infrastructure/extensions/json-path";
import { IMakeActionStepDeclaration } from "./action.interface";
import { ActionService } from "./action.service";

export class MakeActionProcedureStep extends ProcedureStep implements IMakeActionStepDeclaration {

  isMakeActionStep = true as const;
  delegateId: string;
  payload: unknown;

  private _actionService: ActionService

  constructor(
    d: IMakeActionStepDeclaration,
    actionService: ActionService
  ) {
    super(d);
    this.delegateId = d.delegateId;
    this.payload = d.payload;
    Object.defineProperty(this, '_actionService', {
      value: actionService,
      enumerable: false
    })
  }

  public async *execute(
    a: ProcedureAggregate,
    ctx: IProcedureContext
  ): AsyncGenerator<unknown, IProcedureStepResult, IProcedureStepResult> {
    const context: IProcedureContext & { procedureSteps: unknown } = Object.assign(a.createExecutionContext(this), ctx);
    const payload = JSON.parse(JSON.stringify(this.payload));

    JsonPathResolver.resolve(payload, context, true);
    JsonPathResolver.resolve(payload, context.data, true);

    let result = null;
    if (this._actionService.canBeProcessed(this, payload)) {
      const process = this._actionService.makeAction(this, payload) as AsyncGenerator;
      if ('next' in process) {
        let i
        do {
          i = await process.next();
          yield i
          if (i.done) {
            result = i.value;
          }
        } while(!i.done)
      } else {
        result = process;
      }
    }

    a.aggregate(this, result);
    return Object.assign({ continueExecution: true }, payload);
  }

}