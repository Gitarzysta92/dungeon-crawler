import { ProcedureAggregate } from "./procedure-aggregate";
import { ProcedureStepTrigger } from "./procedure.constants";
import { IProcedureContext, IProcedureStep, IProcedureStepDeclaration, IProcedureStepResult } from "./procedure.interface";

export abstract class ProcedureStep implements IProcedureStep {
  public index: number;
  public key: string;
  public isInitialStep: boolean = false;
  public nextStepTrigger: ProcedureStepTrigger | undefined;
  public nextStep: ProcedureStep | undefined;
  public prevStep: ProcedureStep | undefined;
  public executionsNumber: number | undefined;
  public get totalExecutionsNumber() { return (this.prevStep?.totalExecutionsNumber ?? 1) * this.executionsNumber }

  constructor(
    d: IProcedureStepDeclaration,
  ) {
    this.key = d.key;
    this.isInitialStep = d.isInitialStep;
    this.nextStep = d.nextStep as ProcedureStep;
    this.nextStepTrigger = d.nextStepTrigger;
    this.executionsNumber = d.executionsNumber as number ?? 1;
  }

  abstract execute(
    a: ProcedureAggregate,
    c: IProcedureContext & any,
    allowEarlyResolve?: boolean
  ): Promise<IProcedureStepResult> | AsyncGenerator<unknown, IProcedureStepResult, IProcedureStepResult>;

  public isResolved(a: ProcedureAggregate): boolean {
    return a.getAggregatedDataForStep(this).length >= this.totalExecutionsNumber;
  }

  public getNextStep(a: ProcedureAggregate): ProcedureStep {
    if (this.nextStepTrigger === ProcedureStepTrigger.AfterAll && !this.isResolved(a)) {
      return this;
    } else {
      return this.nextStep;
    }
  }

  
}