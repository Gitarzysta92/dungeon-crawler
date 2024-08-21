import { JsonPathResolver } from "../../../infrastructure/extensions/json-path";
import { ResolvableReference } from "../../../infrastructure/extensions/types";
import { ProcedureAggregate } from "../procedure-aggregate";
import { ProcedureStep } from "../procedure-step";
import { ProcedureExecutionPhase } from "../procedure.constants";
import { IProcedure, IProcedureContext, IProcedureExecutionStatus, IProcedureStep, IProcedureStepResult } from "../procedure.interface";
import { IExecuteProcedureStepDeclaration } from "./execute-procedure.interface";

export class ExecuteProcedureStep extends ProcedureStep implements IExecuteProcedureStepDeclaration {

  public isExecuteProcedureStep: true = true;
  public procedure: ResolvableReference<IProcedure>;

  constructor(
    d: IExecuteProcedureStepDeclaration
  ) {
    super(d);
    this.procedure = d.procedure as ResolvableReference<IProcedure>;
  }

  public async *execute(
    a: ProcedureAggregate,
    ctx: IProcedureContext
  ): AsyncGenerator<unknown, IProcedureStepResult, IProcedureStepResult> {
    const context: IProcedureContext & { procedureSteps: unknown } = Object.assign(a.createExecutionContext(this), ctx);

    let procedure = this.procedure as IProcedure;
    if (JsonPathResolver.isResolvableReference(procedure)) {
      procedure = JsonPathResolver.resolveInline(procedure, context);
    } 

    if (!procedure) {
      throw new Error("Cannot find nested procedure");
    }

    for await (let phase of procedure.perform(ctx, a => a.aggregate(this, a))) {
      yield this._mapToNestedPhase(phase, this)
    }

    return { continueExecution: true }
  }

  private _mapToNestedPhase(phase: IProcedureExecutionStatus, currentStep: IProcedureStep): IProcedureExecutionStatus {
    return {
      step: phase.step,
      aggregatedData: phase.aggregatedData,
      executionPhaseType: phase.executionPhaseType === ProcedureExecutionPhase.ExecutionFinished ?
        ProcedureExecutionPhase.NestedExecutionFinished : phase.executionPhaseType
    }
  }

}