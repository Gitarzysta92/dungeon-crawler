import { DungeonState } from "src/lib/states/dungeon-state";
import { StateDispatcher } from "../../lib/utils/state-dispatcher/state-dispatcher";
import { Store } from "@utils/store/store";
import { IDispatcherDirective } from "src/lib/utils/state-dispatcher/interfaces/dispatcher-directive.interface";
import { IStoreConfig } from "@utils/store/interfaces/store-config.interface";
import { IStateStorage } from "@utils/store/interfaces/store-state-storage.interface";

export class DungeonStateStore {
  
  public get state$() { return this._store.state };
  public get currentState() { return this._store.currentState; }
  public get store() { return this._store };

  private _store: Store<DungeonState>;
  private _dispatchActivityKey = Symbol("dispatch-activity");

  constructor(
    private readonly _stateDispatcher: StateDispatcher,
    private readonly _stateStorage: IStateStorage<DungeonState>
  ) { }

  public async dispatchActivity(activity: IDispatcherDirective): Promise<void> {
    await this._store.dispatch(this._dispatchActivityKey, activity);
  }

  public initializeStore(initialState: DungeonState): void {
    this._store = new Store<DungeonState>(this._createStoreConfiguration(initialState));
  }

  private _createStoreConfiguration(initialState: DungeonState): IStoreConfig<DungeonState> & { key: Symbol } {
    return {
      key: Symbol(""),
      initialState: initialState,
      stateStorage: this._stateStorage,
      allowStateMutation: true,
      isLazyLoaded: false,
      actions: {
        [this._dispatchActivityKey]: { action: c => this._stateDispatcher.next(c.payload, c.initialState) },
      }
    }
  }
}