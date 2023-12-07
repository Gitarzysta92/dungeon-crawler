import { Injectable } from '@angular/core';
import { IField, IBoardObject, IBoardCoordinates, IBoardSelector } from '@game-logic/lib/features/board/board.interface';
import { CoordsHelper } from '@game-logic/lib/features/board/coords.helper';
import { DungeonState } from '@game-logic/lib/states/dungeon-state';
import { IDungeonInteractionState } from 'src/app/core/dungeon/interfaces/interaction-state.interface';
import { IDungeonSceneState, ISceneObjectState } from '../../interfaces/dungeon-scene-state';
import { sceneInitialViewModel } from '../../constants/scene-initial-view-model';
import { validatePossibilityToInteractActor } from '@game-logic/lib/activities/player-activities/make-actor-interaction.directive';
import { GatheringStepDataName } from '@game-logic/lib/features/effects/commons/payload-collector/effect-payload-collector.constants';
import { IActor } from '@game-logic/lib/features/actors/actors.interface';
import { validateBoardObject } from '@game-logic/lib/features/board/board-commons';


@Injectable()
export class SceneViewModelService {

  constructor() { }

  public updateSceneState(
    s: IDungeonSceneState,
    d: DungeonState,
    i: IDungeonInteractionState
  ): IDungeonSceneState {
    for (let cd of i.collectedData) {

      let choosenField: IField | undefined;
      const fieldGatheringStep = cd.steps.find(s => s.dataName === GatheringStepDataName.Field);
      if (fieldGatheringStep?.dataName === GatheringStepDataName.Field) {
        choosenField = fieldGatheringStep?.payload;
        if (choosenField) {
          s.board.fields[choosenField.id].isSelected = true;

        } else if (fieldGatheringStep) {
          for (let field of fieldGatheringStep?.possibleFields) {
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
      }

      let choosenActor: (IActor & IBoardObject) | undefined;
      const actorGatheringStep = cd.steps.find(s => s.dataName === GatheringStepDataName.Actor);
      if (actorGatheringStep?.dataName === GatheringStepDataName.Actor) {
        choosenActor = validateBoardObject(actorGatheringStep.payload);
        if (choosenActor) {
          if (s.board.objects[choosenActor.id]) {
            s.board.objects[choosenActor.id].isSelected = true;
          }
        } else if (actorGatheringStep) {
          for (let actor of actorGatheringStep?.possibleActors) {
            if (s.board.objects[actor.id]) {
              s.board.objects[actor.id].isHighlighted = true;
            }
          }
      }

      
        // mark objects that are not selectable
        const def = i.payloadDefinitions.find(pd => pd.effect.id === cd.effect.id);
        const objects = d.board
          .getObjectsBySelector(Object.assign({ ...def.effect }, { selectorOrigin: def.caster }) as IBoardSelector);
        for (let object of objects) {
          if (s.board.objects[object.id]) {
            s.board.objects[object.id].isSelected = true;
          }
        }
      } 
  
      if (choosenField && choosenActor && !CoordsHelper.isCoordsEqual(choosenActor.position, choosenField.position)) {
        if (s.board.objects[choosenActor.id]) {
          s.board.objects[choosenActor.id].position = choosenField.position;
        }
      }
      
    }

    if (s.board.objects[i.selectedActivityId]) {
      if (s.board.objects[i.selectedActivityId]) {
        s.board.objects[i.selectedActivityId].isSelected = true;
      }
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
