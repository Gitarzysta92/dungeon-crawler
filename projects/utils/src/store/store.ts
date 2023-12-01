import { Observable, filter, BehaviorSubject, from, of, switchMap, iif, shareReplay, firstValueFrom } from "rxjs";
import { IStoreConfig } from "./interfaces/store-config.interface";
import { IStateStorage } from "./interfaces/store-state-storage.interface";
import { StoreActionQueue } from "./store-action-queue";
import { freezeObjectRecursively, makeObjectDeepCopy } from "../misc-utils";

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

  private _actions: { [key: string]: any };
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

  public reinitialize() {
    this._manageStateInitialization(this._initialState);
  }

  public initialize() {
    this._manageActionsInitialization(this._initialActions)
    this._manageStateInitialization(this._initialState);
  }

  public dispatch<K>(action: any, payload?: K): Promise<void> {
    this._initializeState();
    this.prevState = this.currentState;
    return firstValueFrom(this._executeAction(action, payload))
  }

  public flushState() {
    this._setState(null);
    this.prevState = null;
  }

  public clearState() {
    this._setState(null);
    this._stateStorage?.clear(this.keyString);
  }

  private _executeAction(actionKey: any, payload: any): Observable<void> {
    if (!this._actions[actionKey]) {
      throw new Error(`Action not implemented ${actionKey.description}`)
    }
    const actionContext = {
      payload: payload,
      initialState: null,
      computedState: undefined,
      custom: {}
    };
    return this._actionsQueue.enqueue(actionKey, [
      () => actionContext.initialState = this._allowStateMutation ? this.currentState : makeObjectDeepCopy(this.currentState),
      ...this._actions[actionKey].before.map(a => () => a(actionContext)),
      async () => {
        let result = this._actions[actionKey].action(actionContext);
        if (result instanceof Promise) {
          result = await result;
        } 
        actionContext.computedState = result;
        return true
      },
      ...this._actions[actionKey].after.map(a => () => a(actionContext)),
      () => { this._setState(actionContext.computedState); return true },
      () => this._stateStorage?.createOrUpdate(this.keyString, actionContext.computedState),
      () => { this.changed.next(this.currentState); return true },
    ]);
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
    if (initialData instanceof Observable || initialData instanceof Promise || typeof initialData === "function" || initialData === undefined) {
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

    (from(this._stateStorage?.read(this.keyString)) ?? of(null))
      .pipe(switchMap(v => iif(() => !!v, of(v), stateProvider as Observable<T> )))
      .subscribe(result => {
        this._setState(result);
        this.changed.next(this.currentState);
      });
  }

}