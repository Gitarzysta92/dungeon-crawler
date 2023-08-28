import { connectable, fromEvent, merge, Observable, Subject } from "rxjs";
import { Vector2 } from "three";
import { IntersectionProvider } from "../../helpers/intersection-helpers";
import { TasksQueue } from "../../internals/tasks/tasks-queue";
import { Hoverable } from "./hoverable";


import { HoverTask } from "./hover.task";

export class HoverDispatcher {
  
  public selections: { [key: symbol]: any } = {};
  public mouseevent$: any;
  public get currentObject() { return this._hoverTask?.events$ }

  private _hoverTask!: HoverTask;

  constructor(
    private _tasksQueue: TasksQueue
  ) { 
    const events = merge(fromEvent<MouseEvent>(window, 'mousemove'));
    this.mouseevent$ = connectable(events, { connector: () => new Subject() });
    this.mouseevent$.connect();
  }

  startHoverListener(
    cb: IntersectionProvider
  ): Observable<{ hovered: any, settled: any }> {
    if (this._hoverTask) {
      this.finishHoverListener();
    };

    this._hoverTask = new HoverTask(
      (v: Vector2) => cb(v).map(i => i.object as unknown as Hoverable),
      this.mouseevent$)
    
    this._tasksQueue.enqueue(this._hoverTask);

    return this._hoverTask.events$
  }

  finishHoverListener(): void {
    this._hoverTask.finish();
    this._hoverTask = null!;
  }
}