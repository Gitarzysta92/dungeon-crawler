import { Injectable } from '@angular/core';
import { LocalStorageService, Store, StoreService } from 'src/app/infrastructure/data-storage/api';
import { firstValueFrom, from, of, switchMap } from 'rxjs';
import { DungeonStateStoreAction, StoreName } from './dungeon-state.store-keys';
import { DungeonGameplay } from '../gameplay/dungeon.gameplay';
import { IGameStore } from '../../game/interfaces/game-store.interface';
import { IDungeonGameplayDeclaration } from '../gameplay/dungeon-gameplay.interface';
import { SECONDARY_GAME_STATE_LOCAL_STORAGE_KEY } from '../../game-persistence/constants/game-persistence.constants';


@Injectable({ providedIn: "root" })
export class DungeonStateStore implements IGameStore {

  public get isInitialized() { return !!this._store }
  public get state$() { return this._store.state };
  public get currentState() { return this._store.currentState; }

  private _store: Store<DungeonGameplay>;
  // private _dispatcher: StateDispatcher<DungeonGameplay> = new StateDispatcher({ context: {} as any });;
  private _gameplayFactory: (g: IDungeonGameplayDeclaration) => Promise<DungeonGameplay>;

  constructor(
    private readonly _storeService: StoreService,
    private readonly _localStorage: LocalStorageService
  ) { }

  public setState(gameplay: DungeonGameplay) {
    this._store.dispatchInline(Symbol("update"), {
      action: () => gameplay
    })
  }

  // public async dispatch(directive: IDispatcherDirective<unknown>): Promise<void> {
  //   await this._store.dispatch(DungeonStateStoreAction.dispatchActivity, directive);
  // }

  public startTransaction() {
    const stateSnapshot = JSON.stringify(this.currentState);
    return async () => this.setState(await this._gameplayFactory(JSON.parse(stateSnapshot)));
  }

  public dispose() {
    this._store.clearState();
    delete this._store;
  }
  
  public async initializeStore(
    dungeon: IDungeonGameplayDeclaration,
    gameplayFactory: (g: IDungeonGameplayDeclaration) => Promise<DungeonGameplay>,
  ): Promise<DungeonGameplay> {
    this._gameplayFactory = gameplayFactory;
   
    if (this._store) {
      this._store.reinitialize(gameplayFactory(dungeon))
    } else {
      this._store = this._storeService.createStore(StoreName.dungeonStateStore, {
        initialState: gameplayFactory(dungeon),
        stateStorage: {
          clear: (key: string) => null,
          createOrUpdate: (_, s: DungeonGameplay) => this._localStorage.createOrUpdate(SECONDARY_GAME_STATE_LOCAL_STORAGE_KEY, s),
          read: () => firstValueFrom(from(this._localStorage.read<IDungeonGameplayDeclaration>(SECONDARY_GAME_STATE_LOCAL_STORAGE_KEY))
            .pipe(switchMap(s => s ? gameplayFactory(s) : of(null))))
        },
        allowStateMutation: true,
        isLazyLoaded: true,
        actions: {
          //[DungeonStateStoreAction.dispatchActivity]: { action: c => this._dispatcher.next(c.payload, c.initialState) },
          [DungeonStateStoreAction.applyState]: { action: c => c.payload }
        }
      });
    }
    return await firstValueFrom(this.state$);
  }



}