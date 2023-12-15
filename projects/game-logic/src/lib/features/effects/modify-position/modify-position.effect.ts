import { Board } from "../../board/board";
import { IAassignedBoardObject, IBoardSelector, IField } from "../../board/board.interface";
import { CoordsHelper } from "../../board/coords.helper";
import { calculateMaxAmountOfTargets, getPossibleActorsToSelect, getPossibleOriginsToSelect } from "../commons/effects-commons";
import { IPayloadDefinition } from "../commons/payload-collector/effect-payload.interface";
import { EffectName } from "../commons/effects-commons.constants";
import { IModifyPosition, IModifyPositionDefinition, IModifyPositionPayload, IModifyPositionResult, IModifyPositionSignature, IMoveDeclaration } from "./modify-position.interface";
import { RotationCollectableDataDefinition } from "../commons/payload-collector/collectable-data-types/rotation-collectable-data";
import { FieldCollectableDataDefinition } from "../commons/payload-collector/collectable-data-types/field-collectable-data";
import { ActorCollectableDataDefinition } from "../commons/payload-collector/collectable-data-types/actor-collectable-data";
import { OriginCollectableDataDefinition } from "../commons/payload-collector/collectable-data-types/origin-collectable-data";
import { GatheringStepDataName } from "../commons/payload-collector/effect-payload-collector.constants";
import { IActor } from "../../actors/actors.interface";
import { validateActor } from "../../actors/actor-commons";



export function resolveModifyPosition(
  modifyPositionPayload: IModifyPositionPayload,
  board: Board,
): IModifyPositionSignature {
  if (modifyPositionPayload.effect.effectName !== EffectName.ModifyPosition) {
    throw new Error("Provided payload is not suitable for Modify Position effect resolver");
  }

  if (!('selectorType' in modifyPositionPayload.effect)) {
    throw new Error("Modify position: Board selector not provided");
  }

  const result = modifyPositionPayload.payload.map(p => modifyPosition(board, modifyPositionPayload.effect, p));

  return {
    effectId: modifyPositionPayload.effect.id,
    effectName: EffectName.ModifyPosition,
    data: {
      casterId: modifyPositionPayload.caster.id,
      targets: result
    }
  }
}


export function modifyPosition(
  board: Board,
  effect: IModifyPosition & IBoardSelector,
  declaration: IMoveDeclaration
): IModifyPositionResult {
  if (!declaration.origin.position) {
    throw new Error("Origin should have declared board position")
  }

  const object = board.getObjectById(declaration.actor.id);
  if (!object) {
    throw new Error(`Object with given id: ${declaration.actor.id} not exists on the board`)
  }

  const fields = board.getFieldsBySelector(Object.assign({ ...effect }, { selectorOrigin: declaration.origin }));
  const currentField = board.getFieldByPosition(declaration.origin.position);
  if (currentField && currentField.isOccupied()) {
    fields.push(currentField);
  }

  const targetField = fields.find(f => CoordsHelper.isCoordsEqual(f.position, declaration.field.position));
  if (!targetField) {
    throw new Error('Cannot select a field provided in the declaration. Field may be occupied or it not exits.')
  }

  board.moveObject(declaration.actor.id, targetField, declaration.rotation);

  return {
    targetId: declaration.actor.id,
    position: targetField.position,
    rotation: declaration.rotation,
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
      new OriginCollectableDataDefinition({
        requireUniqueness: false,
        possibleOriginsResolver: () => getPossibleOriginsToSelect(effect, board, caster),
        payload: effectDefinition.effect.selectorOriginDeterminant?.isCaster ?
          board.validateSelectorOriginAgainstBoardSelector(caster, effect) : undefined
      }),
      new ActorCollectableDataDefinition({
        requireUniqueness: true,
        possibleActorsResolver: (prev) => {
          const prevStep = prev.find(p => p.dataName === GatheringStepDataName.Origin);
          const origin = prevStep?.dataName === GatheringStepDataName.Origin && !!prevStep.payload ? prevStep.payload : caster;
          return getPossibleActorsToSelect(effect, board, origin);
        },
        payload: effect.effectTargetingSelector.selectorTargets === 'caster' ? caster as IActor : undefined
      }),
      new FieldCollectableDataDefinition({
        requireUniqueness: true,
        possibleFieldsResolver: (prev) => {
          const actor = prev.find(p => p.dataName === GatheringStepDataName.Actor)?.payload as IActor
          const selector = Object.assign({ ...effect }, { selectorOrigin: actor });
          const fields = board.getNonOccupiedFieldsBySelector(selector);
          const currentlyOccupiedField = board.getFieldByAssignedObjectId(actor.id);
          if (!!currentlyOccupiedField) {
            fields.push(currentlyOccupiedField);
          }
          return fields; 
        },
        initialPayloadResolver: (prev) => {
          const actor = prev.find(p => p.dataName === GatheringStepDataName.Actor).payload as IActor;
          return board.getFieldByAssignedObjectId(actor.id);
        }
      }),
      new RotationCollectableDataDefinition({
        requireUniqueness: false,
      })
    ]
  }
}