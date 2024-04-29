import { Injectable } from '@angular/core';
import { LocalStorageService, Store, StoreService } from 'src/app/infrastructure/data-storage/api';
import { firstValueFrom, from, switchMap } from 'rxjs';
import { AdventureGameplay } from '../state/adventure.gameplay';
import { IDispatcherDirective } from '@game-logic/lib/base/state/state.interface';
import { AdventureStateStoreAction, StoreName } from './adventure-state.store-keys';
import { IAdventureGameplayStateDto } from '@game-logic/gameplay/state/adventure/adventure-gameplay.interface';
import { StateDispatcher } from '@game-logic/lib/base/state/state-dispatcher';


@Injectable()
export class AdventureStateStore {

  public get state() { return this._state.state };
  public get currentState() { return this._state.currentState; }

  private _state: Store<AdventureGameplay>;
  private _dispatcher: StateDispatcher<AdventureGameplay> = new StateDispatcher({ context: {} as any });;

  constructor(
    private readonly _store: StoreService,
    private readonly _localStorage: LocalStorageService
  ) { }

public async dispatch(activity: IDispatcherDirective<unknown>): Promise<void> {
    await this._state.dispatch(AdventureStateStoreAction.dispatchActivityKey, activity);
  }

  public async initializeStore(
    gameplayFactory: (g: IAdventureGameplayStateDto) => Promise<AdventureGameplay>
  ): Promise<AdventureGameplay> {
    if (this._state) {
      return;
    }
    this._state = this._store.createStore<AdventureGameplay>(StoreName.adventureStateStore, {
      stateStorage: {
        clear: (key: string) => this._localStorage.clear(key),
        createOrUpdate: (key: string, s: AdventureGameplay) => this._localStorage.createOrUpdate(key, s),
        read: (key: string) => firstValueFrom(from(this._localStorage.read<AdventureGameplay>(key)).pipe(switchMap(s => gameplayFactory(s))))
      },
      allowStateMutation: true,
      actions: {
        [AdventureStateStoreAction.dispatchActivityKey]: { action: c => this._dispatcher.next(c.payload, c.initialState) }
      }
    });
    return await firstValueFrom(this.state);
  }
}