import { Injectable } from '@angular/core';
import { Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { DungeonState } from '@game-logic/lib/game/dungeon-state';
import { IDungeonSceneState } from '../interfaces/dungeon-scene-state';
import { mapDungeonStateToSceneState } from '../mappings/dungeon-scene-mappings';

export const dungeonSceneStore = Symbol('dungeon-scene-store');

@Injectable()
export class DungeonSceneStore {
  
  public get state() { return this._store.state };
  public get currentState() { return this._store.currentState; };

  private _store: Store<IDungeonSceneState>;
  private _updateStoreKey = Symbol("update-scene-store");
  private _selectSceneFieldKey = Symbol("select-scene-field");
  private _resetSelectionsKey = Symbol("reset-selections");
  private _selectSceneActorKey = Symbol("select-scene-actor");
  private _highlightRangeKey = Symbol("highlight-range");

  constructor(
    private readonly _storeService: StoreService,
  ) { }

  public highlightRange(allowedFieldRangeIds: string[]) {
    this._store.dispatch(this._highlightRangeKey, allowedFieldRangeIds);
  }

  public updateState(state: IDungeonSceneState): void {
    this._store.dispatch(this._updateStoreKey, state);
  }

  public selectField(auxId: string): void {
    this._store.dispatch(this._selectSceneFieldKey, auxId);
  }

  public selectActor(id: string): void {
    this._store.dispatch(this._selectSceneActorKey, id)
  }

  public resetSelections() {
    this._store.dispatch(this._resetSelectionsKey, {});
  }

  public registerStore(initalData: DungeonState): void {
    this._store = this._storeService.createStore<IDungeonSceneState>(dungeonSceneStore, {
      initialState: mapDungeonStateToSceneState(initalData),
      actions: { 
        [this._updateStoreKey]: {
          action: (ctx) => this._updateState(ctx.payload, ctx.initialState)
        },
        [this._selectSceneFieldKey]: {
          action: (ctx) => this._selectField(ctx.payload, ctx.initialState)
        },
        [this._selectSceneActorKey]: {
          action: (ctx) => this._selectActor(ctx.payload, ctx.initialState)
        },
        [this._resetSelectionsKey]: {
          action: (ctx) => this._resetSelection(ctx.initialState)
        },
        [this._highlightRangeKey]: {
          action: (ctx) => this._highlightRange(ctx.payload, ctx.initialState)
        }
      } 
    });
  }
  
  private _highlightRange(fieldIds: string[], state: IDungeonSceneState): IDungeonSceneState {
    const { fields } = state.board;
    for (let fieldId of fieldIds) {
      fields[fieldId].isHighlightedRange = true;
    }
    return state;
  }

  private _updateState(payload: any, state: IDungeonSceneState): IDungeonSceneState {
    return Object.assign(state, payload);
  }

  private _selectField(auxId: string, state: IDungeonSceneState): IDungeonSceneState {
    const { fields } = state.board;
    Object.values(fields).forEach(f => f.isSelected = false);
    fields[auxId].isSelected = true
    return state;
  }

  private _selectActor(actorId: string, state: IDungeonSceneState): IDungeonSceneState {
    const { actors } = state.board;
    Object.values(actors).forEach(f => f.isSelected = false);
    actors[actorId].isSelected = true
    return state;
  }

  private _resetSelection(state: IDungeonSceneState): IDungeonSceneState {
    const { fields, actors } = state.board;
    Object.values(fields).forEach(f => {
      f.isSelected = false;
      f.isHighlightedRange = false;
      f.isHighlighted = false;
    });
    Object.values(actors).forEach(f => f.isSelected = false);

    return state;
  }
}