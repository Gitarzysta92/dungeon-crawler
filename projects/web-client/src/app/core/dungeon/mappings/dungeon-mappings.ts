import { validatePossibilityToUseEffect } from "@game-logic/lib/activities/player-activities/cast-effect.directive";
import { IField, IBoardObject } from "@game-logic/lib/features/board/board.interface";
import { CoordsHelper } from "@game-logic/lib/features/board/coords.helper";
import { IEffect } from "@game-logic/lib/features/effects/effect-commons.interface";
import { DungeonState } from "@game-logic/lib/game/dungeon-state";
import { IDungeonState } from "@game-logic/lib/game/game.interface";
import { makeObjectDeepCopy } from "src/app/utils/misc-utils";
import { IDungeonSceneState } from "../../dungeon-scene/interfaces/dungeon-scene-state";
import { IDungeonUiState } from "../../dungeon-ui/interfaces/dungeon-ui-state";
import { IDungeonInteractionState } from "../interfaces/interaction-state";
import { IViewState } from "../interfaces/view-state.interface";


export function mapStatesToViewState(
  d: DungeonState,
  s: IDungeonSceneState,
  ui: IDungeonUiState,
  i: IDungeonInteractionState
): IViewState {
  s = makeObjectDeepCopy(s);
  let state = {};
  (state as IViewState).hero = d.hero;

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


  ui = makeObjectDeepCopy(ui);
  ui.activities.map(a => {
    return Object.assign(a, {
      isDisabled: a.isDisabled || !validatePossibilityToUseEffect(d, { effect: a as unknown as IEffect })
    })
  })


  state = Object.assign(state, s);
  state = Object.assign(state, ui);
  state = Object.assign(state, i);

  return state as IViewState;
}

export function mapDungeonStateToInteractionState(d: IDungeonState): IDungeonInteractionState {
  return { payloadDefinitions: [], collectedData: [] } as IDungeonInteractionState;
}