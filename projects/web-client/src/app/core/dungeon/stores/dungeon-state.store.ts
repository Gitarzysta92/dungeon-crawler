import { Injectable } from '@angular/core';
import { IStoreConfig, LocalStorageService, StoreService } from 'src/app/infrastructure/data-storage/api';
import { firstValueFrom, from, switchMap } from 'rxjs';
import { DungeonStateStoreAction, StoreName } from './dungeon-state.store-keys';

import { TransactionalStoreService } from '../../commons/services/transactional-store.service';
import { IStateStoreTransaction } from '../../commons/interfaces/state-store-transaction.interface';
import { IDungeonStateDeclaration } from '@game-logic/gameplay/modules/dungeon/mixins/dungeon-state/dungeon-state.interface';
import { IDungeonGameplayState } from '../interfaces/dungeon-gameplay-state.interface';
import { StateDispatcher } from '@game-logic/helpers/dispatcher/state-dispatcher';
import { IDispatcherDirective } from '@game-logic/helpers/dispatcher/state.interface';


@Injectable()
export class DungeonStateStore extends TransactionalStoreService<IDungeonGameplayState> {

  private _dispatcher: StateDispatcher<IDungeonGameplayState> = new StateDispatcher({ context: {} as any });;
  private _gameplayFactory: (g: IDungeonStateDeclaration) => Promise<IDungeonGameplayState>;

  constructor(
    private readonly _storeService: StoreService,
    private readonly _localStorage: LocalStorageService
  ) { 
    super(_storeService)
  }

  public async dispatch(directive: IDispatcherDirective<unknown>): Promise<void> {
    await this.store.dispatch(DungeonStateStoreAction.dispatchActivity, directive);
  }

  public setState(gameplay:IDungeonStateDeclaration) {
    this.store.dispatchInline(Symbol("update"), {
      action: () => this._gameplayFactory(gameplay)
    })
  }
  
  public async initializeStore(
    gameplayFactory: (g: IDungeonStateDeclaration) => Promise<IDungeonGameplayState>,
  ): Promise<IDungeonGameplayState> {
    this._gameplayFactory = gameplayFactory;
    return this.setStore(
      this._storeService.createStore<IDungeonGameplayState>(StoreName.dungeonStateStore,
        this._createStoreConfiguration(this._dispatcher, gameplayFactory)));
  }


  public async initializeTransaction(
    stateDto?: IDungeonStateDeclaration & any,
  ): Promise<IStateStoreTransaction<IDungeonGameplayState>> {
    return this.setTransactionStore(
      this._storeService.createStore<IDungeonGameplayState>(StoreName.dungeonStateTransactionStore,
        this._createTransactionStoreConfiguration(this._dispatcher, this.currentState.toJSON() || stateDto, this._gameplayFactory)));
  }


  private _createStoreConfiguration(
    dispatcher: StateDispatcher<IDungeonGameplayState>,
    gameplayFactory: (g: IDungeonStateDeclaration) => Promise<IDungeonGameplayState>
  ): IStoreConfig<IDungeonGameplayState> {
    return {
      stateStorage: {
        clear: (key: string) => this._localStorage.clear(key),
        createOrUpdate: (key: string, s: IDungeonGameplayState) => this._localStorage.createOrUpdate(key, s),
        read: (key: string) => firstValueFrom(from(this._localStorage.read<IDungeonStateDeclaration>(key)).pipe(switchMap(s => gameplayFactory(s))))
      },
      allowStateMutation: true,
      isLazyLoaded: true,
      actions: {
        [DungeonStateStoreAction.dispatchActivity]: { action: c => dispatcher.next(c.payload, c.initialState) },
        [DungeonStateStoreAction.applyState]: { action: c => c.payload }
      }
    }
  }


  private _createTransactionStoreConfiguration(
    dispatcher: StateDispatcher<IDungeonGameplayState>,
    stateDto: IDungeonStateDeclaration,
    gameplayFactory: (g: IDungeonStateDeclaration) => Promise<IDungeonGameplayState>
  ): IStoreConfig<IDungeonGameplayState> {
    return {
      initialState: gameplayFactory(stateDto),
      allowStateMutation: true,
      actions: {
        [DungeonStateStoreAction.dispatchActivity]: { action: c => dispatcher.next(c.payload, c.initialState) }
      }
    }
  }
}