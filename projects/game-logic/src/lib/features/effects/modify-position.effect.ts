import { Board } from "../board/board";
import { IBoardSelector } from "../board/board.interface";
import { CoordsHelper } from "../board/coords.helper";
import { IHero } from "../hero/hero.interface";
import { calculateMaxAmountOfTargets, getPossibleActorsToSelect } from "./effect-commons";
import { CastEffectPayload } from "./effect-commons.interface";
import { IPayloadDefinition } from "./effect-payload.interface";
import { EffectName } from "./effects.constants";
import { IModifyPosition, IMoveDeclaration } from "./modify-position.interface";


export function resolveModifyPosition(
  board: Board,
  payload: CastEffectPayload,
) {
  if (payload.effect.effectName !== EffectName.ModifyPosition) {
    throw new Error("Provided payload is not suitable for Deal Damage effect resolver");
  }

  if (payload.effectData?.effectName !== EffectName.ModifyPosition) {
    throw new Error("No required payload provided for spawnActor effect");
  }

  modifyPosition(board, payload.effect, payload.effectData.payload);
}

export function modifyPosition(board: Board, action: IModifyPosition & IBoardSelector, declarations: IMoveDeclaration[]) {
  for (let declaration of declarations) {
    const object = board.getObjectById(declaration.actor.id);
    if (!object) {
      throw new Error(`Object with given id: ${declaration.actor.id} not exists on the board`)
    }

    const fields = board.getSelectedFields(Object.assign({ ...action }, { selectorOrigin: object.position }));
    const targetField = fields.find(f => CoordsHelper.isCoordsEqual(f.coords, declaration.field.coords));
    if (!targetField) {
      throw new Error('Cannot select a field provided in the declaration. Field may be occupied or it not exits.')
    }

    board.moveObject(declaration.actor.id, targetField, declaration.rotation);
  }
}

export function getModifyPositionPayloadDefinitions(
  effect: IModifyPosition & IBoardSelector,
  board: Board,
  hero: IHero
): IPayloadDefinition[] {

  return [{
    effectId: effect.id,
    amountOfTargets: calculateMaxAmountOfTargets(effect, board),
    gatheringSteps: [
      {
        dataName: 'actor',
        possibleActors: getPossibleActorsToSelect(effect, board),
        payload: effect.effectTargetingSelector.selectorTargets === 'caster' ? hero : undefined
      },
      {
        dataName: 'field',
        possibleFields: board.getSelectedNonOccupiedFields(effect),
      },
      {
        dataName: 'rotation',
      }
    ]
  }]
}
