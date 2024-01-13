import { filter, Observable } from "rxjs";
import { Vector2 } from "three";
import { IntersectionProvider } from "../../helpers/intersection-helpers";
import { TasksQueue } from "../../utils/tasks-queue/tasks-queue";
import { IHoverable } from "./hoverable.interface";
import { HoveringTask } from "./hovering.task";

export class HoveringService {
  
  public selections: { [key: symbol]: any } = {};
  public mouseevent$: Observable<MouseEvent>;
  public get currentObject() { return this._hoverTask?.events$ }

  private _hoverTask!: HoveringTask;

  constructor(
    private _tasksQueue: TasksQueue,
    _mouseevent: Observable<MouseEvent>
  ) { 
    this.mouseevent$ = _mouseevent.pipe(filter(e => e.type === 'mousemove'))
  }

  startHoverListener(
    cb: IntersectionProvider
  ): Observable<{ hovered: any, settled: any }> {
    if (this._hoverTask) {
      this.finishHoverListener();
    };

    this._hoverTask = new HoveringTask(
      (v: Vector2) => cb(v).map(i => i.object as unknown as IHoverable),
      this.mouseevent$)
    
    this._tasksQueue.enqueue(this._hoverTask);

    return this._hoverTask.events$
  }

  finishHoverListener(): void {
    this._hoverTask.finish();
    this._hoverTask = null!;
  }
}