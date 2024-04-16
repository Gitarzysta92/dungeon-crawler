import { Injectable, OnDestroy } from "@angular/core";
import { DungeonState } from "@game-logic/lib/states/dungeon-state";
import { Store, StoreService } from "src/app/infrastructure/data-store/api";
import { IDungeonActivityLogState } from "../interfaces/dungeon-activity-log-entry";
import { mapDungeonStateToActivityLog } from "../mappings/dungeon-ui-mappings";
import { DungeonStateStore } from "../../dungeon/stores/dungeon-state.store";
import { Subject, takeUntil } from "rxjs";

export const dungeonActivityLogStore = Symbol('dungeon-activity-log-store');

@Injectable()
export class DungeonActivityLogStore implements OnDestroy {

  public get state$() { return this._store.state };
  public get currentState() { return this._store.currentState; };
  public get store() { return this._store };

  private _store: Store<IDungeonActivityLogState>;
  private _addEntriesKey = Symbol("add-entries");

  private _onDestroy: Subject<void> = new Subject();

  constructor(
    private readonly _storeService: StoreService,
  ) { }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }

  public initializeStore(initalData: DungeonState): void {
    this._store = this._storeService.createStore<IDungeonActivityLogState>(dungeonActivityLogStore, {
      initialState: mapDungeonStateToActivityLog(initalData),
      actions: { 
        [this._addEntriesKey]: {
          action: (ctx) => this._addEntries(ctx.payload),
        }
      }
    });
  }

  public initializeSynchronization(
    dungeonStore: DungeonStateStore
  ): void {
    dungeonStore.state$
      .pipe(takeUntil(this._onDestroy))
      .subscribe((d) => this._store.dispatch(this._addEntriesKey, d))
  }

  public stopSynchronization() {
    this._onDestroy.next();
  }

  private _addEntries(dungeonState: DungeonState): IDungeonActivityLogState {
    return {
      entries: dungeonState.changesHistory.map(ch => {
        const { playerType, id, groupId } = ch.playerId === dungeonState.deck.id ? dungeonState.deck : dungeonState.hero;
        return {
          activityName: ch.name,
          performer: { playerType, id, groupId },
          turn: ch.turn,
          message: ch.effectSignatures ? JSON.stringify(ch.effectSignatures) : null
        }
      })
    }
  }
}