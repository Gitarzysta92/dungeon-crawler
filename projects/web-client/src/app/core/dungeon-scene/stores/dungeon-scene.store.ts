import { Injectable, OnDestroy } from '@angular/core';
import { Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { IDungeonSceneState, ISceneToken } from '../interfaces/dungeon-scene-state';
import { mapDungeonBoardToSceneState } from '../mappings/dungeon-scene-mappings';
import { DataFeedService } from '../../data-feed/services/data-feed.service';
import { DungeonStateStore } from '../../dungeon-logic/stores/dungeon-state.store';
import { Subject, takeUntil } from 'rxjs';
import { DungeonState } from '@game-logic/lib/states/dungeon-state';
import { SceneService } from '../services/scene.service';
import { DungeonInteractionStore } from '../../dungeon/stores/dungeon-interaction.store';
import { IDungeonInteractionState } from '../../dungeon/interfaces/interaction-state.interface';
import { SceneViewModelService } from '../services/scene-view-model/scene-view-model.service';

export const dungeonSceneStore = Symbol('dungeon-scene-store');

@Injectable()
export class DungeonSceneStore implements OnDestroy {
  
  public get state$() { return this._store.state };
  public get currentState() { return this._store.currentState; };
  public get store() { return this._store }

  private _store: Store<IDungeonSceneState>;
  private _updateStoreKey = Symbol("update-scene-store");
  private _selectSceneFieldKey = Symbol("select-scene-field");
  private _resetSelectionsKey = Symbol("reset-selections");
  private _selectSceneActorKey = Symbol("select-scene-actor");
  private _highlightRangeKey = Symbol("highlight-range");
  private _setObject = Symbol("set-object");
  private _synchronizeDungeonStateKey = Symbol("synchronize-dungeon-state");

  private _onDestroy: Subject<void> = new Subject();

  constructor(
    private readonly _storeService: StoreService,
    private readonly _dataFeed: DataFeedService,
    private readonly _sceneViewModelService: SceneViewModelService,
    private readonly _sceneService: SceneService
  ) { }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }

  public setObjectState(o: ISceneToken): void {
    this._store.dispatch(this._setObject, o);
  }

  public highlightRange(allowedFieldRangeIds: string[]): void {
    this._store.dispatch(this._highlightRangeKey, allowedFieldRangeIds);
  }

  public selectField(auxId: string): void {
    this._store.dispatch(this._selectSceneFieldKey, auxId);
  }

  public selectActor(id: string): void {
    this._store.dispatch(this._selectSceneActorKey, id)
  }

  public resetSelections(): void {
    this._store.dispatch(this._resetSelectionsKey, {});
  }

  public async updateState(
    dungeonStateStore: Store<DungeonState>,
    dungeonInteractionStore: Store<IDungeonInteractionState>
  ): Promise<void> {
    return this._store.dispatch(this._updateStoreKey, { 
      dss: dungeonStateStore,
      dis: dungeonInteractionStore
    });
  }

  public initializeStore(dungeonStore: DungeonStateStore): void {
    this._store = this._storeService.createStore<IDungeonSceneState>(dungeonSceneStore, {
      initialState: mapDungeonBoardToSceneState(dungeonStore.currentState.board as any),
      actions: {
        [this._updateStoreKey]: {
          action: (ctx) => this._synchronizeDungeonState(
            ctx.payload.dss.currentState,
            ctx.payload.dis.currentState,
            ctx.initialState
          ),
          after: [(ctx) => this._sceneService.processSceneUpdate(ctx.computedState)]
        },
        [this._synchronizeDungeonStateKey]: {
          action: (ctx) => this._synchronizeDungeonState(ctx.payload.ds, ctx.payload.is, ctx.initialState),
          after: [(ctx) => this._sceneService.processSceneUpdate(ctx.computedState)]
        },
        [this._selectSceneFieldKey]: {
          action: (ctx) => this._selectField(ctx.payload, ctx.initialState),
          after: [(ctx) => this._sceneService.processSceneUpdate(ctx.computedState)]
        },
        [this._selectSceneActorKey]: {
          action: (ctx) => this._selectActor(ctx.payload, ctx.initialState),
          after: [(ctx) => this._sceneService.processSceneUpdate(ctx.computedState)]
        },
        [this._resetSelectionsKey]: {
          action: (ctx) => this._resetSelection(ctx.initialState),
          after: [(ctx) => this._sceneService.processSceneUpdate(ctx.computedState)]
        },
        [this._highlightRangeKey]: {
          action: (ctx) => this._highlightRange(ctx.payload, ctx.initialState),
          after: [(ctx) => this._sceneService.processSceneUpdate(ctx.computedState)]
        },
        [this._setObject]: {
          action: (ctx) => this._setObjectState(ctx.payload, ctx.initialState),
          after: [(ctx) => this._sceneService.processSceneUpdate(ctx.computedState)]
        }
      } 
    });
  }

  public initializeSynchronization(
    dungeonStore: DungeonStateStore,
    dungeonInteractionStore: DungeonInteractionStore
  ): void {
    dungeonInteractionStore.state$
      .pipe(takeUntil(this._onDestroy))
      .subscribe(is => this._store.dispatch(this._synchronizeDungeonStateKey, { is, ds: dungeonStore.currentState }));
  }


  private _synchronizeDungeonState(
    dungeonState: DungeonState,
    interaction: IDungeonInteractionState,
    state: IDungeonSceneState
  ): IDungeonSceneState {
    const newState = mapDungeonBoardToSceneState(dungeonState.board as any);
    return this._sceneViewModelService.updateSceneState(newState, dungeonState, interaction);
  }

  stopSynchronization() {
    this._onDestroy.next();
  }
  
  private _highlightRange(fieldIds: string[], state: IDungeonSceneState): IDungeonSceneState {
    const { fields } = state;
    for (let fieldId of fieldIds) {
      fields[fieldId].isHighlightedRange = true;
    }
    return state;
  }

  private _selectField(auxId: string, state: IDungeonSceneState): IDungeonSceneState {
    const { fields } = state;
    Object.values(fields).forEach(f => f.isSelected = false);
    fields[auxId].isSelected = true;
    return state;
  }

  private _selectActor(actorId: string, state: IDungeonSceneState): IDungeonSceneState {
    const { tokens: actors } = state;
    Object.values(actors).forEach(f => f.isSelected = false);
    actors[actorId].isSelected = true
    return state;
  }

  private _resetSelection(state: IDungeonSceneState): IDungeonSceneState {
    const { fields, tokens: actors } = state;
    Object.values(fields).forEach(f => {
      f.isSelected = false;
      f.isHighlightedRange = false;
      f.isHighlighted = false;
    });
    Object.values(actors).forEach(f => f.isSelected = false);
    return state;
  }

  private _setObjectState(payload: ISceneToken, state: IDungeonSceneState): IDungeonSceneState {
    Object.assign(state.tokens[payload.id], payload);
    return state;
  }
}