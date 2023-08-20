import { Board } from "../board/board";
import { IBoardCoordinates, IBoardObjectRotation, IBoardSelector } from "../board/board.interface";
import { CoordsHelper } from "../board/coords.helper";
import { IModifyPosition } from "./effects.interface";

export interface MoveDeclaration {
  coords: IBoardCoordinates;
  actorId: string;
  rotation: IBoardObjectRotation;
}

export function moveActors(board: Board, action: IModifyPosition & IBoardSelector, declarations: MoveDeclaration[]) {
  for (let declaration of declarations) {
    const object = board.getObjectById(declaration.actorId);
    if (!object) {
      throw new Error("Object with given id has not exists on the board")
    }

    const fields = board.getSelectedFields(Object.assign({ ...action }, { selectorOrigin: object.position }));
    const targetField = fields.find(f => CoordsHelper.isCoordsEqual(f.coords, declaration.coords));
    if (!targetField) {
      throw new Error('Cannot select a field provided in the declaration. Field may be occupied or it not exits.')
    }

    board.moveObject(declaration.actorId, targetField);
  }
}
