import { Injectable } from '@angular/core';
import { LocalStorageService, Store, StoreService } from 'src/app/infrastructure/data-storage/api';
import { firstValueFrom, from, switchMap, tap } from 'rxjs';
import { AdventureStateStoreAction, StoreName } from './adventure-state.store-keys';
import { IAdventureStateDeclaration } from '@game-logic/gameplay/modules/adventure/mixins/adventure-state/adventure-state.interface';
import { IAdventureGameplayState } from '../interfaces/adventure-gameplay-state.interface';
import { PRIMARY_GAME_STATE_LOCAL_STORAGE_KEY } from '../../game-persistence/constants/game-persistence.constants';
import { IDispatcherDirective } from '@game-logic/helpers/dispatcher/state.interface';
import { StateDispatcher } from "@game-logic/helpers/dispatcher/state-dispatcher";
import { IGameStore } from '../../game/interfaces/game-store.interface';


@Injectable({ providedIn: "root" })
export class AdventureStateStore implements IGameStore {


  public get isInitialized() { return !!this._store }
  public get state$() { return this._store.state };
  public get currentState() { return this._store.currentState; }

  private _store: Store<IAdventureGameplayState>;
  private _dispatcher: StateDispatcher<IAdventureGameplayState> = new StateDispatcher({ context: {} as any });
  private _gameplayFactory: (g: IAdventureStateDeclaration) => Promise<IAdventureGameplayState>;

  constructor(
    private readonly _storeService: StoreService,
    private readonly _localStorage: LocalStorageService
  ) { }

  public setState(gameplay: IAdventureStateDeclaration) {
    this._store.dispatchInline(Symbol("update"), {
      action: () => gameplay
    })
  }

  public dispatch(activity: IDispatcherDirective<unknown>): Promise<void> {
    return this._store.dispatch(AdventureStateStoreAction.dispatchActivityKey, activity);
  }

  public startTransaction() {
    const stateSnapshot = JSON.stringify(this.currentState);
    return async () => this.setState(await this._gameplayFactory(JSON.parse(stateSnapshot)));
  }

  public dispose() {
    this._store.clearState();
  }

  public async initializeStore(
    adventure: IAdventureStateDeclaration,
    gameplayFactory: (g: IAdventureStateDeclaration) => Promise<IAdventureGameplayState>
  ): Promise<IAdventureGameplayState> {
    this._gameplayFactory = gameplayFactory;

    if (this._store) {
      this._store.reinitialize(await gameplayFactory(adventure))
    } else {
      this._store = this._storeService.createStore<IAdventureGameplayState>(StoreName.adventureStateStore, {
        initialState: await gameplayFactory(adventure),
        stateStorage: {
          clear: () => null,
          createOrUpdate: (_, s: IAdventureGameplayState) => this._localStorage.createOrUpdate(PRIMARY_GAME_STATE_LOCAL_STORAGE_KEY, s),
          read: () => firstValueFrom(from(this._localStorage.read<IAdventureGameplayState>(PRIMARY_GAME_STATE_LOCAL_STORAGE_KEY)).pipe(switchMap(s => from(gameplayFactory(s)))))
        },
        allowStateMutation: true,
        actions: {
          [AdventureStateStoreAction.dispatchActivityKey]: { action: c => this._dispatcher.next(c.payload, c.initialState) }
        }
      });
    }
    return await firstValueFrom(this.state$);
  }

}