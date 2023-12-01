import { OverlayRef } from "@angular/cdk/overlay";
import { InjectionToken } from "@angular/core";
import { Subject, Observable } from "rxjs";

export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');

export class DialogRef {
  
  private afterClosedSubject = new Subject<any>();

  constructor(
    public overlayRef: OverlayRef,
    private _closeCb: () => void
  ) { }

  public close(result?: any) {
    this._closeCb();
    this.afterClosedSubject.next(result);
    this.afterClosedSubject.complete();
  }

  public afterClosed(): Observable<any> {
    return this.afterClosedSubject.asObservable();
  }
}