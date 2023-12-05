import { OverlayRef } from "@angular/cdk/overlay";
import { InjectionToken } from "@angular/core";
import { Subject, Observable } from "rxjs";

export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');

export class DialogRef {
  
  public afterClosed$ = new Subject<any>();

  constructor(
    public overlayRef: OverlayRef,
    private _closeCb: () => void
  ) {}

  public close(result?: any) {
    this.afterClosed$.next(result);
    this.afterClosed$.complete();
    this._closeCb();
  }
}