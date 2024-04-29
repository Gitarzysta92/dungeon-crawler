import { Injectable } from '@angular/core';
import { Store, StoreService } from 'src/app/infrastructure/data-storage/api';
import { firstValueFrom } from 'rxjs';
import { GameBuilderStateStoreAction, StoreName } from './game-builder.store-keys';
import { GameBuilderState } from '../state/game-builder.state';
import IBuilderStep from "../interfaces/builder-step.interface";
import { IStateInitialData } from '../interfaces/state-initial-data.interface';


@Injectable()
export class GameBuilderStateStore {

  public get isInitialized() { return !!this._store }

  public get state$() { return this._store.state };
  public get currentState() { return this._store.currentState; }

  private _store: Store<GameBuilderState>;

  constructor(
    private readonly _storeService: StoreService
  ) { }

  public async update(state: Partial<GameBuilderState>): Promise<void> {
    await this._store.dispatch(GameBuilderStateStoreAction.updateStateKey, state);
  }

  public async updateStep(step: IBuilderStep, data: unknown): Promise<void> {
    await this._store.dispatch(GameBuilderStateStoreAction.updateStep, { step, data });
  }

  public async initializeStore(
    initialData: IStateInitialData,
    factory: (g: IStateInitialData) => Promise<GameBuilderState>
  ): Promise<GameBuilderState> {
    this._store = this._storeService.createStore<GameBuilderState>(StoreName.gameBuilderStateStore, {
      initialState: factory(initialData),
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