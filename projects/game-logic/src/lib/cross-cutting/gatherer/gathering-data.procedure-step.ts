import { ProcedureStep } from "../../base/procedure/procedure-step";
import { ProcedureAggregate } from "../../base/procedure/procedure-aggregate";
import { JsonPathResolver } from "../../infrastructure/extensions/json-path";
import { ResolvableReference } from "../../infrastructure/extensions/types";
import { ISelectorDeclaration } from "../selector/selector.interface";
import { IDistinguishableData, IGatheredData, IGatheringDataProcedureStepDeclaration, IGatheringController } from "./data-gatherer.interface";
import { DataGatheringService } from "./data-gathering.service";
import { IProcedureContext, IProcedureStep, IProcedureStepResult } from "../../base/procedure/procedure.interface";

export class GatheringDataProcedureStep extends ProcedureStep implements IGatheringDataProcedureStepDeclaration {
  
  public isGatheringDataStep = true as const;
  public dataType: string;
  public dataSource?: ResolvableReference<unknown>;
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
    this.dataSource = d.dataSource;
    this.requireUniqueness = d.requireUniqueness;
    this.autogather = d.autogather;
    this.gathererParams = d.gathererParams ?? {};
    this.payload = d.payload;
    Object.defineProperty(this, '_dataGatheringService', {
      value: dataGatheringService,
      enumerable: false
    })
  }

  public async parse(
    a: ProcedureAggregate,
    ctx: IProcedureContext,
  ) {
    const { ectx } = this._createExecutionContext(this, a, ctx);
    const payload = this._parsePayload(this.payload, ectx);
    const gathererParams = this._parseGathererParams(this.gathererParams ?? {}, ectx);
    const dataSource = this._parseDataSource(this.dataSource, ectx);
    const selectors = this._parseSelectors(this.selectors, ectx);
    const allowedData = await this._getAllowedData(selectors, this.dataType, dataSource);
    return {
      ectx,
      payload,
      gathererParams,
      selectors,
      allowedData
    }
  }

  public async execute(
    a: ProcedureAggregate,
    ctx: IProcedureContext & { controller: IGatheringController },
    allowEarlyResolve: boolean
  ): Promise<IProcedureStepResult> {
    if (!("gather" in ctx.controller)) {
      throw new Error("Provided controller is not a gathering handler")
    }
    // Build execution context
    const { procedureSteps, ...data } = ctx.data as any;
    const executionContext = Object.assign(a.createExecutionContext(this), data);
    Object.assign(executionContext, { gathererParams: this._parseGathererParams(this.gathererParams, executionContext) });

    // Resolve early if payload is provided
    if (!!this.payload) {
      const payload = this._parsePayload(this.payload, executionContext);
      this._aggregate(a, payload);
      return this._createResult(true);
    }

    // Get allowed data to gather
    let selectors = Array.isArray(this.selectors) ? this._parseSelectors(this.selectors, executionContext) : [];
    let allowedData = await this._getAllowedData(selectors, this.dataType, this._parseDataSource(this.dataSource, executionContext));
    if (this.requireUniqueness) {
      allowedData = this._getNonRepetitiveData(allowedData, a.getAggregatedDataForStep<IGatheredData<IDistinguishableData>>(this));
    }

    // Calculate how many times current step has to be executed
    if (JsonPathResolver.isResolvableReference(this.executionsNumber)) {
      this.executionsNumber = JsonPathResolver.resolveInline(this.executionsNumber as ResolvableReference<number>, executionContext)
    }
    if (!this.executionsNumber) {
      this.executionsNumber = allowedData.length;
    }

    // Try gather data automatically
    if (this.autogather) {
      if (!allowedData[0]) {
        throw new Error("Cannot find allowed item for authogather")
      }
      this._aggregate(a, allowedData[0]);
      return this._createResult(true);
    }

    // Gather data
    const gatheredData = await ctx.controller.gather({
      dataType: this.dataType,
      allowedData: allowedData,
      gathererParams: executionContext.gathererParams,
      steps: Object.values(a.getCurrentPass(this)), 
      executionContext: executionContext,
      selectors: selectors,
      allowEarlyResolve: allowEarlyResolve
    });
    a.aggregate(this, gatheredData);

    return this._createResult(gatheredData.isDataGathered);
  }


  private _createResult(v: boolean): IProcedureStepResult {
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
    if (typeof a === 'object' && 'id' in a && typeof b === 'object' && 'id' in b) {
      return a.id === b.id;
    } else
      return a === b;
  }

  private _createExecutionContext(
    p: IProcedureStep,
    a: ProcedureAggregate,
    ctx: IProcedureContext,
  ) {
    const { procedureSteps, ...data } = ctx.data as any;
    return {
      ectx: Object.assign(a.createExecutionContext(p), data),
      steps: procedureSteps
    }
  }


  private _parsePayload(payload: ResolvableReference<unknown> | IDistinguishableData, ectx: unknown): IDistinguishableData | undefined {
    if (JsonPathResolver.isResolvableReference(payload)) {
      return JsonPathResolver.resolveInline(payload, ectx);
    } else {
      return payload as IDistinguishableData;
    }
  }


  private _parseGathererParams(
    gathererParams: { [key: string]: ResolvableReference<number>; },
    ectx: unknown
  ): { [key: string]: number; } | undefined { 
    if (!gathererParams) {
      throw new Error("ParseError: gathererParams are not provided");
    }
    gathererParams =  JSON.parse(JSON.stringify(gathererParams))
    JsonPathResolver.resolve(gathererParams, ectx);
    return gathererParams as { [key: string]: number; };
  }
  

  private _parseSelectors(
    selectors: ISelectorDeclaration<unknown>[],
    ectx: unknown,
  ): ISelectorDeclaration<unknown>[] | undefined { 
    if (!Array.isArray(selectors)) {
      throw new Error("ParseError: selectors are not provided");
    }
    selectors =  JSON.parse(JSON.stringify(selectors));
    for (let selector of selectors) {
      JsonPathResolver.resolve(selector, ectx, true);
    }
    return selectors;
  }

  private _parseDataSource(dataSource: ResolvableReference<unknown>, ectx: unknown): unknown | undefined {
    if (JsonPathResolver.isResolvableReference(dataSource)) {
      return JsonPathResolver.resolveInline(dataSource, ectx)
    }
  }


  public async _getAllowedData(selectors: ISelectorDeclaration<unknown>[], dataType: string, dataSource?: unknown): Promise<IDistinguishableData[]> { 
    const dataProvider = this._dataGatheringService.getGatherableDataProvider(dataType);
    if (!dataProvider) {
      throw new Error(`Cannot find data provider for type: ${dataType}`);
    }
    return dataProvider.getData(selectors, dataSource);
  }

}