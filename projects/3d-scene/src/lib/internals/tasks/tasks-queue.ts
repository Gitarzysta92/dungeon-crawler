export interface BasicTask {
  perform: Function
}

export interface ContinousTask extends BasicTask {
  continue: boolean;
}

export type Task = ContinousTask | BasicTask;


export class TasksQueue {

  private _queue: Task[];

  constructor() {
    this._queue = [];
  }

  public enqueue(task: Task): void  {
    this._queue.push(task);
    //console.log(this._queue)
  }

  public perform(): void {
    const task = this._queue.shift();
    if (!task)
      return;

    task.perform();

    if (task.hasOwnProperty("continue") && (task as ContinousTask).continue) {
      this.enqueue(task);
    }
    //console.log(this._queue);
  }
}