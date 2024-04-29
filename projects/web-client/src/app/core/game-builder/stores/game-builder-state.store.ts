import { Injectable } from '@angular/core';
import { LocalStorageService, Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { firstValueFrom } from 'rxjs';
import { GameBuilderStateStoreAction, StoreName } from './game-builder.store-keys';
import { GameBuilderState } from '../state/game-builder.state';
import IBuilderStep from "../interfaces/builder-step.interface";
import { IStateInitialData } from '../interfaces/state-initial-data.interface';


@Injectable()
export class GameBuilderStateStore {

  public get state$() { return this._state.state };
  public get currentState() { return this._state.currentState; }

  private _state: Store<GameBuilderState>;

  constructor(
    private readonly _store: StoreService,
    private readonly _localStorage: LocalStorageService
  ) { }

  public async update(state: Partial<GameBuilderState>): Promise<void> {
    await this._state.dispatch(GameBuilderStateStoreAction.updateStateKey, state);
  }

  public async updateStep(step: IBuilderStep, data: unknown): Promise<void> {
    await this._state.dispatch(GameBuilderStateStoreAction.updateStep, { step, data });
  }

  public async initializeStore(
    initialData: IStateInitialData,
    factory: (g: IStateInitialData) => Promise<GameBuilderState>
  ): Promise<GameBuilderState> {
    if (this._state) {
      return;
    }

    this._state = this._store.createStore<GameBuilderState>(StoreName.gameBuilderStateStore, {
      initialState: factory(initialData),
      // stateStorage: {
      //   clear: (key: string) => this._localStorage.clear(key),
      //   createOrUpdate: (key: string, s: GameBuilderState) => this._localStorage.createOrUpdate(key, s),
      //   read: (key: string) => firstValueFrom(from(this._localStorage.read<GameBuilderState>(key)).pipe(switchMap(s => factory(s as any))))
      // },
      allowStateMutation: true,
      actions: {
        [GameBuilderStateStoreAction.updateStateKey]: { action: c => Object.assign(c.initialState, c.payload) },
        [GameBuilderStateStoreAction.updateStep]: {
          action: c => {
            c.payload.step.fulfill(c.payload.data);
            return c.initialState
        } }
      }
    });
    return await firstValueFrom(this.state$);
  }
}