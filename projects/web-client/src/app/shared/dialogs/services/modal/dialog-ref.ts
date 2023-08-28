import { OverlayRef } from "@angular/cdk/overlay";
import { InjectionToken } from "@angular/core";
import { Subject, Observable } from "rxjs";

export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');

export class DialogRef {
  private afterClosedSubject = new Subject<any>();

  constructor(private overlayRef: OverlayRef) { }

  public close(result?: any) {
    this.overlayRef.dispose();
    this.afterClosedSubject.next(result);
    this.afterClosedSubject.complete();
  }

  public afterClosed(): Observable<any> {
    return this.afterClosedSubject.asObservable();
  }
}