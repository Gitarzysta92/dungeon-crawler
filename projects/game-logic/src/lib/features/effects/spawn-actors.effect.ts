import { Board } from "../board/board";
import { IBoardCoordinates, IBoardSelector } from "../board/board.interface";
import { ISpawnActor } from "./effects.interface";

export interface SpawnDeclaration {
  coords: IBoardCoordinates,
  actorId: string
}

export function spawnActor(board: Board, action: ISpawnActor & IBoardSelector, declarations: SpawnDeclaration[]) {
  const fields = board.getSelectedFields(action);
  
  if (fields.length <= 0) {
    throw new Error('There are no actors for given board selector')
  }

  if (!declarations.every(f => fields.some(d => d.coords === f.coords))) {
    throw new Error('')
  }

  declarations.forEach(d => {
    board.assignObject(d.actorId, d.coords);
  });
}