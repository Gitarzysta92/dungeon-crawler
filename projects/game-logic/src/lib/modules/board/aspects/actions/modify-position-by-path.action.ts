import { IActionDeclaration, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { ResolvableReference } from "../../../../infrastructure/extensions/types";
import { BoardService } from "../../board.service";
import { IBoardObject } from "../../entities/board-object/board-object.interface";
import { IPath } from "../../pathfinding/pathfinding.interface";



export const MODIFY_POSITION_BY_PATH_ACTION = "MODIFY_POSITION_BY_PATH_ACTION";

export interface IModifyPositionByPathActionPayload {
  target: ResolvableReference<IBoardObject>;
  path: IPath;
}

export class ModifyPositionByPathActionHandler implements IActionHandler<IModifyPositionByPathActionPayload> {

  public delegateId: string = MODIFY_POSITION_BY_PATH_ACTION;

  constructor(
    private readonly _boardService: BoardService
  ) { }
  
  public isApplicableTo(m: IActionDeclaration<IModifyPositionByPathActionPayload>): boolean {
    return this.delegateId === m.delegateId;
  }

  public async process(payload: IModifyPositionByPathActionPayload): Promise<void> {
    for (let segment of payload.path.segments) {
      this._boardService.move(payload.target as IBoardObject, segment);
    }
  }
  
}