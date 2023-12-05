import { Injectable, OnDestroy } from "@angular/core";
import { DungeonState } from "@game-logic/lib/states/dungeon-state";
import { Store, StoreService } from "src/app/infrastructure/data-store/api";
import { DungeonStateStore } from "../../dungeon-logic/stores/dungeon-state.store";
import { Subject, takeUntil } from "rxjs";
import { IDevelopmentFlagsState } from "../interfaces/development-flags-state.interface";

export const dungeonActivityLogStore = Symbol('dungeon-activity-log-store');

@Injectable()
export class DevelopmentFlagsStore implements OnDestroy {

  public get state$() { return this._store.state };
  public get currentState() { return this._store.currentState; };

  private _store: Store<IDevelopmentFlagsState>;
  private _addEntriesKey = Symbol("add-entries");

  private _onDestroy: Subject<void> = new Subject();

  constructor(
    private readonly _storeService: StoreService,
  ) { }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }

  public initializeStore(): void {
    this._store = this._storeService.createStore<IDevelopmentFlagsState>(dungeonActivityLogStore, {
      actions: { 
        [this._addEntriesKey]: {
          action: (ctx) => this._addEntries(ctx.payload),
        }
      }
    });
  }

  private _addEntries(state: IDevelopmentFlagsState): IDevelopmentFlagsState {
    return 
  }
}