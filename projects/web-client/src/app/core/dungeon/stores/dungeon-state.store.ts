import { Injectable } from '@angular/core';
import { IStoreConfig, LocalStorageService, StoreService } from 'src/app/infrastructure/data-storage/api';
import { firstValueFrom, from, switchMap } from 'rxjs';
import { DungeonStateStoreAction, StoreName } from './dungeon-state.store-keys';
import { IDispatcherDirective } from '@game-logic/lib/base/state/state.interface';
import { StateDispatcher } from "@game-logic/lib/base/state/state-dispatcher";
import { IDungeonGameplayStateDto } from '@game-logic/gameplay/state/dungeon/dungeon-gameplay.interface';
import { TransactionalStoreService } from '../../commons/services/transactional-store.service';
import { IStateStoreTransaction } from '../../commons/interfaces/state-store-transaction.interface';
import { DungeonGameplayState } from '../state/dungeon-gameplay.state';

@Injectable()
export class DungeonStateStore extends TransactionalStoreService<DungeonGameplayState> {

  private _dispatcher: StateDispatcher<DungeonGameplayState> = new StateDispatcher({ context: {} as any });;
  private _gameplayFactory: (g: IDungeonGameplayStateDto) => Promise<DungeonGameplayState>;

  constructor(
    private readonly _storeService: StoreService,
    private readonly _localStorage: LocalStorageService
  ) { 
    super(_storeService)
  }

  public async dispatch(directive: IDispatcherDirective<unknown>): Promise<void> {
    await this.store.dispatch(DungeonStateStoreAction.dispatchActivity, directive);
  }

  public setState(gameplay:IDungeonGameplayStateDto) {
    this.store.dispatchInline(Symbol("update"), {
      action: () => this._gameplayFactory(gameplay)
    })
  }
  
  public async initializeStore(
    gameplayFactory: (g: IDungeonGameplayStateDto) => Promise<DungeonGameplayState>,
  ): Promise<DungeonGameplayState> {
    this._gameplayFactory = gameplayFactory;
    return this.setStore(
      this._storeService.createStore<DungeonGameplayState>(StoreName.dungeonStateStore,
        this._createStoreConfiguration(this._dispatcher, gameplayFactory)));
  }


  public async initializeTransaction(
    stateDto?: IDungeonGameplayStateDto,
  ): Promise<IStateStoreTransaction<DungeonGameplayState>> {
    return this.setTransactionStore(
      this._storeService.createStore<DungeonGameplayState>(StoreName.dungeonStateTransactionStore,
        this._createTransactionStoreConfiguration(this._dispatcher, this.currentState.toJSON() || stateDto, this._gameplayFactory)));
  }


  private _createStoreConfiguration(
    dispatcher: StateDispatcher<DungeonGameplayState>,
    gameplayFactory: (g: IDungeonGameplayStateDto) => Promise<DungeonGameplayState>
  ): IStoreConfig<DungeonGameplayState> {
    return {
      stateStorage: {
        clear: (key: string) => this._localStorage.clear(key),
        createOrUpdate: (key: string, s: DungeonGameplayState) => this._localStorage.createOrUpdate(key, s),
        read: (key: string) => firstValueFrom(from(this._localStorage.read<IDungeonGameplayStateDto>(key)).pipe(switchMap(s => gameplayFactory(s))))
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
    dispatcher: StateDispatcher<DungeonGameplayState>,
    stateDto: IDungeonGameplayStateDto,
    gameplayFactory: (g: IDungeonGameplayStateDto) => Promise<DungeonGameplayState>
  ): IStoreConfig<DungeonGameplayState> {
    return {
      initialState: gameplayFactory(stateDto),
      allowStateMutation: true,
      actions: {
        [DungeonStateStoreAction.dispatchActivity]: { action: c => dispatcher.next(c.payload, c.initialState) }
      }
    }
  }
}