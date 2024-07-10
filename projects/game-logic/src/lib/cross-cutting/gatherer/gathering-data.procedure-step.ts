import { ProcedureStep } from "../../base/procedure/procedure-step";
import { ProcedureAggregate } from "../../base/procedure/procedure-aggregate";
import { JsonPathResolver } from "../../infrastructure/extensions/json-path";
import { ResolvableReference } from "../../infrastructure/extensions/types";
import { ISelectorDeclaration } from "../selector/selector.interface";
import { IDistinguishableData, IGatheredData, IGatheringDataProcedureStepDeclaration, IGatheringController } from "./data-gatherer.interface";
import { DataGatheringService } from "./data-gathering.service";
import { IProcedureContext, IProcedureStepPerformanceResult } from "../../base/procedure/procedure.interface";

export class GatheringDataProcedureStep extends ProcedureStep implements IGatheringDataProcedureStepDeclaration {
  
  public isGatheringDataStep = true as const;
  public dataType: string;
  public selectors?: ISelectorDeclaration<unknown>[];
  public requireUniqueness?: boolean;
  public autogather?: boolean;
  public gathererParams?: { [key: string]: ResolvableReference<number>; };
  public payload?: ResolvableReference<IDistinguishableData>;
  private _dataGatheringService: DataGatheringService
  constructor(
    d: IGatheringDataProcedureStepDeclaration,
    dataGatheringService: DataGatheringService
  ) {
    super(d);
    this.selectors = d.selectors;
    this.dataType = d.dataType;
    this.requireUniqueness = d.requireUniqueness;
    this.autogather = d.autogather;
    this.gathererParams = d.gathererParams;
    this.payload = d.payload;
    Object.defineProperty(this, '_dataGatheringService', {
      value: dataGatheringService,
      enumerable: false
    })
  }


  public async execute(
    a: ProcedureAggregate,
    ctx: IProcedureContext & { controller: IGatheringController },
    allowEarlyResolve: boolean
  ): Promise<IProcedureStepPerformanceResult> {
    if (!("gather" in ctx.controller)) {
      throw new Error("Gathering handler")
    }

    ctx = Object.assign(a.createExecutionContext(this), ctx);

    if (!!this.payload) {
      if (JsonPathResolver.isResolvableReference(this.payload)) {
        this._aggregate(a, JsonPathResolver.resolveInline(this.payload, ctx));
      } else {
        this._aggregate(a, this.payload as IDistinguishableData);
      }
      return this._createResult(true);
    }

    if (JsonPathResolver.isResolvableReference(this.executionsNumber)) {
      this.executionsNumber = JsonPathResolver.resolveInline(this.executionsNumber as ResolvableReference<number>, ctx)
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
    if (dataProvider) {
      throw new Error(`Cannot find data provider for type: ${this.dataType}`);
    }
    let allowedData = await dataProvider.getData(this.selectors);

    if (this.requireUniqueness) {
      allowedData = this._getNonRepetitiveData(allowedData, a.getAggregatedDataForStep<IGatheredData<IDistinguishableData>>(this));
    }

    if (!this.executionsNumber) {
      this.executionsNumber = allowedData.length;
    }

    if (this.autogather) {
      if (!allowedData[0]) {
        throw new Error("Cannot find allowed item for authogather")
      }
      this._aggregate(a, allowedData[0]);
      return this._createResult(true);
    }

    let gatheredData: IGatheredData<IDistinguishableData> | boolean = null;

    const gather = () => ctx.controller.gather({
      dataType: this.dataType,
      allowedData: allowedData,
      gathererParams: this.gathererParams,
      prev: a.getCurrentPass(this) as unknown as { [step: string]: IGatheredData<IDistinguishableData>; },
      context: ctx
    });

    if (allowEarlyResolve) {
      gatheredData = await Promise.race([gather(), ctx.controller.listenForEarlyResolve(true)])
    } else {
      gatheredData = await gather();
    }

    if (typeof gatheredData === 'object' && 'value' in gatheredData) {
      a.aggregate(this, gatheredData);
      return this._createResult(true);
    } else {
      return this._createResult(gatheredData);
    }
  }


  private _createResult(v: boolean): IProcedureStepPerformanceResult {
    return { continueExecution: v }
  }


  private _aggregate(a: ProcedureAggregate, v: IDistinguishableData): void {
    a.aggregate<IGatheredData<IDistinguishableData>>(this, this._createGatheredData(v));
  }


  private _createGatheredData(v: IDistinguishableData | IGatheredData<IDistinguishableData>): IGatheredData<IDistinguishableData> {
    if (typeof v === 'object' && 'isGatheredData' in v) {
      return v as unknown as IGatheredData<IDistinguishableData>;
    }
    return { isDataGathered: true, value: v as IDistinguishableData };
  }


  private _getNonRepetitiveData(data: IDistinguishableData[], aggregated: IGatheredData<IDistinguishableData>[]) {
    return data.filter(d => !aggregated.some(a => this._compareData(a.value, d)))
  }

  private _compareData(
    a: IDistinguishableData,
    b: IDistinguishableData
  ): boolean {
    if (a.id && b.id) {
      return a.id === b.id;
    } else
      return a === b;
  }

}