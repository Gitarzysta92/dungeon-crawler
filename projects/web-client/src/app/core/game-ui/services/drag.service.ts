import { CdkDrag, CdkDragDrop, CdkDropList } from "@angular/cdk/drag-drop";
import { ElementRef, Injectable } from "@angular/core";
import { Observable, Subject, concat, map, take, takeUntil } from "rxjs";
import { IDragging } from "../interfaces/dragging.interface";

@Injectable()
export class DragService {

  public isPerformingDrag: boolean = false;

  private _draggingStarted: Subject<IDragging<unknown>> = new Subject();
  private _draggingFinished: Subject<IDragging<unknown>> = new Subject();

  private _dropLists: Map<string, CdkDropList> = new Map();
  private _dropListRegistered: Subject<void> = new Subject();

  constructor() { }

  public listenForDraggingProcessV2<T>() {
    return concat(this._draggingStarted.pipe(take(1)), this._draggingFinished.pipe(take(1)))
  }
      
  public listenForDraggingProcess<T>() {
    return this._draggingStarted as Subject<IDragging<T>>
  }

  public listenForDraggingProcessFinished<T>() {
    return this._draggingFinished as Subject<IDragging<T>>
  }

  public startDraggingProcess(e: { source: CdkDrag, event: MouseEvent }) {
    this._draggingStarted.next({
      from: e.source.data
    })
    this.isPerformingDrag = true;
  }

  public interruptDraggingProcess(e: { source: CdkDrag, event: MouseEvent } & any) {
    this._draggingFinished.next({
      from: e.source.data
    })
    this.isPerformingDrag = false
  }

  public finishDraggingProcess(e: CdkDragDrop<any>) {
    this._draggingFinished.next({
      to: e.container.data,
      from: e.item.data
    })
    this.isPerformingDrag = false;
  }

  public registerDropList(dropList: CdkDropList) {
    this._dropLists.set(dropList.id, dropList);
    this._dropListRegistered.next();
  }

  public getDropLists(cb: (l: CdkDropList) => void): Observable<CdkDropList[]> {
    return this._dropListRegistered.pipe(map(() => Array.from(this._dropLists.values()).filter(cb)))
  }

}