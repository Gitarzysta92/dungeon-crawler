import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IGameUiState } from '../interfaces/game-ui-state.interface';
import { IAuxiliaryView } from '../interfaces/auxiliary-view.interface';


@Injectable({ providedIn: "root" })
export class GameUiStore implements OnDestroy {
  public get isInitialized() { return !!this._state }
  public get state$() { return this._state };
  public get currentState() { return this._state.value; }

  private _state: BehaviorSubject<IGameUiState> | undefined;
  private _onDestroy: Subject<void> = new Subject();


  ngOnDestroy(): void {
    this._onDestroy.next();
  }

  public deselectAuxiliaryView(
    av: IAuxiliaryView
  ) {
    const x = this._state.value.auxiliaryViews.find(a => a.component === av.component);
    if (x) {
      x.isActive = false;
    }
    this._state.next(this._state.value);
  }

  public selectAuxiliaryView(
    av: IAuxiliaryView
  ) {
    this._state.value.auxiliaryViews.filter(a => a.layerId === av.layerId).forEach(a => {
      if (a === av) {
        a.isActive = true;
      } else {
        a.isActive = false;
      }
    })
    this._state.next(this._state.value);
  }

  public setAxiliaryViews(
    avs: IAuxiliaryView[]
  ) {
    Object.assign(this._state.value, { auxiliaryViews: avs });
    this._state.next(this._state.value);
  }



  public initializeStore(state: IGameUiState): void  {
    if (this._state) {
      this._state.complete();
    }

    this._state = new BehaviorSubject(state)
  }
  

}