import { Injectable, Injector } from "@angular/core";
import { BehaviorSubject, Observable, Subject, filter, firstValueFrom, of, race } from "rxjs";
import { IUiMedium } from "../mixins/ui-medium/ui-medium.interface";
import { IActivity } from "@game-logic/lib/base/activity/activity.interface";
import { ICommand } from "../../game/interfaces/command.interface";
import { ModalService } from "./modal.service";
import { ConfirmationModalComponent } from "../components/confirmation-modal/confirmation-modal.component";
import { OverlayPositionBuilder } from "@angular/cdk/overlay";

@Injectable()
export class UiInteractionService {

  public confirmationRequired: boolean = false;

  private _selectionProviders: Subject<IUiMedium>[] = [];
  public pointerOrigin: { x: number; y: number; };

  public pointer$: BehaviorSubject<{ x: number, y: number } | null> = new BehaviorSubject(null)

  constructor(
    private readonly _modalService: ModalService,
    private readonly _injector: Injector,
    private readonly _positionBuilder: OverlayPositionBuilder,
  ) { }

  public setPointerOrigin(bb: { x: number; y: number; }) {
    this.pointerOrigin = { x: bb.x, y: bb.y }
  }

  public showPointer() {
    this.pointer$.next(this.pointerOrigin);
    return () => this.pointer$.next(null);
  }
  

  public requestUiMediumSelection<T>(predicate: (a: T) => boolean): Observable<IUiMedium & T> {
    return race(this._selectionProviders)
      .pipe(filter(m => predicate(m as T))) as Observable<IUiMedium & T>
  }

  public requestCommandSelection(a: ICommand[]): Observable<ICommand> {
    return of(a[0])
  }

  public requestConfirmation<T>(x?: any): Observable<boolean> {
    return this._modalService.createConfirmationPanel(ConfirmationModalComponent)
  }


  public requestAcknowledgement(component: any, data: any) {
    return firstValueFrom(this._modalService.createConfirmationPanel(component, data, this._injector, this._positionBuilder.global().centerHorizontally().centerVertically()))
  }

  public registerSelectionProvider(r: Subject<IUiMedium>): void {
    const i = this._selectionProviders.indexOf(r);
    if (i >= 0) {
      return;
    }
    this._selectionProviders.push(r);
  }

  public unregisterSelectionProvider(r: Subject<IUiMedium>): void {
    const i = this._selectionProviders.indexOf(r);
    this._selectionProviders.splice(i, 1);
  }

}