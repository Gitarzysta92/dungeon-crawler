import { ProcedureAggregate } from "../../base/procedure/procedure-aggregate";
import { ProcedureStep } from "../../base/procedure/procedure-step";
import { IProcedureContext, IProcedureStepPerformanceResult } from "../../base/procedure/procedure.interface";
import { IMakeActionProcedureStepDeclaration } from "./action.interface";
import { ActionService } from "./action.service";

export class MakeActionProcedureStep extends ProcedureStep implements IMakeActionProcedureStepDeclaration {

  isMakeActionStep = true as const;
  delegateId: string;
  payload: unknown;

  private _actionService: ActionService

  constructor(
    d: IMakeActionProcedureStepDeclaration,
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

  public async execute(a: ProcedureAggregate, ctx: IProcedureContext): Promise<IProcedureStepPerformanceResult> {
    ctx = Object.assign(a.createExecutionContext(this), ctx);

    const delegate = this._actionService.getAction(this);
    const result = await delegate.process(this.payload, ctx);
    a.aggregate(this, result);
    return { continueExecution: true }
  }

}