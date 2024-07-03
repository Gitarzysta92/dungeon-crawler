import { ProcedureAggregate } from "./procedure-aggregate";
import { ProcedureStepTrigger } from "./procedure.constants";
import { IProcedure, IProcedureContext, IProcedureStep, IProcedureStepDeclaration } from "./procedure.interface";

export abstract class ProcedureStep implements IProcedureStep {
  key: string;
  isInitialStep: boolean = false;
  nextStepTrigger: ProcedureStepTrigger | undefined;
  nextStep: ProcedureStep | undefined;
  prevStep: ProcedureStep | undefined;
  repetitions: number = 1;
  index: number;
  executionsNumber: number | undefined;
  procedure: IProcedure

  public get totalExecutionNumber() { return (this.prevStep?.totalExecutionNumber ?? 1) * this.executionsNumber }

  constructor(
    d: IProcedureStepDeclaration,
  ) {
    this.key = d.key;
    this.isInitialStep = d.isInitialStep;
    this.nextStep = d.nextStep as ProcedureStep;
    this.nextStepTrigger = d.nextStepTrigger;
    this.executionsNumber = d.executionsNumber as number ?? 1;
    this.procedure = d.procedure as IProcedure;
  }

  abstract perform(a: ProcedureAggregate, c: IProcedureContext, allowEarlyResolve?: boolean): Promise<boolean>;

  public isResolved(a: ProcedureAggregate): boolean {
    return a.getAggregatedDataForStep(this).length >= this.totalExecutionNumber;
  }

  public getNextStep(a: ProcedureAggregate): ProcedureStep {
    if (this.nextStepTrigger === ProcedureStepTrigger.AfterAll && !this.isResolved(a)) {
      return this;
    } else {
      return this.nextStep;
    }
  }

  
}