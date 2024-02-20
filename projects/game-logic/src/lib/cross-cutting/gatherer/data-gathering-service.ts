import { IGatheringHandler, IGatheringRequestor } from './data-gatherer.interface';
import { DataGatheringTask } from './data-gathering-task';


export class DataGatheringService {

  private _queue: DataGatheringTask[];
  private _handlers: IGatheringHandler<unknown>[] = [];

  private _processedTask: DataGatheringTask | undefined;

  public register(handler: IGatheringHandler<unknown>) {
    this._handlers.push(handler);
  }

  public gatherDataFor(gr: IGatheringRequestor): DataGatheringTask {
    const task = new DataGatheringTask(gr, this._handlers);
    this._enqueue(task);
    return task;
  }

  private _enqueue(task: DataGatheringTask): void {
    this._queue.push(task);
    task.onFinish(() => this._processTask());
    this._processTask();
  }

  private _processTask() {
    if (this._processedTask) {
      return;
    }
    this._processedTask = this._queue.pop();
    this._processedTask.startGathering();
  }
}