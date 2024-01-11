import { Vector2, Vector3 } from "three";
import { Observable, Subject } from "rxjs";
import { DragTask } from "./drag.task";
import { intersectMouseCoordsOnScenePlane, CoordsProvider } from "../../helpers/coords-helpers";
import { TasksQueue } from "../../utils/tasks-queue/tasks-queue";
import { IDraggable } from "./draggable.interface";
import { PointerHandler } from "../../interactions/pointer/pointer-handler";
import { SceneWrapper } from "../../core/scene-wrapper";

export class DragDispatcher {
  
  public position: Subject<Vector3> = new Subject()
  public get currentObject() { return this._dragTask?.object }

  private _dragTask!: DragTask<any> | null;

  constructor(
    private _view: SceneWrapper,
    private _tasksQueue: TasksQueue,
    private _pointerHandler: PointerHandler,
    public pointerevent$: Observable<PointerEvent>
  ) { }

  startDragging<T extends IDraggable>(
    object: T,
    cb?: typeof intersectMouseCoordsOnScenePlane | (() => CoordsProvider)
  ): Observable<{ mouseCoords: Vector2, sceneCoords: Vector3, targetObject: any }> {
    if (!!this._dragTask) return this._dragTask.events$;

    this._view.disableFloatingCamera();

    const v = new Vector3(0, 0, 0);
    const intersect = (v: Vector2) => this._pointerHandler.intersect(v).filter((x: any) => x.object);
    const coordsProvider = !!cb ? cb(v, intersect) : intersectMouseCoordsOnScenePlane(v, intersect);

    this._dragTask = new DragTask<T>(object, coordsProvider, this.pointerevent$);
    this._tasksQueue.enqueue(this._dragTask);
    return this._dragTask.events$
  }

  stopDragging() {
    this._dragTask?.finish();
    this._dragTask = null;
    this._view.enableFloatingCamera();
  }

  onDraggingStopped(arg0: () => void) {
    throw new Error('Method not implemented.');
  }
}


