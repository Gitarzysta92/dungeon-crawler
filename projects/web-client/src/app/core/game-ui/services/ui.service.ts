import { Injectable } from "@angular/core";
import { Observable, Subject, map, of, race } from "rxjs";
import { IUiMedium } from "../mixins/ui-medium/ui-medium.interface";
import { IActivity } from "@game-logic/lib/base/activity/activity.interface";
import { ICommand } from "../../game/interfaces/command.interface";
import { ModalService } from "./modal.service";
import { ConfirmationModalComponent } from "../components/confirmation-modal/confirmation-modal.component";
import { IDataRequestResult } from "../../game/interfaces/data-request.interface";

@Injectable()
export class UiService {
  
  public hover$: Subject<IUiMedium> = new Subject();
  public inputs$: Subject<IActivity> = new Subject();

  private _selectionProviders: Subject<IUiMedium>[] = [];
  constructor(
    private readonly _modalService: ModalService
  ) { }

  public requestUiMediumSelection<T>(
    predicate: (a: T) => boolean,
  ): Observable<IDataRequestResult<IUiMedium & T>> {
    const revertCb = () => { };
    return race(this._selectionProviders).pipe(map(m => ({ value: m as any, revertCb })))
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
    this._selectionProviders.push(r);
  }


}