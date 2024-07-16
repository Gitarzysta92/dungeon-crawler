import { Observable, Subject, takeUntil } from "rxjs";
import { Vector2 } from "three";
import { getNormalizedCoordinates } from "../../utils/utils";
import { IHoverable } from "./hoverable.interface";
import { IContinousTask } from "../../utils/tasks-queue/tasks-queue.interface";

export class HoveringTask implements IContinousTask {
  public events$: Subject<any> = new Subject();
  public continue: boolean = true;
  private _prevHovered!: IHoverable;

  private _intersectionProvider: (v: Vector2) => IHoverable[];
  private destroy$ = new Subject<void>();
  mouseCoords: Vector2 = new Vector2();
  mouseX!: number;
  mouseY!: number;
  eventPayload: {
    hovered: any;
    settled: any;
  } = {} as any;

  constructor(
    intersectionProvider: (v: Vector2) => IHoverable[],
    mouseevent$: Observable<MouseEvent>
  ) {
    this._intersectionProvider = intersectionProvider;

    mouseevent$
      .pipe(takeUntil(this.destroy$))
      .subscribe(e => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
      });
  }
  initialize!: () => void;

  public perform = () => {
    const hovered = this._intersectionProvider(
      getNormalizedCoordinates(this.mouseX, this.mouseY, this.mouseCoords))[0];
    
    if (this._prevHovered === hovered) {
      return;
    }

    if (!!hovered) {
      hovered.hover();
      document.body.style.cursor = "pointer";
      this.eventPayload.hovered = hovered;
    } else {
      document.body.style.cursor = "auto";
      this.eventPayload.hovered = undefined;
    }

    if (!!this._prevHovered) {
      this._prevHovered?.settle();
    }

    this.eventPayload.settled = this._prevHovered;
    this.events$.next(this.eventPayload);
    this._prevHovered = hovered;
  };


  public finish(): void {
    this.continue = false;
    this.destroy$.next();
  }
}
