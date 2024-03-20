import { IGatherableData, IGatheredData, IGatheringHandler, IGatheringRequestor } from "./data-gatherer.interface";

export class DataGatheringTask {

  public get isFinished() {
    return this._gatheringRequestor.isSatisfied() ||
    this._gatheringRequestor.isPartiallySatisfied() && this._finishedEarly
  };
  private _onFinishCb: Array<() => void> = [];
  private _reverts = [];
  private _finishedEarly: boolean = false;

  constructor(
    private readonly _gatheringRequestor: IGatheringRequestor,
    private readonly _handlers: IGatheringHandler<unknown>[]
  ) { }
  
  public async startGathering(): Promise<void> {
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

    this._onFinishCb.forEach(cb => cb());
  }

  public onFinish(cb: () => void): void {
    this._onFinishCb.push(cb);
  }

  private async gather(data: IGatherableData, prev: IGatheredData<unknown>[]): Promise<IGatheredData<unknown>> {
    const handler = this._handlers.find(h => h.dataType === data.dataType);
    return handler.gather({ data, prev });
  }
}