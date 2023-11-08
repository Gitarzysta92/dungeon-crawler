import { Injectable } from "@angular/core";
import { DungeonState } from "@game-logic/lib/game/dungeon-state";
import { Store, StoreService } from "src/app/infrastructure/data-store/api";
import { IDungeonActivityLogEntry, IDungeonActivityLogState } from "../interfaces/dungeon-activity-log-entry";
import { mapDungeonStateToActivityLog } from "../mappings/dungeon-ui-mappings";

export const dungeonActivityLogStore = Symbol('dungeon-activity-log-store');

@Injectable()
export class DungeonActivityLogStore {

  public get state() { return this._store.state };
  public get currentState() { return this._store.currentState; };

  private _store: Store<IDungeonActivityLogState>;
  private _addEntry = Symbol("add-entry");

  constructor(
    private readonly _storeService: StoreService,
  ) { }

  public log(entry: IDungeonActivityLogEntry): void {
    this._store.dispatch(this._addEntry, entry);
  }
  
  public initializeStore(initalData: DungeonState): void {
    this._store = this._storeService.createStore<IDungeonActivityLogState>(dungeonActivityLogStore, {
      initialState: mapDungeonStateToActivityLog(initalData),
      actions: { 
        [this._addEntry]: {
          action: (ctx) => this._updateState(ctx.payload, ctx.initialState),
        }
      }
    });
  }

  private _updateState(payload: IDungeonActivityLogEntry, state: IDungeonActivityLogState): IDungeonActivityLogState {
    state.entries.push(payload);
    return state;
  }
}