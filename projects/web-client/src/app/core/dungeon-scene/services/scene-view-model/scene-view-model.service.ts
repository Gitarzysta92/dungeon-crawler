import { Injectable } from '@angular/core';
import { IField, IBoardObject, IBoardCoordinates, IBoardSelector } from '@game-logic/lib/features/board/board.interface';
import { CoordsHelper } from '@game-logic/lib/features/board/coords.helper';
import { DungeonState } from '@game-logic/lib/game/dungeon-state';
import { IDungeonInteractionState } from 'src/app/core/dungeon/interfaces/interaction-state.interface';
import { makeObjectDeepCopy } from 'src/app/utils/misc-utils';
import { IDungeonSceneState, ISceneObjectState } from '../../interfaces/dungeon-scene-state';
import { sceneInitialViewModel } from '../../constants/scene-initial-view-model';
import { validatePossibilityToInteractActor } from '@game-logic/lib/activities/player-activities/make-actor-interaction.directive';
import { IActorCollectableData, IFieldCollectableData } from '@game-logic/lib/features/effects/effect-payload.interface';
import { GatheringStepDataName } from '@game-logic/lib/features/effects/effect-payload-collector.constants';

@Injectable()
export class SceneViewModelService {

  constructor() { }

  public updateSceneState(
    d: DungeonState,
    s: IDungeonSceneState,
    i: IDungeonInteractionState
  ): IDungeonSceneState {
    s = makeObjectDeepCopy(s);
    for (let cd of i.collectedData) {
      const fieldGatheringStep = cd.steps.find(s => s.dataName === GatheringStepDataName.Field);
      const field = fieldGatheringStep?.payload as unknown as IField;
      if (field) {
        s.board.fields[field.id].isSelected = true;
      } else if (fieldGatheringStep) {
        const payloadDefinition = i.payloadDefinitions.find(d => d.effect.id === cd.effect.id);
        const gatheringStep = payloadDefinition.gatheringSteps
          .find(s => s.dataName === GatheringStepDataName.Field) as IFieldCollectableData;
        
        for (let field of gatheringStep?.possibleFields) {
          s.board.fields[field.id].isHighlighted = true;
        }
      } else {
        const def = i.payloadDefinitions.find(pd => pd.effect.id === cd.effect.id);
        const rangeFields = d.board
          .getFieldsBySelector(Object.assign({ ...def.effect }, { selectorOrigin: def.caster }) as IBoardSelector);
        for (let field of rangeFields) {
          s.board.fields[field.id].isHighlighted = true;
        }
      }

      const actorGatheringStep = cd.steps.find(s => s.dataName === GatheringStepDataName.Actor);
      const actor = actorGatheringStep.payload as unknown as IBoardObject;
      if (actor) {
        s.board.objects[actor.id].isSelected = true;
      } else if (actorGatheringStep) {
        const payloadDefinition = i.payloadDefinitions.find(d => d.effect.id === cd.effect.id);
        const gatheringStep = payloadDefinition.gatheringSteps
          .find(s => s.dataName === GatheringStepDataName.Actor) as IActorCollectableData;
    
        for (let actor of gatheringStep?.possibleActors) {
          s.board.objects[actor.id].isHighlighted = true;
        }

        // mark objects that are not selectable
        const def = i.payloadDefinitions.find(pd => pd.effect.id === cd.effect.id);
        const objects = d.board
          .getObjectsBySelector(Object.assign({ ...def.effect }, { selectorOrigin: def.caster }) as IBoardSelector);
        for (let object of objects) {
          s.board.objects[object.id].isSelected = true
        }


      } 
  
      if (field && actor && !CoordsHelper.isCoordsEqual(actor.position, field.position)) {
        s.board.objects[actor.id].position = field.position;
      }
      
    }

    if (s.board.objects[i.selectedActivityId]) {
      s.board.objects[i.selectedActivityId].isSelected = true;
    }

    Object.values(s.board.objects)
      .filter(o => this._validatePossibilityToInteractActor(d, o, d.hero.position))
      .forEach(o => o.isHighlighted = true);

    return s;
  }

  public getInitialSceneState(): IDungeonSceneState {
    return sceneInitialViewModel;
  }

  private _validatePossibilityToInteractActor(
    d: DungeonState,
    o: ISceneObjectState,
    coords: IBoardCoordinates
  ): boolean {
    return validatePossibilityToInteractActor(d, { actorId: o.id }, coords);
  }
}
