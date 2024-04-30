import { Observable, filter, BehaviorSubject, from, of, switchMap, iif, shareReplay, firstValueFrom } from "rxjs";
import { IStoreActionDefinition, IStoreConfig } from "./interfaces/store-config.interface";
import { IStateStorage } from "./interfaces/store-state-storage.interface";
import { StoreActionQueue } from "./store-action-queue";
import { freezeObjectRecursively, makeObjectDeepCopy } from "../misc-utils";
import { IActionContext } from "./interfaces/action-context.interface";

export class Store<T> {
  
  public key: Symbol;
  public keyString: string;

  public get state(): Observable<T> {
    this._initializeState();
    return this._state.pipe(
      filter(s => s != null),
      shareReplay(1)
    );
  }
  public get currentState(): T { return this._state.value };
  public prevState: T;
  public changed: BehaviorSubject<any> = new BehaviorSubject(null);

  private _actions: { [key: symbol]: IStoreActionDefinition<T> };
  private _actionsQueue: StoreActionQueue;
  private _state: BehaviorSubject<T>;
  private _isLazyLoaded: boolean;
  private _stateStorage?: IStateStorage<T>;
  private _asyncDataProvider: string = "asyncDataProvider";
  private _initialActions: any;
  private _initialState: any;
  private _allowStateMutation: boolean = false;


  constructor(data: IStoreConfig<T> & { key: Symbol }) {
    this.key = data.key;
    this.keyString = data.key.description;
    this._isLazyLoaded = data.isLazyLoaded;
    this._stateStorage = data.stateStorage;
    this._actionsQueue = new StoreActionQueue();
    this._initialActions = data.actions;
    this._initialState = data.initialState;
    this._allowStateMutation = data.allowStateMutation ?? false;
  }

  public registerPostActionCallback(
    actionKey: symbol,
    callback: (c: IActionContext<T>) => any
  ): void {
    if (!this._actions[actionKey]) {
      this._actions[actionKey] = {
        before: [],
        action: null,
        after: []
      }
    }
    if (this._actions[actionKey].after.every(cb => cb !== callback)) {
      this._actions[actionKey].after.push(callback)
    }
  }

  public registerAction(
    key: symbol,
    actionDefinition: IStoreActionDefinition<T>
  ): () => void {
    this._actions[key] = actionDefinition;
    return () => delete this._actions[key];
  }

  public reinitialize(): void {
    this._manageStateInitialization(this._initialState);
  }

  public initialize(): void {
    this._manageActionsInitialization(this._initialActions)
    this._manageStateInitialization(this._initialState);
  }

  public dispatch<K>(actionName: any, payload?: K): Promise<void> {
    if (!this._actions[actionName]) {
      throw new Error(`Action not implemented ${actionName.description}`)
    }
    this._initializeState();
    const actionContext = {
      payload: payload,
      initialState: null,
      computedState: undefined,
      custom: {}
    };
    const action = this._buildAction(this._actions[actionName], actionContext)
    this.prevState = this.currentState;
    return firstValueFrom(this._executeAction(actionName, action))
  }

  public dispatchInline(actionName: any, actionCfg: any): Promise<void> {
    this._initializeState();
    this.prevState = this.currentState;

    if (this._actions[actionName]?.after && actionCfg?.after) {
      actionCfg.after = [...this._actions[actionName].after]
    }

    if (this._actions[actionName]?.before && actionCfg?.before) {
      actionCfg.before = [...this._actions[actionName].before]
    }

    const action = this._buildAction(actionCfg)
    return firstValueFrom(this._executeAction(actionName, action))

  }

  public flushState(): void {
    this._setState(null);
    this.prevState = null;
  }

  public clearState(): void {
    this._setState(null);
    this._stateStorage?.clear(this.keyString);
  }



  private _buildAction(action: IStoreActionDefinition<unknown>, context?: IActionContext<unknown>): any {
    context = Object.assign(context ?? {} as IActionContext<unknown>, {
      initialState: null,
      computedState: undefined,
      custom: {}
    });
    const a = [
      () => context.initialState = this._allowStateMutation ? this.currentState : makeObjectDeepCopy(this.currentState),
      ...(action?.before?.map(a => () => a(context)) ?? []),
      async () => {
        let result = action.action(context);
        if (result instanceof Promise) {
          result = await result;
        }
        context.computedState = result;
        return true
      },
      ...(action?.after?.map(a => () => a(context)) ?? []),
      () => { this._setState(context.computedState as T); return true },
      () => this._stateStorage?.createOrUpdate(this.keyString, context.computedState as T),
      () => { this.changed.next(this.currentState); return true },
    ];
    return a;
  }

  private _executeAction(actionKey: any, cb: Function[]): Observable<void> {
    return this._actionsQueue.enqueue(actionKey, cb);
  }

  private _manageActionsInitialization(actions?: any): void {
    this._actions = {};
    if (!actions) {
      return;
    }
    for(let key of Object.getOwnPropertySymbols(actions) ) {
      this._actions[key as any] = Object.assign({ before: [], after: [] }, actions[key as any]);
    }
  }

  private _setState(data: T): void {
    this._state.next(this._allowStateMutation ? data : freezeObjectRecursively(data));
  }

  private _manageStateInitialization(initialData: T | Observable<T> | Function | Promise<T>): void {
    if (initialData instanceof Promise) {
      initialData = from(initialData);
    }

    if (initialData instanceof Observable || initialData instanceof Promise || typeof initialData === "function" || initialData === undefined || !!this._stateStorage) {
      Object.defineProperty(this, this._asyncDataProvider, {
        value: () => {
          this._provideStateData(initialData);
          delete this[this._asyncDataProvider];
        },
        enumerable: true,
        configurable: true
      });
    }
    
    if (!this._isLazyLoaded) {
      this._initializeState(initialData as T);
    }
  }

  private _initializeState(initialData?: T): void {
    if (!!this._state) {
      return;
    }

    let initialState;
    if (!!initialData &&
        !(initialData instanceof Observable) &&
        !(initialData instanceof Promise) &&
        !(typeof initialData === "function")) {
      initialState = this._allowStateMutation ? initialData : freezeObjectRecursively(initialData);
    }
    this._state = new BehaviorSubject<T>(initialState);
    this.changed.next(this.currentState);

    if (!!this[this._asyncDataProvider]) {
      this[this._asyncDataProvider]();
    };
  }

  private _provideStateData(stateProvider: IStoreConfig<T>['initialState']): void {
    if (typeof stateProvider === 'function') {
      stateProvider = from((stateProvider as Function)() as Promise<T>);     
    };
    if (!(stateProvider instanceof Observable) && !this._stateStorage) {
      throw new Error(`Error during state initialization. State provider must be an Observable. Store: ${this.keyString}`)
    };

    if (!(stateProvider instanceof Observable) && !(stateProvider instanceof Promise)) {
      stateProvider = of(stateProvider);
    }

    (!!this._stateStorage ? from(this._stateStorage?.read(this.keyString)) : of(null))
      .pipe(switchMap(v => iif(() => !!v, of(v), stateProvider as Observable<T> )))
      .subscribe(result => {
        this._setState(result);
        this.changed.next(this.currentState);
      });
  }

}