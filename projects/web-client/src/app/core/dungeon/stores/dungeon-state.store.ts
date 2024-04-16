import { Injectable } from '@angular/core';
import { IStoreConfig, LocalStorageService, StoreService } from 'src/app/infrastructure/data-store/api';
import { firstValueFrom, from, switchMap } from 'rxjs';
import { DungeonStateStoreAction, StoreName } from './dungeon-state.store-keys';
import { IDispatcherDirective } from '@game-logic/lib/base/state/state.interface';
import { StateDispatcher } from "@game-logic/lib/base/state/state-dispatcher";
import { IDungeonGameplayStateDto } from '@game-logic/gameplay/state/dungeon/dungeon-gameplay.interface';
import { TransactionalStoreService } from '../../commons/services/transactional-store.service';
import { IStateStoreTransaction } from '../../commons/interfaces/state-store-transaction.interface';
import { DungeonGameplay } from '../state/dungeon.gameplay';

@Injectable()
export class DungeonStateStore extends TransactionalStoreService<DungeonGameplay> {
  setState(gameplay: Promise<DungeonGameplay>) {
    throw new Error('Method not implemented.');
  }

  private _dispatcher: StateDispatcher<DungeonGameplay> = new StateDispatcher({ context: {} as any });;
  private _gameplayFactory: (g: IDungeonGameplayStateDto) => Promise<DungeonGameplay>;

  constructor(
    private readonly _storeService: StoreService,
    private readonly _localStorage: LocalStorageService
  ) { 
    super(_storeService)
  }

  public async dispatch(directive: IDispatcherDirective<unknown>): Promise<void> {
    await this.store.dispatch(DungeonStateStoreAction.dispatchActivity, directive);
  }

  
  public async initializeStore(
    gameplayFactory: (g: IDungeonGameplayStateDto) => Promise<DungeonGameplay>,
  ): Promise<DungeonGameplay> {
    this._gameplayFactory = gameplayFactory;
    return this.setStore(
      this._storeService.createStore<DungeonGameplay>(StoreName.dungeonStateStore,
        this._createStoreConfiguration(this._dispatcher, gameplayFactory)));
  }


  public async initializeTransaction(
    stateDto?: IDungeonGameplayStateDto,
  ): Promise<IStateStoreTransaction<DungeonGameplay>> {
    return this.setTransactionStore(
      this._storeService.createStore<DungeonGameplay>(StoreName.dungeonStateTransactionStore,
        this._createTransactionStoreConfiguration(this._dispatcher, this.currentState.toJSON() || stateDto, this._gameplayFactory)));
  }


  private _createStoreConfiguration(
    dispatcher: StateDispatcher<DungeonGameplay>,
    gameplayFactory: (g: IDungeonGameplayStateDto) => Promise<DungeonGameplay>
  ): IStoreConfig<DungeonGameplay> {
    return {
      stateStorage: {
        clear: (key: string) => this._localStorage.clear(key),
        createOrUpdate: (key: string, s: DungeonGameplay) => this._localStorage.createOrUpdate(key, s),
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
    dispatcher: StateDispatcher<DungeonGameplay>,
    stateDto: IDungeonGameplayStateDto,
    gameplayFactory: (g: IDungeonGameplayStateDto) => Promise<DungeonGameplay>
  ): IStoreConfig<DungeonGameplay> {
    return {
      initialState: gameplayFactory(stateDto),
      allowStateMutation: true,
      actions: {
        [DungeonStateStoreAction.dispatchActivity]: { action: c => dispatcher.next(c.payload, c.initialState) }
      }
    }
  }
}