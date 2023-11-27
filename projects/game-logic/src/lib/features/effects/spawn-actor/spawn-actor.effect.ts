import { v4 } from "uuid";
import { Board } from "../../board/board";
import { IBoardSelector } from "../../board/board.interface";
import { CoordsHelper } from "../../board/coords.helper";
import { calculateMaxAmountOfTargets } from "../effects-commons";
import { IPayloadDefinition } from "../effect-payload.interface";
import { EffectName } from "../effects.constants";
import { ISpawnActor,  ISpawnActorPayload, ISpawnDeclaration, ISpawnActorDefinition } from "./spawn-actor.interface";
import { ActorType } from "../../actors/actors.constants";
import { IActor, ISecondaryStats } from "../../actors/actors.interface";
import { FieldCollectableData, RotationCollectableData, SourceActorCollectableData } from "../effect-payload-collector-collectable-data";



export function spawnActor(board: Board, action: ISpawnActor & IBoardSelector, declarations: ISpawnDeclaration[]) {
  const fields = board.getFieldsBySelector(action);
  
  if (fields.length <= 0) {
    throw new Error('There are no actors for given board selector');
  }

  if (!declarations.every(d => fields.some(f => CoordsHelper.isCoordsEqual(d.field.position, f.position)))) {
    throw new Error('There is no matching fields for given declaration');
  }

  declarations.forEach(d => {
    const actor = Object.assign({ ...d.sourceActor }, { id: v4() })
    board.assignObject(actor, d.field, d.rotation);
  });
}


export function resolveSpawnActor(
  resolveSpawnPayload: ISpawnActorPayload,
  board: Board,
): void {
  if (resolveSpawnPayload.effect.effectName !== EffectName.SpawnActor) {
    throw new Error("Provided payload is not suitable for spawnActor effect resolver");
  }

  if (!('selectorType' in resolveSpawnPayload.effect)) {
    throw new Error("Spawn actor: Board selector not provided");
  }

  spawnActor(board, resolveSpawnPayload.effect, resolveSpawnPayload.payload);
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
          const sourceFields = board.getNotOccupiedFieldsBySelector(effect);
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




