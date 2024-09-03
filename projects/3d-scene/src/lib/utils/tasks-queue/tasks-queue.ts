import { IContinousTask, ITask } from "./tasks-queue.interface";

export class TasksQueue {

  private _queue: Map<ITask, ITask> = new Map();

  private readonly _t = true;
  private readonly _f = false;
  private _performingTasks: boolean = this._f;

  constructor() {}

  public enqueue(task: ITask): void  {
    task.initialize();
    this._queue.set(task, task);
  }

  public perform(s: { time: number, deltaT: number }): void {
    if (this._performingTasks) {
      throw new Error("Previus tasks are not finished")
    }
    this._performingTasks = this._t;

    for (let task of this._queue.values()) {
      task.perform(s);
      if (task.hasOwnProperty("continue") && (task as IContinousTask).continue) {
        continue;
      } 
      this._queue.delete(task);
    }
    
    this._performingTasks = this._f;
  }
}