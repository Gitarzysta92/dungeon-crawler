export class GatheringDataProcedureStep extends ProcedureStep implements IGatheringDataProcedureStepDeclaration {
  
  isGatheringDataStep: true;
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
    key: string,
    private readonly _selectorService: SelectorService,
    private readonly _dataGatheringService: DataGatheringService
  ) {
    super(d, key);
  }


  public async perform(a: ProcedureAggregate, p: IGatheringHandler): Promise<ProcedureStep> {
    return this.getNextStep(a);
  }


  public isResolved(a: ProcedureAggregate): boolean {
  }

  public isResolvedPartially(a: ProcedureAggregate): boolean {
  }


  public getNextStep(a: ProcedureAggregate): ProcedureStep {
  }


  private _createGatheredData(payload: unknown): IGatheredData<unknown> {
    return {} as IGatheredData<unknown>;
  }
}