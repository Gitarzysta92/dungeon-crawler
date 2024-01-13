import { Injectable } from '@angular/core';
import { IBoardCoordinates, IBoardSelector } from '@game-logic/lib/features/board/board.interface';
import { CoordsHelper } from '@game-logic/lib/features/board/coords.helper';
import { DungeonState } from '@game-logic/lib/states/dungeon-state';
import { IDungeonInteractionState } from 'src/app/core/dungeon/interfaces/interaction-state.interface';
<<<<<<< HEAD
import { IDungeonSceneState, ISceneObjectState } from '../../interfaces/dungeon-scene-state';
import { validatePossibilityToInteractActor } from '@game-logic/lib/activities/player-activities/make-actor-interaction.directive';
import { GatheringStepDataName } from '@game-logic/lib/features/effects/commons/effect-payload-collector/effect-payload-collector.constants';
import { validateBoardObject } from '@game-logic/lib/features/board/board-commons';
import { IActorCollectableDataStep, ICollectableData, IFieldCollectableDataStep, IOriginCollectableDataStep } from '@game-logic/lib/features/effects/commons/effect-payload-collector/effect-payload.interface';

=======
import { IDungeonSceneState, ISceneToken } from '../../interfaces/dungeon-scene-state';
import { sceneInitialViewModel } from '../../constants/scene-initial-view-model';
import { validatePossibilityToInteractActor } from '@game-logic/lib/activities/player-activities/make-actor-interaction.directive';
import { IActorCollectableData, IFieldCollectableData } from '@game-logic/lib/features/effects/effect-payload.interface';
import { GatheringStepDataName } from '@game-logic/lib/features/effects/effect-payload-collector.constants';
import { mapHexagonalCoordsTo3dCoords } from '../../mappings/dungeon-scene-mappings';
>>>>>>> f7354e26b4f18506c3eb9218e3c3990ef0d59150

@Injectable()
export class SceneViewModelService {

  constructor() { }

  public updateSceneState(
    s: IDungeonSceneState,
    d: DungeonState,
    i: IDungeonInteractionState
  ): IDungeonSceneState {

    for (let cd of i.collectedData) {
<<<<<<< HEAD
      for (let step of cd.steps) {
        if (step.dataName === GatheringStepDataName.Field) {
          this._displaySuggestionsForFieldGathering(step, s);
        }
        if (step.dataName === GatheringStepDataName.Actor) {
          this._displaySuggestionsForActorGathering(step, s);
        }
      }
      this._updateBoardObjectPosition(cd, s);
      this._displayInformationAboutSelectorRange(cd, s, d);
    }

    this._displaySuggestionsForActorInteractions(s, d);
    this._displayInformationForInteractingActor(i, s);
=======
      const fieldGatheringStep = cd.steps.find(s => s.dataName === GatheringStepDataName.Field);
      const field = fieldGatheringStep?.payload as unknown as IField;
      if (field) {
        s.fields[field.id].isSelected = true;
      } else if (fieldGatheringStep) {
        const payloadDefinition = i.payloadDefinitions.find(d => d.effect.id === cd.effect.id);
        const gatheringStep = payloadDefinition.gatheringSteps
          .find(s => s.dataName === GatheringStepDataName.Field) as IFieldCollectableData;
        
        for (let field of gatheringStep?.possibleFields) {
          s.fields[field.id].isHighlighted = true;
        }
      } else {
        const def = i.payloadDefinitions.find(pd => pd.effect.id === cd.effect.id);
        const rangeFields = d.board
          .getFieldsBySelector(Object.assign({ ...def.effect }, { selectorOrigin: def.caster }) as IBoardSelector);
        for (let field of rangeFields) {
          s.fields[field.id].isHighlighted = true;
        }
      }

      const actorGatheringStep = cd.steps.find(s => s.dataName === GatheringStepDataName.Actor);
      const actor = actorGatheringStep.payload as unknown as IBoardObject;
      if (actor) {
        s.tokens[actor.id].isSelected = true;
      } else if (actorGatheringStep) {
        const payloadDefinition = i.payloadDefinitions.find(d => d.effect.id === cd.effect.id);
        const gatheringStep = payloadDefinition.gatheringSteps
          .find(s => s.dataName === GatheringStepDataName.Actor) as IActorCollectableData;
    
        for (let actor of gatheringStep?.possibleActors) {
          s.tokens[actor.id].isHighlighted = true;
        }

        // mark objects that are not selectable
        const def = i.payloadDefinitions.find(pd => pd.effect.id === cd.effect.id);
        const objects = d.board
          .getObjectsBySelector(Object.assign({ ...def.effect }, { selectorOrigin: def.caster }) as IBoardSelector);
        for (let object of objects) {
          s.tokens[object.id].isSelected = true
        }
      } 
  
      if (field && actor && !CoordsHelper.isCoordsEqual(actor.position, field.position)) {
        s.tokens[actor.id].position = mapHexagonalCoordsTo3dCoords(field.position);
      }
      
    }

