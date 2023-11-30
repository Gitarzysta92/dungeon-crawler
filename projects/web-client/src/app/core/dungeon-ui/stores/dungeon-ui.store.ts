import { Injectable, OnDestroy } from '@angular/core';
import { Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { IDungeonUiState } from '../interfaces/dungeon-ui-state';
import { mapActorToUiActivity, mapActorToUiActor } from '../mappings/dungeon-ui-mappings';
import { DataFeedService } from '../../data-feed/services/data-feed.service';
import { DungeonStateStore } from '../../dungeon-logic/stores/dungeon-state.store';
import { Subject, combineLatest, takeUntil } from 'rxjs';
import { DungeonState } from '@game-logic/lib/game/dungeon-state';
import { getStaticUiActivities } from '../constants/static-ui-activities';
import { uiInitialViewModel } from '../constants/ui-initial-view-model';
import { IDungeonUiActivity } from '../interfaces/dungeon-ui-activity';
import { CastEffectUiActivity } from '../services/ui-interaction/ui-activity';
import { UiViewModelService } from '../services/ui-view-model/ui-view-model.service';
import { DungeonInteractionStore } from '../../dungeon/stores/dungeon-interaction.store';
import { IDungeonInteractionState } from '../../dungeon/interfaces/interaction-state.interface';


export const dungeonUiStore = Symbol('dungeon-ui-store');

@Injectable()
export class DungeonUiStore implements OnDestroy {

  public get state$() { return this._store.state };
  public get currentState() { return this._store.currentState; };

  private _store: Store<IDungeonUiState>;
  private _updateStore = Symbol("update-ui-store");
  private _synchronizeDungeonStateKey = Symbol("synchronizeDungeonStateKey")

  private _onDestroy: Subject<void> = new Subject();

  constructor(
    private readonly _storeService: StoreService,
    private readonly _dataFeedService: DataFeedService,
    private readonly _uiViewModelService: UiViewModelService
  ) { }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }

  public updateState(state: Partial<IDungeonUiState>): void {
    this._store.dispatch(this._updateStore, state);
  }

  public async initializeStore(dungeonStore: DungeonStateStore): Promise<void> {
    this._store = this._storeService.createStore<IDungeonUiState>(dungeonUiStore, {
      initialState: await this._mapDungeonStateToUiState(dungeonStore.currentState),
      actions: { 
        [this._updateStore]: {
          action: (ctx) => this._updateState(ctx.payload, ctx.initialState),
        },
        [this._synchronizeDungeonStateKey]: {
          action: (ctx) => this._synchronizeDungeonState(ctx.payload.d, ctx.payload.di, ctx.initialState)
        }
      } 
    });
  }


  public initializeSynchronization(
    dungeonStore: DungeonStateStore,
    dungeonInteractionStore: DungeonInteractionStore
  ): void {
    combineLatest([
      dungeonStore.state$,
      dungeonInteractionStore.state$
    ])
      .pipe(takeUntil(this._onDestroy))
      .subscribe(([d, di]) => this._store.dispatch(this._synchronizeDungeonStateKey, { d, di }))
  }


  private _updateState(payload: any, state: IDungeonUiState): IDungeonUiState {
    const newState: IDungeonUiState = Object.assign(state, payload);
    return newState;
  }

  private async _synchronizeDungeonState(
    dungeonState: DungeonState,
    interaction: IDungeonInteractionState,
    state: IDungeonUiState
  ): Promise<IDungeonUiState> {
    const newState = await this._mapDungeonStateToUiState(dungeonState);
    
    for (let activity of newState.activities) {
      Object.assign(activity, state.activities.find(a => a.id === activity.id))
    }
    for (let actor of newState.actors) {
      Object.assign(actor, state.actors.find(a => a.actorId === actor.actorId))  
    }

    newState.activityConfirmationRequired = state.activityConfirmationRequired
    newState.activityIdToConfirmation = state.activityIdToConfirmation;
    newState.activityConfirmed = state.activityConfirmed;
    newState.activitySelectionRequired = state.activitySelectionRequired;
    newState.confirmationPossible = state.confirmationPossible;
    newState.activityIdToEarlyConfirm = state.activityIdToEarlyConfirm;
    newState.activityEarlyConfirmationPossible = state.activityEarlyConfirmationPossible;
    newState.activityEarlyConfirmed = state.activityEarlyConfirmed;

    return this._uiViewModelService.updateUiState(newState, dungeonState, interaction);
  }
  
  private async _mapDungeonStateToUiState(d: DungeonState): Promise<IDungeonUiState> {
    const spellsAndAbilitiesData = await this._dataFeedService.getSpellsAndAbilities(d.heroPreparedSpellAndAbilityIds);
    let activities: IDungeonUiActivity[] = d.heroPreparedSpellAndAbilityIds
      .map(id => new CastEffectUiActivity(spellsAndAbilitiesData.find(s => s.id === id)))
    
    const attackableActors = d.getAllAttackableActors();
    const interactableActors = d.getAllInteractableActors();
    const actorsData = await this._dataFeedService.getActors([...attackableActors, ...interactableActors].map(a => a.id));
  
    activities = activities.concat(interactableActors
      .map(a => mapActorToUiActivity(a, actorsData.find(ad => ad.id === a.sourceActorId))))
    activities = activities.concat(getStaticUiActivities());
      
    // TODO remove <any> type assertion.

    const dungeon: IDungeonUiState = {
      ...uiInitialViewModel,
      hero: {...d.hero} as any,
      activities: activities,
      actors: attackableActors.map(a => {
        const actorData = actorsData.find(ad => ad.id === a.sourceActorId)
        return mapActorToUiActor(a, actorData)
      })
    };
    return dungeon;
  }


}