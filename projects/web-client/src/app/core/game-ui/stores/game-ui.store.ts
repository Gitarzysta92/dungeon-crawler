import { Injectable, OnDestroy } from '@angular/core';
import { Store, StoreService } from 'src/app/infrastructure/data-storage/api';
import { Subject, firstValueFrom } from 'rxjs';
import { IGameUiState } from '../interfaces/game-ui-state.interface';
import { IAuxiliaryView } from '../interfaces/auxiliary-view.interface';

@Injectable({ providedIn: "root" })
export class GameUiStore implements OnDestroy {
  public get state$() { return this._store.state };
  public get currentState() { return this._store.currentState; };
  public get store() { return this._store }

  private _store: Store<IGameUiState>;
  private _onDestroy: Subject<void> = new Subject();

  constructor(
    private readonly _storeService: StoreService
  ) { }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }

  public deselectAuxiliaryView(
    av: IAuxiliaryView
  ) {
    return this._store.dispatchInline(Symbol("deselect-auxiliary-view"), {
      action: (ctx) => {
        const x = ctx.initialState.auxiliaryViews.find(a => a.component === av.component);
        if (x) {
          x.isActive = false;
        }
        return ctx.initialState;
      }
    });
  }

  public selectAuxiliaryView(
    av: IAuxiliaryView
  ) {
    return this._store.dispatchInline(Symbol("select-auxiliary-view"), {
      action: (ctx) => {
        ctx.initialState.auxiliaryViews.filter(a => a.layerId === av.layerId).forEach(a => {
          if (a === av) {
            a.isActive = true;
          } else {
            a.isActive = false;
          }
        })
        return ctx.initialState;
      }
    });
  }

  public setAxiliaryViews(
    avs: IAuxiliaryView[]
  ) {
    return this._store.dispatchInline(Symbol("set-auxiliary-views"), {
      action: (ctx) => {
        Object.assign(ctx.initialState, { auxiliaryViews: avs });
        return ctx.initialStata;
      }
    });
  }

  public dispose() {
    this._store.clearState();
  }

  public async initializeStore(initialState: IGameUiState): Promise<IGameUiState> {
    this._store = this._storeService.createStore<IGameUiState>(Symbol("game-ui-store"), {
      initialState: initialState,
      allowStateMutation: true
    })
    return await firstValueFrom(this.state$);
  }
  

}