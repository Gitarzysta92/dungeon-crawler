import { v4 } from "uuid";
import { Board } from "../../board/board";
import { IBoardSelector } from "../../board/board.interface";
import { CoordsHelper } from "../../board/coords.helper";
import { calculateMaxAmountOfTargets } from "../effects-commons";
import { IPayloadDefinition } from "../effect-payload.interface";
import { EffectName } from "../effects.constants";
import { ISpawnActor, ISpawnActorDefinition, ISpawnActorPayload, ISpawnDeclaration } from "./spawn-actor.interface";
import { IEffectCaster } from "../effects.interface";



export function spawnActor(board: Board, action: ISpawnActor & IBoardSelector, declarations: ISpawnDeclaration[]) {
  const fields = board.getSelectedFields(action);
  
  if (fields.length <= 0) {
    throw new Error('There are no actors for given board selector');
  }

  if (!declarations.every(f => fields.some(d => CoordsHelper.isCoordsEqual(d.coords, f.coords)))) {
    throw new Error('There is no matching fields for given declaration');
  }

  declarations.forEach(d => {
    let actor = board.getObjectById(d.sourceActorId)!;
    actor = Object.assign({ ...actor }, { id: v4(), sourceActorId: actor.id })
    board.assignObject(actor, d.coords);
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
  const sourceFields = board.getSelectedFields(effect);
  const fieldsToSubstract = board.getSelectedFields({
    selectorType: "radius",
    selectorRange: getAllowedSpawnDiameter(caster.sight, effect.minSpawnDistanceFromHero)
  })

  return {
    effect,
    caster,
    amountOfTargets: calculateMaxAmountOfTargets(effect, board, caster),
    gatheringSteps: [
      {
        dataName: 'field',
        requireUniqueness: true,
        possibleFieldsResolver: () => sourceFields.filter(sf => !fieldsToSubstract.find(fs => fs.id === sf.id))
      }
    ]
  }
}

export function getAllowedSpawnDiameter(sight: number, minSpawnDistanceFromHero: number): number {
  const possibleDistanceIncrease = Math.abs(minSpawnDistanceFromHero - sight);
  return minSpawnDistanceFromHero + Math.round(possibleDistanceIncrease / 2);
}




