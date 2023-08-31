import { Board } from "../board/board";
import { IBoardSelector } from "../board/board.interface";
import { ISpawnActor, ISpawnDeclaration } from "./spawn-actor.interface";



export function spawnActor(board: Board, action: ISpawnActor & IBoardSelector, declarations: ISpawnDeclaration[]) {
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