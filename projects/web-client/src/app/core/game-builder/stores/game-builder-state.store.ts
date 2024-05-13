import { Injectable } from '@angular/core';
import { Store, StoreService } from 'src/app/infrastructure/data-storage/api';
import { firstValueFrom } from 'rxjs';
import { GameBuilderStateStoreAction, StoreName } from './game-builder.store-keys';
import { GameBuilderState } from '../state/game-builder.state';
import IBuilderStep from "../interfaces/builder-step.interface";
import { IBuilderInitialData } from '../interfaces/state-initial-data.interface';


@Injectable()
export class GameBuilderStateStore {

  public get isInitialized() { return !!this._store }

  public get state$() { return this._store.state };
  public get currentState() { return this._store.currentState; }

  private _store: Store<GameBuilderState>;

  constructor(
    private readonly _storeService: StoreService
  ) { }

  public async updateState(state: Partial<GameBuilderState>): Promise<void> {
    return this._store.dispatchInline(GameBuilderStateStoreAction.updateState, {
      action: c => Object.assign(c.initialState, state)
    });
  }

  public async updateStep(step: IBuilderStep, data: unknown): Promise<void> {
    return this._store.dispatchInline(GameBuilderStateStoreAction.updateStep, {
      action: c => Object.assign(c.initialState, { steps: c.initialState.steps.map(s => s.stepId === step.stepId ? s.fulfill(data) : s) })
    })
  }

  public async selectStep(step: IBuilderStep): Promise<void> {
    return this._store.dispatchInline(GameBuilderStateStoreAction.updateState, {
      action: c => Object.assign(c.initialState, { steps: c.initialState.steps.map(s => Object.assign(s, { isSelected: s.stepId === step.stepId })) })
    });
  }

  public async initializeStore(
    initialData: IBuilderInitialData,
    factory: (g: IBuilderInitialData) => Promise<GameBuilderState>
  ): Promise<GameBuilderState> {
    this._store = this._storeService.createStore<GameBuilderState>(StoreName.gameBuilderStateStore, {
      initialState: factory(initialData),
      allowStateMutation: true,
    });
    return await firstValueFrom(this.state$);
  }
}