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
      const tile = s.board.actors[o.id];
      if (tile) {
        tile.position = o.position;
        tile.rotation = o.rotation;
      }
    }
  
    for (let cd of i.collectedData) {
      const fieldGatheringStep = cd.gatheringSteps.find(s => s.dataName === 'field');
      const field = fieldGatheringStep?.payload as unknown as IField;
      if (field) {
        s.board.fields[field.id].isSelected = true;
      } else if (fieldGatheringStep) {
        const payloadDefinition = i.payloadDefinitions.find(d => d.effectId === cd.effectId);
        const gatheringStep = payloadDefinition.gatheringSteps.find(s => s.dataName === 'field');
    
        for (let field of gatheringStep?.possibleFields) {
          s.board.fields[field.id].isHighlighted = true;
        }
      }
  
      const actorGatheringStep = cd.gatheringSteps.find(s => s.dataName === 'actor');
      const actor = actorGatheringStep.payload as unknown as IBoardObject;
      if (actor) {
        s.board.actors[actor.id].isSelected = true;
      } else if (actorGatheringStep) {
        const payloadDefinition = i.payloadDefinitions.find(d => d.effectId === cd.effectId);
        const gatheringStep = payloadDefinition.gatheringSteps.find(s => s.dataName === 'actor');
    
        for (let actor of gatheringStep?.possibleActors) {
          s.board.actors[actor.id].isHighlighted = true;
        }
      }
  
      if (field && actor && !CoordsHelper.isCoordsEqual(actor.position, field.coords)) {
        s.board.actors[actor.id].position = field.coords;
      }
    }

    if (s.board.actors[i.selectedActivityId]) {
      s.board.actors[i.selectedActivityId].isSelected = true;
    }

    const hero = s.board.actors[d.hero.id];
    Object.values(d.board.objects)
      .filter(o => this._validatePossibilityToInteractActor(d, o, hero.position))
      .forEach(o => {
        const tile = s.board.actors[o.id];
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
