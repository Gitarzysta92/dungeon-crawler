import { CdkDrag, CdkDragDrop } from "@angular/cdk/drag-drop";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { IDragging } from "../interfaces/dragging.interface";

@Injectable()
export class DragService {

  public isPerformingDrag: boolean = false;

  private _draggingStarted: Subject<IDragging<unknown>> = new Subject();
  private _draggingFinished: Subject<IDragging<unknown>> = new Subject();

  constructor() { }
  
  public listenForDraggingProcess<T>() {
    return this._draggingStarted as Subject<IDragging<T>>
  }

  public listenForDraggingProcessFinished<T>() {
    return this._draggingFinished as Subject<IDragging<T>>
  }


  startDraggingProcess(e: { source: CdkDrag, event: MouseEvent }) {
    this._draggingStarted.next({
      from: e.source.data
    })
    this.isPerformingDrag = true;
  }

  interruptDraggingProcess(e: { source: CdkDrag, event: MouseEvent }) {
    this._draggingFinished.next({
      from: e.source.data
    })
    this.isPerformingDrag = false
  }

  finishDraggingProcess(e: CdkDragDrop<any>) {
    this._draggingFinished.next({
      to: e.container.data,
      from: e.item.data
    })
    this.isPerformingDrag = false;
  }
}