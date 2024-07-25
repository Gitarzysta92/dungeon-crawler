import { Injectable } from "@angular/core";
import { Observable, Subject, filter, map, of, race, take } from "rxjs";
import { IUiMedium } from "../mixins/ui-medium/ui-medium.interface";
import { IActivity } from "@game-logic/lib/base/activity/activity.interface";
import { ICommand } from "../../game/interfaces/command.interface";
import { ModalService } from "./modal.service";
import { ConfirmationModalComponent } from "../components/confirmation-modal/confirmation-modal.component";

@Injectable()
export class UiInteractionService {
  
  public confirmationRequired: boolean = false;

  public hover$: Subject<IUiMedium> = new Subject();
  public inputs$: Subject<IActivity> = new Subject();

  private _selectionProviders: Subject<IUiMedium>[] = [];

  constructor(
    private readonly _modalService: ModalService
  ) { }

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


  public requestAcknowledgement(data: any) {

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