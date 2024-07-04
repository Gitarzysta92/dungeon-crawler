import { ProcedureAggregate } from "../../base/procedure/procedure-aggregate";
import { ProcedureStep } from "../../base/procedure/procedure-step";
import { IProcedureContext, IProcedureStepPerformanceResult } from "../../base/procedure/procedure.interface";
import { IMakeActionProcedureStepDeclaration } from "./action.interface";
import { ActionService } from "./action.service";

export class MakeActionProcedureStep extends ProcedureStep implements IMakeActionProcedureStepDeclaration {

  isMakeActionStep = true as const;
  delegateId: string;
  payload: unknown;

  constructor(
    d: IMakeActionProcedureStepDeclaration,
    private readonly _actionService: ActionService
  ) {
    super(d);
    this.delegateId = d.delegateId;
    this.payload = d.payload;
  }

  public async execute(a: ProcedureAggregate, c: IProcedureContext): Promise<IProcedureStepPerformanceResult> {
    const delegate = this._actionService.getAction(this);
    const result = await delegate.process(this, c);
    a.aggregate(this, result);
    return { continueExecution: true }
  }

}