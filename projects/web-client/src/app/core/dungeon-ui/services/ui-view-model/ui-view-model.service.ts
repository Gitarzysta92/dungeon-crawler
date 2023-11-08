import { Injectable } from '@angular/core';
import { validatePossibilityToUseEffect } from '@game-logic/lib/activities/player-activities/cast-effect.directive';
import { validatePossibilityToInteractActor } from '@game-logic/lib/activities/player-activities/make-actor-interaction.directive';
import { ActorType } from '@game-logic/lib/features/actors/actors.constants';
import { IEffect } from '@game-logic/lib/features/effects/effect-commons.interface';
import { DungeonState } from '@game-logic/lib/game/dungeon-state';
import { DataFeedService } from 'src/app/core/data-feed/services/data-feed.service';
import { IDungeonInteractionState } from 'src/app/core/dungeon/interfaces/interaction-state.interface';
import { makeObjectDeepCopy } from 'src/app/utils/misc-utils';
import { IDungeonUiState } from '../../interfaces/dungeon-ui-state';
import { uiInitialViewModel } from '../../constants/ui-initial-view-model';
import { IDungeonUiActivity } from '../../interfaces/dungeon-ui-activity';
import { mapActorToUiActivity } from '../../mappings/dungeon-ui-mappings';
import { ActorInteractionUiActivity, CastEffectUiActivity } from '../ui-interaction/ui-activity';

@Injectable()
export class UiViewModelService {

  constructor(
    private readonly _dataFeed: DataFeedService,
  ) { }

  public async updateUiState(
    d: DungeonState,
    ui: IDungeonUiState,
    i: IDungeonInteractionState,
  ): Promise<IDungeonUiState> {
    ui = makeObjectDeepCopy(ui);
    ui.activities = ui.activities.filter(a => !a.isContextual);
  
    const contextualActivities = await Promise.all(Object.values(d.board.objects)
      .filter(a =>
        this._validatePossibilityToInteractActor(d, { id: a.id }) &&
        [ActorType.DungeonExit, ActorType.Treasure, ActorType.Character].includes(a.actorType)
      )
      .map(async a => mapActorToUiActivity(await this._dataFeed.getActor(a.id))))
    
    ui.activities = ui.activities.concat(contextualActivities);
    
    const selectedActivity = ui.activities.find(a => a.id === i.selectedActivityId);
    ui.activities.forEach(a => {
      Object.assign(a, {
        isDisabled:
          !this._validatePossibilityToUseStaticActivity(a) ||
          (a instanceof ActorInteractionUiActivity && !this._validatePossibilityToInteractActor(d, a)) ||
          (a instanceof CastEffectUiActivity && !this._validatePossibilityToUseEffect(d, a)) ||
          !this._validateActivityIsSelected(a, selectedActivity),
        isSelected: this._validateActivityIsSelected(a, selectedActivity),
        isHighlighted: a.isContextual &&
          a instanceof ActorInteractionUiActivity &&
          this._validatePossibilityToInteractActor(d, a)
      })
    });
  
    return ui;
  }

  public getInitialUiState(): IDungeonUiState {
    return uiInitialViewModel;
  }

  private _validatePossibilityToUseStaticActivity(activity: IDungeonUiActivity): boolean {
    return activity.isStatic && activity.isContextual === false;
  }

  private _validatePossibilityToInteractActor(d: DungeonState, activity: Pick<ActorInteractionUiActivity, 'id'>): boolean {
    console.log('actor', activity)
    return validatePossibilityToInteractActor(d, { actorId: activity.id })
  }

  private _validatePossibilityToUseEffect(d: DungeonState, activity: CastEffectUiActivity): boolean {
    console.log('effect', activity)
    return validatePossibilityToUseEffect(d, { effect: activity.data as IEffect })
  }

  private _validateActivityIsSelected(
    targetActivity: IDungeonUiActivity,
    selectedActivity: IDungeonUiActivity
  ): boolean {
    return (!!selectedActivity && targetActivity.id === selectedActivity?.id)
  }

}
