import { v4 } from "uuid";
import { Board } from "../../board/board";
import { IBoardSelector, IField } from "../../board/board.interface";
import { CoordsHelper } from "../../board/coords.helper";
import { calculateMaxAmountOfTargets } from "../effects-commons";
import { CastEffectPayload } from "../effects-commons.interface";
import { IPayloadDefinition } from "../effect-payload.interface";
import { EffectName } from "../effects.constants";
import { ISpawnActor, ISpawnDeclaration } from "./spawn-actor.interface";



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
  board: Board,
  payload: CastEffectPayload,
): void {
  if (payload.effect.effectName !== EffectName.SpawnActor) {
    throw new Error("Provided payload is not suitable for spawnActor effect resolver");
  }

  if (payload.effectData?.effectName !== EffectName.SpawnActor) {
    throw new Error("No required payload provided for spawnActor effect");
  }

  if (!('selectorType' in payload.effect)) {
    throw new Error("Spawn actor: Board selector not provided");
  }

  spawnActor(board, payload.effect, payload.effectData.payload);
}


export function getSpawnActorPayloadDefinitions(
  effect: ISpawnActor & IBoardSelector,
  board: Board,
  heroSight: number,
): IPayloadDefinition[] {

  const sourceFields = board.getSelectedFields(effect);
  const fieldsToSubstract = board.getSelectedFields({
    selectorType: "radius",
    selectorRange: getAllowedSpawnDiameter(heroSight, effect.minSpawnDistanceFromHero)
  })

  return [{
    effectId: effect.id,
    amountOfTargets: calculateMaxAmountOfTargets(effect, board),
    gatheringSteps: [
      {
        dataName: 'field',
        requireUniqueness: true,
        possibleFields: sourceFields.filter(sf => !fieldsToSubstract.find(fs => fs.id === sf.id))
      }
    ]
  }]
}

export function getAllowedSpawnDiameter(sight: number, minSpawnDistanceFromHero: number): number {
  const possibleDistanceIncrease = Math.abs(minSpawnDistanceFromHero - sight);
  return minSpawnDistanceFromHero + Math.round(possibleDistanceIncrease / 2);
}