    if (s.tokens[i.selectedActivityId]) {
      s.tokens[i.selectedActivityId].isSelected = true;
    }

    Object.values(s.tokens)
      .filter(o => this._validatePossibilityToInteractActor(d, o, d.hero.position))
      .forEach(o => o.isHighlighted = true);
>>>>>>> f7354e26b4f18506c3eb9218e3c3990ef0d59150

    return s;
  }


  private _validatePossibilityToInteractActor(
    d: DungeonState,
    o: ISceneToken,
    coords: IBoardCoordinates
  ): boolean {
    return validatePossibilityToInteractActor(d, { actorId: o.id }, coords);
  }


  private _displaySuggestionsForFieldGathering(
    step: IFieldCollectableDataStep,
    state: IDungeonSceneState
  ): void {
    const stateField = state.board.fields[step.payload?.id]
    if (stateField) {
      stateField.isSelected = true;
      return;
    } 
    for (let field of step?.possibleFields) {
      state.board.fields[field.id].isHighlighted = true;
    }
  }


  private _displaySuggestionsForActorGathering(
    step: IActorCollectableDataStep,
    state: IDungeonSceneState
  ): void {
    const choosenActor = state.board.objects[validateBoardObject(step.payload)?.id];
    if (choosenActor) {
      choosenActor.isSelected = true;
      return;
    }
    for (let actor of step.possibleActors) {
      if (!state.board.objects[actor.id]) {
        continue;
      }
      state.board.objects[actor.id].isHighlighted = true;
    }
  }


  private _displayInformationAboutSelectorRange(
    collectableData: ICollectableData,
    sceneState: IDungeonSceneState,
    dungeonState: DungeonState
  ) {
    const choosenOrigin = (collectableData.steps
      .find(s => s.dataName === GatheringStepDataName.Origin) as IOriginCollectableDataStep)?.payload;
    if (!choosenOrigin) {
      return;
    }
    const rangeFields = dungeonState.board
      //TODO : get rid of cloning effect
      .getFieldsBySelector(Object.assign({ ...collectableData.effect }, { selectorOrigin: choosenOrigin }) as IBoardSelector);
    for (let field of rangeFields) {
      sceneState.board.fields[field.id].isHighlighted = true;
    }
  }


  private _displaySuggestionsForActorInteractions(
    sceneState: IDungeonSceneState,
    dungeonState: DungeonState
  ): void {
    Object.values(sceneState.board.objects)
      .filter(o => this._validatePossibilityToInteractActor(dungeonState, o, dungeonState.hero.position))
      .forEach(o => o.isHighlighted = true);
  }

  private _displayInformationForInteractingActor(
    interactionState: IDungeonInteractionState,
    sceneState: IDungeonSceneState,
  ): void {
    if (sceneState.board.objects[interactionState.selectedActivityId]) {
      if (sceneState.board.objects[interactionState.selectedActivityId]) {
        sceneState.board.objects[interactionState.selectedActivityId].isSelected = true;
      }
    }
  }

  private _updateBoardObjectPosition(
    collectableData: ICollectableData,
    sceneState: IDungeonSceneState,
  ): void {
    const choosenField = (collectableData.steps
      .find(s => s.dataName === GatheringStepDataName.Field) as IFieldCollectableDataStep)?.payload;
    const choosenActor = (collectableData.steps
      .find(s => s.dataName === GatheringStepDataName.Actor) as IActorCollectableDataStep)?.payload;

    if (choosenField && choosenActor && !CoordsHelper.isCoordsEqual(validateBoardObject(choosenActor)?.position, choosenField.position)) {
      if (sceneState.board.objects[choosenActor.id]) {
        sceneState.board.objects[choosenActor.id].position = choosenField.position;
      }
    }
  }
}


// mark objects that are not selectable
// const def = i.payloadDefinitions.find(pd => pd.effect.id === cd.effect.id);
// const objects = d.board
//   .getObjectsBySelector(Object.assign({ ...def.effect }, { selectorOrigin: def.caster }) as IBoardSelector);
// for (let object of objects) {
//   if (s.board.objects[object.id]) {
//     s.board.objects[object.id].isSelected = true;
//   }
// }