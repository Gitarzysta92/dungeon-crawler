import { Board } from "../../board/board";
import { IBoardSelector } from "../../board/board.interface";
import { CoordsHelper } from "../../board/coords.helper";
import { calculateMaxAmountOfTargets, getPossibleActorsToSelect } from "../effects-commons";
import { IPayloadDefinition } from "../effect-payload.interface";
import { EffectName } from "../effects.constants";
import { IModifyPosition, IModifyPositionDefinition, IModifyPositionPayload, IMoveDeclaration } from "./modify-position.interface";
import { IEffectCaster } from "../effects.interface";


export function resolveModifyPosition(
  modifyPositionPayload: IModifyPositionPayload,
  board: Board,
) {
  if (modifyPositionPayload.effect.effectName !== EffectName.ModifyPosition) {
    throw new Error("Provided payload is not suitable for Deal Damage effect resolver");
  }

  if (!('selectorType' in modifyPositionPayload.effect)) {
    throw new Error("Modify position: Board selector not provided");
  }


  modifyPosition(board, modifyPositionPayload.effect, modifyPositionPayload.payload);
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
  effectDefinition: IModifyPositionDefinition,
  board: Board,
): IPayloadDefinition {
  const { effect, caster } = effectDefinition;
  return {
    effect,
    caster,
    amountOfTargets: calculateMaxAmountOfTargets(effect, board, caster),
    gatheringSteps: [
      {
        dataName: 'actor',
        requireUniqueness: true,
        possibleActorsResolver: () => getPossibleActorsToSelect(effect, board, caster),
        payload: effect.effectTargetingSelector.selectorTargets === 'caster' ? caster : undefined
      },
      {
        dataName: 'field',
        requireUniqueness: true,
        possibleFieldsResolver: () => board.getSelectedNonOccupiedFields(effect),
      },
      {
        dataName: 'rotation',
        requireUniqueness: false,
      }
    ]
  }
}
