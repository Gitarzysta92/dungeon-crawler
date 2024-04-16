import { IGatherableData, IGatheredData, IGatheringHandler, IGatheringRequestor } from "./data-gatherer.interface";

export class DataGatheringTask {

  public get isFinished() {
    return this._gatheringRequestor.isSatisfied() ||
    this._gatheringRequestor.isPartiallySatisfied() && this._finishedEarly
  };

  private _reverts = [];
  private _finishedEarly: boolean = false;
  private _onFinishCbs: Array<() => void> = [];
  private _onBeforeDataGathered: Array<() => void> = [];
  private _onAfterDataGathered: Array<() => void> = [];

  constructor(
    private readonly _gatheringRequestor: IGatheringRequestor,
    private readonly _handlers: IGatheringHandler<unknown>[],
    private readonly _eqcb: (t) => void
  ) { }
  
  public async gatherData(): Promise<void> {
    this._eqcb(this);
    while (!this.isFinished) {
      const { data, prev } = this._gatheringRequestor.getGatherableData();
      const result = await this.gather(data, prev);

      if (result.revertCb) {
        this._reverts.push(result.revertCb);
      }

      if (result.gatheringTerminated && !this._gatheringRequestor.isPartiallySatisfied()) {
        this._reverts.forEach(rc => rc && rc());
      } else if (result.gatheringTerminated)
        this._finishedEarly = true;
      else {
        this._gatheringRequestor.takeData(data, result);
      }
    }

    this._onFinishCbs.forEach(cb => cb());
  }

  public onFinish(cb: () => void): void {
    this._onFinishCbs.push(cb);
  }

  public onBeforeDataGathered(cb: () => Promise<void>): void {
    this._onBeforeDataGathered.push(cb);
  }

  public onAfterDataGathered(cb: () => Promise<void>): void {
    this._onAfterDataGathered.push(cb);
  }
 
  private async gather(data: IGatherableData, prev: IGatheredData<unknown>[]): Promise<IGatheredData<unknown>> {
    const handler = this._handlers.find(h => h.dataType === data.dataType);
    return handler.gather({ data, prev });
  }
}