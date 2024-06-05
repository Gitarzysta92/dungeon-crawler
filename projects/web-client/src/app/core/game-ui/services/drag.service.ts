import { CdkDrag } from "@angular/cdk/drag-drop";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { IDragging } from "../interfaces/dragging.interface";

@Injectable()
export class DragService {

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
      data: e.source.data
    })
  }

  interruptDraggingProcess(e: { source: CdkDrag, event: MouseEvent }) {
    this._draggingFinished.next({
      data: e.source.data
    })
  }

  finishDraggingProcess(e: any) {

  }
}