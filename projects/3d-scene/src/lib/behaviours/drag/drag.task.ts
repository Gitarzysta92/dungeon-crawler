import { Vector2, Vector3 } from "three";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Draggable } from "./draggable";
import { CoordsProvider } from "../../helpers/coords-helpers";
import { ContinousTask } from "../../internals/tasks/tasks-queue";

export class DragTask<T extends Draggable> implements ContinousTask {

  public events$: Subject<any> = new Subject();
  public continue: boolean = true;
  public object: T;

  private _coordsProvider: CoordsProvider;
  private destroy$ = new Subject<void>();
  private _dragData = {
    mouseCoords: new Vector2(),
    sceneCoords: new Vector3(),
    targetObject: null
  };

  constructor(
    object: T,
    coordsProvider: CoordsProvider,
    mouseevent$: Observable<PointerEvent>
  ) {
    this.object = object;
    this._coordsProvider = coordsProvider;

    mouseevent$
      .pipe(takeUntil(this.destroy$))
      .subscribe(e => {
        this._dragData.mouseCoords.x = e.clientX;
        this._dragData.mouseCoords.y = e.clientY;
      });
  }

  public perform = () => {
    const result = this._coordsProvider(
      this._dragData.mouseCoords.x,
      this._dragData.mouseCoords.y
    );
    if (!result?.coords)
      return;
    this._dragData.sceneCoords = result.coords;
    this._dragData.targetObject = result.targetObject;
    this.object.setCoords(this._dragData.sceneCoords);
    this.events$.next(this._dragData);
  };


  public finish(): void {
    this.continue = false;
    this.destroy$.next();
  }
}
