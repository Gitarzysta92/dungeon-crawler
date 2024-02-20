import { IDelegateDeclaration } from "../../../base/delegate/delegate.interface";
import { IGatherableData, IGatheredData } from "../../../cross-cutting/gatherer/data-gatherer.interface";
import { IGatheringDataCastingStep } from "./casting-step.interface";
import { CastingStepType } from "../effect.constants";
import { CastingStep } from "./casting-step";

export class GatheringDataCastingStep extends CastingStep implements IGatheringDataCastingStep {
  public id: string;
  public stepType = CastingStepType.GatheringData as const;
  public dataType: string;
  public selectors: IDelegateDeclaration<unknown>[];
  public requireUniqueness: boolean;
  public amount: number;

  public gatheredData: IGatheredData<unknown>[];

  public predecessorRef: GatheringDataCastingStep | undefined;
  public successorRef: GatheringDataCastingStep | undefined;

  constructor(
    data: IGatheringDataCastingStep,
  ) {
    super();
    this.dataType = data.dataType;
    this.selectors = data.selectors;
    this.requireUniqueness = data.requireUniqueness ?? false;
    this.amount = this._calculateAmount(data.payload);
  }


  public getDataToGather(): IGatherableData {
    if (this.successorRef?.gatheredData?.length < this.gatheredData.length) {
      return this.successorRef;
    }
    const data = this.successorRef?.getDataToGather();
    if (data) {
      return data;
    }
    return this;
  }


  public isComplemented(): boolean {
    if (this.successorRef) {
      return this.successorRef.isComplemented() && this.gatheredData.length === this.amount;
    }
    return this.gatheredData.length === this.amount;
  }


  public isPartiallyComplemented(amount?: number): boolean {
    if (amount != null) {
      if (this.successorRef) {
        return this.successorRef.isPartiallyComplemented(this.gatheredData.length) && this.gatheredData.length === amount;
      }
      return this.gatheredData.length === amount;
    }
    return true;
  }


  public aggregate(data: IGatheredData<unknown | unknown[]>): void {
    if (this.amount == null) {
      this.amount = this._calculateAmount(data);
    }

    if (Array.isArray(data.payload)) {
      data.payload.forEach(p => this.gatheredData.push(p));
    } else {
      this.gatheredData.push(data);
    }
  }


  private _calculateAmount(data: unknown | unknown[]): number {
    if (data == null) {
      return;
    }
    if (Array.isArray(data)) {
      return data.length;
    } else {
      return 1
    }
  }
}