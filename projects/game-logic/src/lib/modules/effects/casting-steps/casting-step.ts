import { ICastingStepBase } from "./casting-step.interface";

export abstract class CastingStep implements ICastingStepBase {
  public id: string;
  
  public predecessorRef: CastingStep | undefined;
  public successorRef: CastingStep | undefined;

  public order?: number;

  public isIndependent(): boolean {
    return !this.predecessorRef && !this.successorRef;
  }

  public isFirstStep(): boolean {
    return this.successorRef && !this.predecessorRef;
  }
}