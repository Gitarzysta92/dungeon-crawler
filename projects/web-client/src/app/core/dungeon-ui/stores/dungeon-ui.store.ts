import { Injectable, OnDestroy } from '@angular/core';
import { Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { IDungeonUiState } from '../interfaces/dungeon-ui-state';
import { mapDungeonStateToUiState } from '../mappings/dungeon-ui-mappings';
import { DataFeedService } from '../../data-feed/services/data-feed.service';
import { ISpellOrAbilityDataFeedEntity } from '../../data-feed/interfaces/data-feed-effect-entity.interface';
import { DungeonStateStore } from '../../dungeon-logic/stores/dungeon-state.store';
import { Subject, takeUntil } from 'rxjs';


export const dungeonUiStore = Symbol('dungeon-ui-store');

@Injectable()
export class DungeonUiStore implements OnDestroy {

  public get state$() { return this._store.state };
  public get currentState() { return this._store.currentState; };

  private _store: Store<IDungeonUiState>;
  private _updateStore = Symbol("update-ui-store");
  private _synchronizeDungeonStateKey = Symbol("synchronizeDungeonStateKey")

  private _onDestroy: Subject<void> = new Subject();

  constructor(
    private readonly _storeService: StoreService,
    private readonly _dataFeedService: DataFeedService
  ) { }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }

  public updateState(state: Partial<IDungeonUiState>): void {
    this._store.dispatch(this._updateStore, state);
  }

  public async initializeStore(dungeonStore: DungeonStateStore, data: ISpellOrAbilityDataFeedEntity[]): Promise<void> {
    this._store = this._storeService.createStore<IDungeonUiState>(dungeonUiStore, {
      initialState: mapDungeonStateToUiState(dungeonStore.currentState, data),
      actions: { 
        [this._updateStore]: {
          action: (ctx) => this._updateState(ctx.payload, ctx.initialState),
        }
      } 
    });

    dungeonStore.state
      .pipe(takeUntil(this._onDestroy))
      .subscribe(s => this._store.dispatch(this._synchronizeDungeonStateKey,
        { dungeonState: s, board: data.visualScene.board }))
  }

  private _updateState(payload: any, state: IDungeonUiState): IDungeonUiState {
    const newState: IDungeonUiState = Object.assign(state, payload);
    return newState;
  }

  private _synchronizeDungeonState(payload: { dungeonState: DungeonState, board: IBoardDeclaration }): IDungeonSceneState {
    return 
  }
  
}