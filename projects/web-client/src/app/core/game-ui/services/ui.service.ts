import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IUiMedium } from "../mixins/ui-medium/ui-medium.interface";
import { IActivity } from "@game-logic/lib/base/activity/activity.interface";

@Injectable()
export class UiService {

  public hover$: Subject<IUiMedium> = new Subject();

  public inputs$: Subject<IActivity> = new Subject();

  public listenForSelections<T>(): Observable<IUiMedium & T> {
    return this.inputs$
      .pipe(
        
      ) as any
  }


}