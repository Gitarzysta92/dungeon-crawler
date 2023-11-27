import { Injectable } from '@angular/core';
import { validatePossibilityToUseEffect } from '@game-logic/lib/activities/player-activities/cast-effect.directive';
import { validatePossibilityToInteractActor } from '@game-logic/lib/activities/player-activities/make-actor-interaction.directive';
import { ActorType } from '@game-logic/lib/features/actors/actors.constants';
import { DungeonState } from '@game-logic/lib/game/dungeon-state';
import { DataFeedService } from 'src/app/core/data-feed/services/data-feed.service';
import { IDungeonInteractionState } from 'src/app/core/dungeon/interfaces/interaction-state.interface';
import { IDungeonUiState } from '../../interfaces/dungeon-ui-state';
import { uiInitialViewModel } from '../../constants/ui-initial-view-model';
import { IDungeonUiActivity } from '../../interfaces/dungeon-ui-activity';
import { mapActorToUiActivity } from '../../mappings/dungeon-ui-mappings';
import { ActorInteractionUiActivity, CastEffectUiActivity } from '../ui-interaction/ui-activity';
import { makeObjectDeepCopy } from 'src/app/utils/misc-utils';
import { IEffect } from '@game-logic/lib/features/effects/resolve-effect.interface';

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
      .filter(a => this._validatePossibilityToInteractActor(d, { id: a.id, data: a as any}))
      .map(async a => mapActorToUiActivity(await this._dataFeed.getActor(a.id))))
    
    ui.activities = ui.activities.concat(contextualActivities);

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

  public getInitialUiState(): IDungeonUiState {
    return uiInitialViewModel;
  }

  private _validatePossibilityToInteractActor(d: DungeonState, activity: Pick<ActorInteractionUiActivity, 'id' | 'data'>): boolean {
    return validatePossibilityToInteractActor(d, { actorId: activity.id }) &&
      [ActorType.DungeonExit, ActorType.Treasure, ActorType.Character].includes(activity.data.actorType)
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
