import { Injectable } from '@angular/core';
import { LocalStorageService, Store, StoreService } from 'src/app/infrastructure/data-storage/api';
import { firstValueFrom, from, switchMap } from 'rxjs';
import { AdventureGameplayState } from '../state/adventure-gameplay.state';
import { IDispatcherDirective } from '@game-logic/lib/base/state/state.interface';
import { AdventureStateStoreAction, StoreName } from './adventure-state.store-keys';
import { IAdventureGameplayStateDto } from '@game-logic/gameplay/state/adventure/adventure-gameplay.interface';
import { StateDispatcher } from '@game-logic/lib/base/state/state-dispatcher';


@Injectable()
export class AdventureStateStore {
  private _gameplayFactory: (g: IAdventureGameplayStateDto) => Promise<AdventureGameplayState>;

  public get isInitialized() { return !!this._store }
  public get state() { return this._store.state };
  public get currentState() { return this._store.currentState; }

  private _store: Store<AdventureGameplayState>;
  private _dispatcher: StateDispatcher<AdventureGameplayState> = new StateDispatcher({ context: {} as any });;

  constructor(
    private readonly _storeService: StoreService,
    private readonly _localStorage: LocalStorageService
  ) { }

  public setState(gameplay: IAdventureGameplayStateDto) {
    this._store.dispatchInline(Symbol("update"), {
      action: () => this._gameplayFactory(gameplay)
    })
  }

  public dispatch(activity: IDispatcherDirective<unknown>): Promise<void> {
    return this._store.dispatch(AdventureStateStoreAction.dispatchActivityKey, activity);
  }

  public async initializeStore(
    gameplayFactory: (g: IAdventureGameplayStateDto) => Promise<AdventureGameplayState>
  ): Promise<AdventureGameplayState> {
    this._gameplayFactory = gameplayFactory;
    this._store = this._storeService.createStore<AdventureGameplayState>(StoreName.adventureStateStore, {
      stateStorage: {
        clear: (key: string) => this._localStorage.clear(key),
        createOrUpdate: (key: string, s: AdventureGameplayState) => this._localStorage.createOrUpdate(key, s),
        read: (key: string) => firstValueFrom(from(this._localStorage.read<AdventureGameplayState>(key)).pipe(switchMap(s => gameplayFactory(s))))
      },
      allowStateMutation: true,
      actions: {
        [AdventureStateStoreAction.dispatchActivityKey]: { action: c => this._dispatcher.next(c.payload, c.initialState) }
      }
    });
    return await firstValueFrom(this.state);
  }
}