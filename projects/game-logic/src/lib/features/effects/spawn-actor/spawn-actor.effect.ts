import { v4 } from "uuid";
import { Board } from "../../board/board";
import { IBoardSelector } from "../../board/board.interface";
import { CoordsHelper } from "../../board/coords.helper";
import { calculateMaxAmountOfTargets } from "../effects-commons";
import { IPayloadDefinition } from "../effect-payload.interface";
import { EffectName } from "../effects.constants";
import { ISpawnActor,  ISpawnActorPayload, ISpawnDeclaration, ISpawnActorDefinition, ISpawnActorSignature, ISpawnActorResult } from "./spawn-actor.interface";
import { ActorType } from "../../actors/actors.constants";
import { IActor, ISecondaryStats } from "../../actors/actors.interface";
import { FieldCollectableData, RotationCollectableData, SourceActorCollectableData } from "../effect-payload-collector-collectable-data";



export function spawnActor(
  board: Board,
  action: ISpawnActor & IBoardSelector,
  declaration: ISpawnDeclaration
): ISpawnActorResult {
  const fields = board.getFieldsBySelector(action);
  
  if (fields.length <= 0) {
    throw new Error('There are no actors for given board selector');
  }

  if (!fields.some(f => CoordsHelper.isCoordsEqual(declaration.field.position, f.position))) {
    throw new Error('There is no matching fields for given declaration');
  }

  const actor = Object.assign({ ...declaration.sourceActor }, { id: v4() })
  board.assignObject(actor, declaration.field, declaration.rotation);
  
  return {
    rotation: declaration.rotation,
    fieldCoords: declaration.field.position,
    targetId: actor.id
  } 
}


export function resolveSpawnActor(
  resolveSpawnPayload: ISpawnActorPayload,
  board: Board,
): ISpawnActorSignature {
  if (resolveSpawnPayload.effect.effectName !== EffectName.SpawnActor) {
    throw new Error("Provided payload is not suitable for spawnActor effect resolver");
  }

  if (!('selectorType' in resolveSpawnPayload.effect)) {
    throw new Error("Spawn actor: Board selector not provided");
  }

  const results = resolveSpawnPayload.payload
    .map(p => spawnActor(board, resolveSpawnPayload.effect, p));
  
  return {
    effectId: resolveSpawnPayload.effect.id,
    effectName: EffectName.SpawnActor,
    data: {
      casterId: resolveSpawnPayload.caster.id,
      targets: results
    }
  }
}


export function getSpawnActorPayloadDefinitions(
  effectDefinition: ISpawnActorDefinition,
  board: Board,
): IPayloadDefinition {
  const { effect, caster } = effectDefinition;
  return {
    effect,
    caster,
    amountOfTargets: calculateMaxAmountOfTargets(effect, board, caster),
    gatheringSteps: [
      new SourceActorCollectableData({
        requireUniqueness: false,
        possibleSourceActorIds: [effectDefinition.effect.enemyId]
      }),
      new FieldCollectableData({
        requireUniqueness: true,
        possibleFieldsResolver: () => {
          //TODO remove any assertion
          const origin = board.getObjectsAsArray<IActor & ISecondaryStats>()
            .find(o => o.actorType === ActorType.Hero);
          if (!origin) {
            throw new Error("Cannot get origin object");
          }

          const sourceFields = board.getNonOccupiedFieldsBySelector(effect);
          const fieldsToSubstract = board.getFieldsBySelector({
            selectorType: "radius",
            selectorOrigin: origin,
            selectorRange: getAllowedSpawnDiameter(origin.sight, effect.minSpawnDistanceFromHero)
          })
          return sourceFields.filter(sf => !fieldsToSubstract.find(fs => fs.id === sf.id))
        }
      }),
      new RotationCollectableData({
        requireUniqueness: false,
      })
    ]
  }
}

export function getAllowedSpawnDiameter(sight: number, minSpawnDistanceFromHero: number): number {
  const possibleDistanceIncrease = Math.abs(minSpawnDistanceFromHero - sight);
  return minSpawnDistanceFromHero + Math.round(possibleDistanceIncrease / 2);
}




