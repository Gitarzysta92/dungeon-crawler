import { v4 } from "uuid";
import { Board } from "../board/board";
import { IBoardSelector } from "../board/board.interface";
import { CoordsHelper } from "../board/coords.helper";
import { calculateMaxAmountOfTargets } from "./effect-commons";
import { CastEffectPayload } from "./effect-commons.interface";
import { IPayloadDefinition } from "./effect-payload.interface";
import { EffectName } from "./effects.constants";
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

  spawnActor(board, payload.effect, payload.effectData.payload);
}


export function getSpawnActorPayloadDefinitions(
  effect: ISpawnActor & IBoardSelector,
  board: Board
): IPayloadDefinition[] {

  return [{
    effectId: effect.id,
    amountOfTargets: calculateMaxAmountOfTargets(effect, board),
    gatheringSteps: [
      {
        dataName: 'field',
        possibleFields: board.getSelectedFields(effect),
      }
    ]
  }]
}


