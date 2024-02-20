import { IStoreConfig } from "@utils/store/interfaces/store-config.interface";
import { IStateStorage } from "@utils/store/interfaces/store-state-storage.interface";
import { Store } from "@utils/store/store";
import { DungeonGameplay } from "../../gameplay/dungeon/state/dungeon-gameplay";
import { IDispatcherDirective } from "../../lib/base/state/state.interface";
import { StateDispatcher } from "../../lib/base/state/state-dispatcher";

export class DungeonStateStore {
  
  public get state$() { return this._store.state as any };
  public get currentState() { return this._store.currentState; }
  public get store() { return this._store };

  private _store: Store<DungeonGameplay>;
  private _dispatchActivityKey = Symbol("dispatch-activity");

  constructor(
    private readonly _stateDispatcher: StateDispatcher<unknown>,
    private readonly _stateStorage: IStateStorage<DungeonGameplay>
  ) { }

  public async dispatchActivity(activity: IDispatcherDirective): Promise<void> {
    await this._store.dispatch(this._dispatchActivityKey, activity);
  }

  public initializeStore(initialState: DungeonGameplay): void {
    this._store = new Store<DungeonGameplay>(this._createStoreConfiguration(initialState));
    this._store.initialize();
  }

  private _createStoreConfiguration(initialState: DungeonGameplay): IStoreConfig<DungeonGameplay> & { key: Symbol } {
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