import { ProcedureAggregate } from "../../../lib/base/procedure/procedure-aggregate";
import { ProcedureStep } from "../../../lib/base/procedure/procedure-step";
import { ProcedureExecutionPhase } from "../../../lib/base/procedure/procedure.constants";
import { IProcedure, IProcedureContext, IProcedurePerformer, IProcedureStepDeclaration, IProcedureStepPerformanceResult } from "../../../lib/base/procedure/procedure.interface";
import { JsonPathResolver } from "../../../lib/infrastructure/extensions/json-path";
import { ResolvableReference } from "../../../lib/infrastructure/extensions/types";

export class ProcedureTestStepMock extends ProcedureStep {
  earlyResolveWhenPossible: boolean;

  constructor(d: IProcedureStepDeclaration & { earlyResolveWhenPossible?: boolean }) {
    super(d);
    this.nextStep = d.nextStep as ProcedureStep;
    this.earlyResolveWhenPossible = d.earlyResolveWhenPossible;
  }

  execute = jest.fn<Promise<IProcedureStepPerformanceResult>, [ProcedureAggregate, IProcedureContext, boolean]>()
    .mockImplementation(async (a, ctx, allowEarlyResolve) => {
      if (allowEarlyResolve && this.earlyResolveWhenPossible && a.passes.length > 0) {
        return { continueExecution: await ctx.performer.listenForEarlyResolve(false) }
      }

      ctx = Object.assign(a.createExecutionContext(this), ctx);
      if (JsonPathResolver.isResolvableReference(this.executionsNumber)) {
        this.executionsNumber = JsonPathResolver.resolveInline(this.executionsNumber as ResolvableReference<number>, ctx)
      }
      a.aggregate(this, createTestData(this))
      return { continueExecution: true }
    });
  
  isResolved = jest.fn<boolean, [ProcedureAggregate]>().mockImplementation(a => super.isResolved(a));
  getNextStep = jest.fn<ProcedureStep, [ProcedureAggregate]>().mockImplementation(a => super.getNextStep(a));
}



export class ProcedureTestRecursiveStepMock extends ProcedureStep {
  earlyResolveWhenPossible: boolean;
  constructor(
    d: IProcedureStepDeclaration & { procedure: ResolvableReference<IProcedure>, earlyResolveWhenPossible?: boolean },
  ) {
    super(d);
    this.nextStep = d.nextStep as ProcedureStep;
    this.earlyResolveWhenPossible = d.earlyResolveWhenPossible;
  }

  execute = jest.fn<Promise<IProcedureStepPerformanceResult>, [ProcedureAggregate, IProcedureContext, boolean]>()
    .mockImplementation(async (a, ctx, allowEarlyResolve) => {
      if (allowEarlyResolve && this.earlyResolveWhenPossible && a.passes.length > 0) {
        return { continueExecution: await ctx.performer.listenForEarlyResolve(false) }
      }

      ctx = Object.assign(a.createExecutionContext(this), ctx);
      if (JsonPathResolver.isResolvableReference(this.procedure)) {
        this.procedure = JsonPathResolver.resolveInline(this.procedure as ResolvableReference<IProcedure>, ctx);
      }

      if (JsonPathResolver.isResolvableReference(this.executionsNumber)) {
        this.executionsNumber = JsonPathResolver.resolveInline(this.executionsNumber as ResolvableReference<number>, ctx)
      }

      return { continueExecution: true }
    });
  
  isResolved = jest.fn<boolean, [ProcedureAggregate]>().mockImplementation(a => super.isResolved(a));
  getNextStep = jest.fn<ProcedureStep, [ProcedureAggregate]>().mockImplementation(a => super.getNextStep(a));
}



export class ProcedurePerformerMock implements IProcedurePerformer {
  listenForEarlyResolve = jest.fn<Promise<boolean>, [boolean]>().mockImplementation(c => new Promise((r) => r(c)));
}



export interface Eo {
  passId?: number;
  phaseType: ProcedureExecutionPhase;
  key: string;
  childs: Eo[]
} 


export class ExecutionOrderProvider {

  private _aggregatedData: { [key: string]: { key: string } }[] = [];
  private _flattenedExecutionOrder: Eo[] = [];

  constructor(
    private readonly _d: { testMetadata: { numberOfPasses: number, executionOrder: Eo[] } }
  ) { 
    this._flattenedExecutionOrder = this._createExecutionOrderd(this._d.testMetadata.executionOrder);
    this._aggregatedData = this._createAggregatedData(this._d.testMetadata.executionOrder);
  }

  public next(): { type: ProcedureExecutionPhase, stepKey: string, aggregatedData: { [key: string]: { key: string } }[] } {
    const step = this._flattenedExecutionOrder.shift();
    return {
      type: step.phaseType,
      stepKey: step.key,
      aggregatedData: this._aggregatedData
    }
  }

  private _createExecutionOrderd(items: Eo[]): Eo[] {
    return items.flatMap(i => i.childs ? [i, ...this._createExecutionOrderd(i.childs)] : [i])
  }

  private _createAggregatedData(items: Eo[]): any {
    const d = [];
    for (let item of items) {
      if (item.passId === undefined || !item.key) {
        continue;
      }
      let aggregatedItem = d[item.passId - 1];
      if (!aggregatedItem) {
        aggregatedItem = {}
        d.push(aggregatedItem);
      }

      if (Array.isArray(item.childs)) {
        aggregatedItem[item.key] = this._createAggregatedData(item.childs);
      } else {
        aggregatedItem[item.key] = createTestData(item)
      }
    }
    return d;
  }
  
}






export function createTestData(s: { key: string }): { key: string } {
  return { key: s.key }
}


export function compareAggregatedData(a: any[], b: any[]): void {
  a.forEach((pa, i) => {
    const pb = b[i];
    for (let key in pa) {
      if (Array.isArray(pa[key])) {
        expect(Array.isArray(pb[key])).toBeTruthy()
        compareAggregatedData(pa[key], pb[key])
      } else {
        expect(pa[key].key).toBe(pb[key].key)
      }
    }

  })
}