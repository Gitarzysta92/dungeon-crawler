import { ProcedureStep } from "../../base/procedure/procedure-step";
import { ProcedureAggregate } from "../../base/procedure/procedure-aggregate";
import { JsonPathResolver } from "../../infrastructure/extensions/json-path";
import { Guid, ResolvableReference } from "../../infrastructure/extensions/types";
import { ISelectorDeclaration } from "../selector/selector.interface";
import { IGatheredData, IGatheringDataProcedureStepDeclaration, IGatheringHandler } from "./data-gatherer.interface";
import { AutoGatherMode } from "./data-gathering.constants";
import { ProcedureStepTrigger } from "../../base/procedure/procedure.constants";
import { SelectorService } from "../selector/selector.service";
import { DataGatheringService } from "./data-gathering-service";

export class GatheringDataProcedureStep extends ProcedureStep implements IGatheringDataProcedureStepDeclaration {
  
  isGatheringDataStep = true as const;
  dataType: string;
  selectors?: ISelectorDeclaration<unknown>[];
  requireUniqueness?: boolean;
  amount?: ResolvableReference<number>;
  autogather?: { mode: AutoGatherMode; amount?: number; };
  gathererParams?: { [key: string]: ResolvableReference<number>; };
  payload?: unknown;
  
  private _isAuthogathered: boolean = false;

  constructor(
    d: IGatheringDataProcedureStepDeclaration,
    private readonly _selectorService: SelectorService,
    private readonly _dataGatheringService: DataGatheringService
  ) {
    super(d, d.key);
  }


  public async perform(a: ProcedureAggregate, p: IGatheringHandler): Promise<ProcedureStep> {
    const ctx = a.createExecutionContext(this);

    if (!!this.payload) {
      JsonPathResolver.resolve(this.payload, ctx);
      a.aggregate<IGatheredData<unknown>>(this, this._createGatheredData(this.payload));
      return this.getNextStep(a);
    }

    if (JsonPathResolver.isResolvableReference(this.amount)) {
      JsonPathResolver.resolve(this.amount, ctx);
    }

    if (!!this.gathererParams) {
      JsonPathResolver.resolve(this.gathererParams, ctx);
    }

    if (Array.isArray(this.selectors)) {
      for (let selector of this.selectors) {
        JsonPathResolver.resolve(selector, ctx);
      }
    }
    const dataProvider = this._dataGatheringService.getGatherableDataProvider(this.dataType);
    let allowedData = dataProvider.process(this.selectors);

    if (this.autogather?.mode === AutoGatherMode.Specified) {
      allowedData = allowedData.slice(0, this.autogather.amount);
    }

    if (this.requireUniqueness) {
      allowedData = this._forceUniqueness(allowedData, a.getAggregatedDataForStep<IGatheredData<unknown>>(this));
    }

    if (!!this.autogather) {
      if (Array.isArray(allowedData)) {
        allowedData.forEach(d => a.aggregate<IGatheredData<unknown>>(this, this._createGatheredData(allowedData)));
      } else {
        a.aggregate<IGatheredData<unknown>>(this, this._createGatheredData(allowedData))
      }
      this._isAuthogathered = true;
      return this.getNextStep(a);
    }

    const gatheredData = await p.gather({
      dataType: this.dataType,
      allowedData: allowedData,
      gathererParams: this.gathererParams,
      prev: a.getCurrentPass<IGatheredData<unknown>>(this),
      context: p.context
    });

    a.aggregate(this, gatheredData);
    return this.getNextStep(a);
  }


  public isResolved(a: ProcedureAggregate): boolean {
    const aggregatedData = a.getAggregatedDataForStep(this);
    return (typeof this.amount === 'number' && this.amount < aggregatedData.length) || this._isAuthogathered
  }

  public isResolvedPartially(a: ProcedureAggregate): boolean {
    throw new Error("Method not implemented.");
  }


  public getNextStep(a: ProcedureAggregate): ProcedureStep {
    const aggregatedData = a.getAggregatedDataForStep(this);
    if (typeof this.amount === 'number' && this.amount < aggregatedData.length && this.nextStepTrigger === ProcedureStepTrigger.AfterAll) {
      return this;
    }

    return this.nextStep;
  }


  private _createGatheredData(payload: unknown): IGatheredData<unknown> {
    return {} as IGatheredData<unknown>;
  }


  private _forceUniqueness(payload: unknown, context: IGatheredData<unknown>[]): unknown | undefined {
    if (Array.isArray(payload)) {
      const uniquePayload = [];
      for (const p of payload) {
        let foundInContext = false;
        for (const ctx of context) {
          if (Array.isArray(ctx.payload)) {
            foundInContext = ctx.payload.some(a => this._comparePayloadItem(a, p));
          } else {
            foundInContext = this._comparePayloadItem(ctx.payload, p);
          }
          if (!foundInContext) {
            uniquePayload.push(p);
          }  
        }
      }
      return uniquePayload;
    }

    for (const ctx of context) {
      if (Array.isArray(ctx.payload) && ctx.payload.some(a => this._comparePayloadItem(a, payload))) {
        return;
      }
      if (this._comparePayloadItem(ctx.payload, payload)) {
        return;
      }  
    }

    return payload;
  }

  private _comparePayloadItem(a: { id?: Guid }, b: { id?: Guid }): boolean {
    if (a.id && b.id) {
      return a.id === b.id;
    } else
      return a === b;
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