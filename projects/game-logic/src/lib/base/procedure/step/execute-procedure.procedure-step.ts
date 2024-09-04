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
    let procedure = this.procedure as IProcedure;
    if (JsonPathResolver.isResolvableReference(procedure)) {
      procedure = JsonPathResolver.resolveInline(procedure, Object.assign({...ctx}, a.createExecutionContext(this)));
    } 

    if (!procedure) {
      throw new Error("Cannot find nested procedure");
    }

    if (!procedure.perform) {
      throw new Error("Cannot execute procedure in step: Provided object is not an procedure");
    }

    const context: IProcedureContext = {
      controller: ctx.controller,
      data: Object.assign({ performer: (ctx.data as any).performer }, procedure)
    }

    for await (let phase of procedure.perform(context, na => a.aggregate(this, na))) {
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