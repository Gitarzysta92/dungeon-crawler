import { NonUndefined } from "../../infrastructure/extensions/types";
import { ProcedureStep } from "./procedure-step";
import { IAggregatedData, IProcedureStep } from "./procedure.interface";


export class ProcedureAggregate {

  public get passes() { return this._passes as ReadonlyArray<ProcedureAggregatePass> }

  private _passes: ProcedureAggregatePass[] = [];
 
  constructor() { }

  public aggregate<T>(step: IProcedureStep, value: NonUndefined) {
    let currentPass = this.getCurrentPass(step);
    if (!currentPass) {
      throw new Error("Cannot find pass during aggregation attempt.");
    }
    currentPass.aggregate(step.key, value);
  }


  public getAggregationState(): IAggregatedData[] {
    return this._passes.map(p => Object.assign({}, p) as unknown as IAggregatedData)
  }


  public createExecutionContext(step: IProcedureStep) {
    return { procedureSteps: this.getCurrentPass(step) ?? {} };
  }


  public getCurrentPass(step: IProcedureStep): ProcedureAggregatePass | undefined {
    return this._passes.find(p => !p.hasAggregated(step.key)) ?? this._createPass(step);
  }


  public getAggregatedDataForStep<T>(step: IProcedureStep): T[] {
    return this._passes.reduce((acc, p) => p.hasAggregated(step.key) ? [...acc, p.getData(step.key)] : acc ,[]);
  }


  public isDataEvenlyDistributed(steps: ProcedureStep[]): boolean {
    return this._passes.every(p => steps.every(s => p.hasAggregated(s.key)));
  }


  private _createPass(step: IProcedureStep): ProcedureAggregatePass {
    const pass = new ProcedureAggregatePass();
    this._passes.push(pass);
    if (!step.isInitialStep) {
      const prevPass = this._passes[this._passes.indexOf(pass) - 1];
      if (prevPass) {
        this._copyData(pass, prevPass, step);
      }
    }
    return pass;
  }


  private _copyData(toPass: ProcedureAggregatePass, formPass: ProcedureAggregatePass, step: IProcedureStep): void {
    const prevSteps = this._getPreviousSteps(step);
    if (formPass && prevSteps) {
      for (let ps of prevSteps) {
        toPass.copy(formPass, ps.key);
      }
    }
  }


  private _getPreviousSteps(step: IProcedureStep): IProcedureStep[] {
    const steps = [];
    while (step) {
      if (step.prevStep) {
        steps.push(step.prevStep);
        step = step.prevStep;
      } else {
        break;
      }
    }
    return steps;
  }
}


export class ProcedureAggregatePass {
  
  public hasAggregated(key: string): boolean {
    return key in this;
  }

  public getData(key: string): NonUndefined {
    return this[key];
  }

  public aggregate(key: string, v: NonUndefined) {
    if (v === undefined) {
      throw new Error("Cannot aggregate undefined value");
    }

    if (v instanceof ProcedureAggregate) {
      Object.defineProperty(this, key, { get: () => v.getAggregationState(), enumerable: true })
    } else {
      this[key] = v;
    }
  }

  public copy(pass: ProcedureAggregatePass, key: string): void {
    if (!(key in pass)) {
      throw new Error("Given key not exits in provided pass")
    }
    this[key] = pass[key];
  }
}