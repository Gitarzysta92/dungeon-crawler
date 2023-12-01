import { Injectable } from '@angular/core';
import { validatePossibilityToUseEffect } from '@game-logic/lib/activities/player-activities/cast-effect.directive';
import { validatePossibilityToInteractActor } from '@game-logic/lib/activities/player-activities/make-actor-interaction.directive';
import { DungeonState } from '@game-logic/lib/states/dungeon-state';
import { IDungeonInteractionState } from 'src/app/core/dungeon/interfaces/interaction-state.interface';
import { IDungeonUiState } from '../../interfaces/dungeon-ui-state';
import { IDungeonUiActivity } from '../../interfaces/dungeon-ui-activity';
import { ActorInteractionUiActivity, CastEffectUiActivity } from '../ui-interaction/ui-activity';

@Injectable()
export class UiViewModelService {

  constructor() { }

  public updateUiState(
    ui: IDungeonUiState,
    d: DungeonState,
    i: IDungeonInteractionState,
  ): IDungeonUiState {

    const selectedActivity = ui.activities.find(a => a.id === i.selectedActivityId);
    ui.activities.forEach(a => {
      Object.assign(a, {
        isDisabled:
          d.isDungeonTurn ||
          (a instanceof ActorInteractionUiActivity && !this._validatePossibilityToInteractActor(d, a)) ||
          (a instanceof CastEffectUiActivity && !this._validatePossibilityToUseEffect(d, a)) ||
          (!!selectedActivity && !this._validateActivityIsSelected(a, selectedActivity)),
        isSelected: this._validateActivityIsSelected(a, selectedActivity),
        isHighlighted: a.isContextual &&
          a instanceof ActorInteractionUiActivity &&
          this._validatePossibilityToInteractActor(d, a)
      })
    });
  
    return ui;
  }

  private _validatePossibilityToInteractActor(d: DungeonState, activity: Pick<ActorInteractionUiActivity, 'id' | 'data'>): boolean {
    return validatePossibilityToInteractActor(d, { actorId: activity.id })
  }

  private _validatePossibilityToUseEffect(d: DungeonState, activity: CastEffectUiActivity): boolean {
    // TODO - remove any type assertion
    return validatePossibilityToUseEffect(d, {
      effect: activity.data as any,
      caster: d.hero,
      effectName: activity.data.effectName as any
    })
  }

  private _validateActivityIsSelected(
    targetActivity: IDungeonUiActivity,
    selectedActivity: IDungeonUiActivity
  ): boolean {
    return (!!selectedActivity && targetActivity.id === selectedActivity?.id)
  }

}
