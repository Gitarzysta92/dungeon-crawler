import { Board } from "../../board/board";
import { IBoardSelector } from "../../board/board.interface";
import { CoordsHelper } from "../../board/coords.helper";
import { calculateMaxAmountOfTargets, getPossibleActorsToSelect, getPossibleOriginsToSelect } from "../effects-commons";
import { IPayloadDefinition } from "../effect-payload.interface";
import { EffectName } from "../effects.constants";
import { IModifyPosition, IModifyPositionDefinition, IModifyPositionPayload, IMoveDeclaration } from "./modify-position.interface";
import { ActorCollectableData, FieldCollectableData, OriginCollectableData, RotationCollectableData } from "../effect-payload-collector-collectable-data";
import { GatheringStepDataName } from "../effect-payload-collector.constants";
import { IActor } from "../../actors/actors.interface";


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

  for (let declaration of modifyPositionPayload.payload) {
    modifyPosition(board, modifyPositionPayload.effect, declaration);
  }
}


export function modifyPosition(board: Board, effect: IModifyPosition & IBoardSelector, declaration: IMoveDeclaration) {
  if (!declaration.origin.position) {
    throw new Error("Origin should have declared board position")
  }

  const object = board.getObjectById(declaration.actor.id);
  if (!object) {
    throw new Error(`Object with given id: ${declaration.actor.id} not exists on the board`)
  }

  const fields = board.getFieldsBySelector(Object.assign({ ...effect }, { selectorOrigin: declaration.origin }));
  const targetField = fields.find(f => CoordsHelper.isCoordsEqual(f.position, declaration.field.position));
  if (!targetField) {
    throw new Error('Cannot select a field provided in the declaration. Field may be occupied or it not exits.')
  }

  board.moveObject(declaration.actor.id, targetField, declaration.rotation);
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
      new OriginCollectableData({
        requireUniqueness: false,
        possibleOriginsResolver: () => getPossibleOriginsToSelect(effect, board, caster),
        payload: effectDefinition.effect.selectorOriginDeterminant?.isCaster ?
          board.validateSelectorOriginAgainstBoardSelector(caster, effect) : undefined
      }),
      new ActorCollectableData({
        requireUniqueness: true,
        possibleActorsResolver: (prev) => {
          const prevStep = prev.find(p => p.dataName === GatheringStepDataName.Origin);
          const origin = prevStep?.dataName === GatheringStepDataName.Origin && !!prevStep.payload ? prevStep.payload : caster;
          return getPossibleActorsToSelect(effect, board, origin)
        },
        payload: effect.effectTargetingSelector.selectorTargets === 'caster' ? caster as IActor : undefined
      }),
      new FieldCollectableData({
        requireUniqueness: true,
        possibleFieldsResolver: (prev) => {
          const caster = prev.find(p => p.dataName === GatheringStepDataName.Actor)?.payload
          const selector = Object.assign({ ...effect }, { selectorOrigin: caster })
          return board.getNotOccupiedFieldsBySelector(selector)
        },
      }),
      new RotationCollectableData({
        requireUniqueness: false,
      })
    ]
  }
}