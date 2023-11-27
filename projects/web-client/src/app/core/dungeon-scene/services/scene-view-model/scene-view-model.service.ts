import { Injectable } from '@angular/core';
import { IField, IBoardObject, IBoardCoordinates } from '@game-logic/lib/features/board/board.interface';
import { CoordsHelper } from '@game-logic/lib/features/board/coords.helper';
import { DungeonState } from '@game-logic/lib/game/dungeon-state';
import { IDungeonInteractionState } from 'src/app/core/dungeon/interfaces/interaction-state.interface';
import { makeObjectDeepCopy } from 'src/app/utils/misc-utils';
import { IDungeonSceneState } from '../../interfaces/dungeon-scene-state';
import { sceneInitialViewModel } from '../../constants/scene-initial-view-model';
import { validatePossibilityToInteractActor } from '@game-logic/lib/activities/player-activities/make-actor-interaction.directive';
import { ActorType } from '@game-logic/lib/features/actors/actors.constants';
import { IActor } from '@game-logic/lib/features/actors/actors.interface';
import { IActorCollectableData, IFieldCollectableData } from '@game-logic/lib/features/effects/effect-payload.interface';
import { GatheringStepDataName } from '@game-logic/lib/features/effects/effect-payload-collector.constants';
import { mapDungeonStateObjectToSceneObject } from '../../mappings/dungeon-scene-mappings';

@Injectable()
export class SceneViewModelService {

  constructor() { }

  public async updateSceneState(
    d: DungeonState,
    s: IDungeonSceneState,
    i: IDungeonInteractionState
  ): Promise<IDungeonSceneState> {
    s = makeObjectDeepCopy(s);
    for (let o of Object.values(d.board.objects)) {
      const tile = s.board.objects[o.id];
      if (tile) {
        tile.position = o.position;
        tile.rotation = o.rotation;
      } else {
        s.board.objects[o.id] = mapDungeonStateObjectToSceneObject(o);
      }
    }
  
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
      }
  
      if (field && actor && !CoordsHelper.isCoordsEqual(actor.position, field.position)) {
        s.board.objects[actor.id].position = field.position;
      }
    }

    if (s.board.objects[i.selectedActivityId]) {
      s.board.objects[i.selectedActivityId].isSelected = true;
    }

    const hero = s.board.objects[d.hero.id];
    Object.values(d.board.objects)
      .filter(o => this._validatePossibilityToInteractActor(d, o, hero.position))
      .forEach(o => {
        const tile = s.board.objects[o.id];
        if (tile) {
          tile.isHighlighted = true;
        }
      })

    return s;
  }

  public getInitialSceneState(): IDungeonSceneState {
    return sceneInitialViewModel;
  }

  private _validatePossibilityToInteractActor(d: DungeonState, actor: IActor, coords: IBoardCoordinates): boolean {
    return validatePossibilityToInteractActor(d, { actorId: actor.id }, coords) &&
      [ActorType.DungeonExit, ActorType.Treasure, ActorType.Character].includes(actor.actorType)
  }
}
