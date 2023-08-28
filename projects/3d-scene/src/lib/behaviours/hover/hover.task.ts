import { Observable, Subject, takeUntil } from "rxjs";
import { Vector2 } from "three";
import { ContinousTask } from "../../internals/tasks/tasks-queue";
import { getNormalizedMouseCoordinates2 } from "../../utils/utils";
import { Hoverable } from "./hoverable";

export class HoverTask implements ContinousTask {
  public events$: Subject<any> = new Subject();
  public continue: boolean = true;
  private _prevHovered!: Hoverable;

  private _intersectionProvider: (v: Vector2) => Hoverable[];
  private destroy$ = new Subject<void>();
  mouseCoords: Vector2 = new Vector2();
  mouseX!: number;
  mouseY!: number;
  eventPayload: {
    hovered: any;
    settled: any;
  } = {} as any;

  constructor(
    intersectionProvider: (v: Vector2) => Hoverable[],
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

  public perform = () => {
    const hovered = this._intersectionProvider(
      getNormalizedMouseCoordinates2(this.mouseX, this.mouseY, this.mouseCoords))[0];

    if (this._prevHovered === hovered) {
      return;
    }

    if (!!hovered) {
      hovered.hovered();
      document.body.style.cursor = "pointer";
      this.eventPayload.hovered = hovered;
      hovered.isHovered = true;
    } else {
      document.body.style.cursor = "auto";
      this.eventPayload.hovered = undefined;
    }

    if (!!this._prevHovered) {
      this._prevHovered?.settled();
      this._prevHovered.isHovered = false;
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
