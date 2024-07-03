import { Injectable } from "@angular/core";
import { Observable, Subject, of } from "rxjs";
import { IUiMedium } from "../mixins/ui-medium/ui-medium.interface";
import { IActivity } from "@game-logic/lib/base/activity/activity.interface";
import { ICommand } from "../../game/interfaces/command.interface";
import { ModalService } from "./modal.service";
import { ConfirmationModalComponent } from "../components/confirmation-modal/confirmation-modal.component";

@Injectable()
export class UiService {

  public hover$: Subject<IUiMedium> = new Subject();
  public inputs$: Subject<IActivity> = new Subject();

  constructor(
    private readonly _modalService: ModalService
  ) { }

  public requestUiMediumSelection<T>(): Observable<IUiMedium & T> {
    return this.inputs$
      .pipe(
        
    ) as any
  }

  public requestCommandSelection(a: ICommand[]): Observable<ICommand> {
    return of(a[0])
  }

  public requestConfirmation<T>(x?: any): Observable<boolean> {
    return this._modalService.createConfirmationPanel(ConfirmationModalComponent)
  }

}