import { Board } from "../board/board";
import { IBoardSelector } from "../board/board.interface";
import { CoordsHelper } from "../board/coords.helper";
import { IModifyPosition, IMoveDeclaration } from "./modify-position.interface";



export function modifyPosition(board: Board, action: IModifyPosition & IBoardSelector, declarations: IMoveDeclaration[]) {
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
