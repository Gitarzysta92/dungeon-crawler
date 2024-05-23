import { IStoreConfig } from "@utils/store/interfaces/store-config.interface";
import { Store } from "@utils/store/store";
import { IDispatcherDirective, IState } from "./dispatcher/state.interface";
import { StateDispatcher } from "./dispatcher/state-dispatcher";

export class StateStore {
  
  public get state$() { return this._store.state as any };
  public get currentState() { return this._store.currentState; }
  public get store() { return this._store };

  private _store: Store<IState>;
  private _dispatchActivityKey = Symbol("dispatch-activity");

  constructor(
    private readonly _stateDispatcher: StateDispatcher<IState>
  ) { }

  public async dispatchActivity(activity: IDispatcherDirective): Promise<void> {
    await this._store.dispatch(this._dispatchActivityKey, activity);
  }

  public initializeStore(initialState: IState): void {
    this._store = new Store<IState>(this._createStoreConfiguration(initialState));
    this._store.initialize();
  }

  private _createStoreConfiguration(initialState: IState): IStoreConfig<IState> & { key: Symbol } {
    return {
      key: Symbol(""),
      initialState: initialState,
      allowStateMutation: true,
      isLazyLoaded: false,
      actions: {
        [this._dispatchActivityKey]: { action: c => this._stateDispatcher.next(c.payload, c.initialState) },
      }
    }
  }
}