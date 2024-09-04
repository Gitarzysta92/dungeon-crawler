import { IActionDeclaration, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { IBoardObjectRotation, ICubeCoordinates  } from "../../board.interface";
import { BoardService } from "../../board.service";
import { IBoardAssignment, IBoardObject } from "../../entities/board-object/board-object.interface";
import { IPath } from "../../pathfinding/pathfinding.interface";

export const MODIFY_POSITION_BY_PATH_ACTION = "MODIFY_POSITION_BY_PATH_ACTION";

export interface IModifyPositionByPathActionPayload {
  target: IBoardObject & IBoardAssignment;
  rotation: IBoardObjectRotation;
  path: IPath;
}

export interface IModifyPositionByPathActionResult {
  target: IBoardObject,
  position: ICubeCoordinates,
  rotation: IBoardObjectRotation,
  delegateId: typeof MODIFY_POSITION_BY_PATH_ACTION
}

export class ModifyPositionByPathActionHandler implements IActionHandler<IModifyPositionByPathActionPayload> {

  public delegateId: string = MODIFY_POSITION_BY_PATH_ACTION;

  constructor(
    private readonly _boardService: BoardService
  ) { }
  
  public isApplicableTo(m: IActionDeclaration<IModifyPositionByPathActionPayload>): boolean {
    return this.delegateId === m.delegateId;
  }

  public canBeProcessed(payload: IModifyPositionByPathActionPayload): boolean {
    return true;
  }

  public async *process(payload: IModifyPositionByPathActionPayload): AsyncGenerator<unknown, IModifyPositionByPathActionPayload, IModifyPositionByPathActionResult> {
    for (let segment of payload.path.segments) {
      this._boardService.move(payload.target, segment);
      payload.target.rotation = segment.rotation;
      yield {
        target: payload.target,
        position: segment.position,
        rotation: payload.target.rotation,
        delegateId: MODIFY_POSITION_BY_PATH_ACTION
      }
    }

    payload.target.rotation = payload.rotation;
    yield {
      target: payload.target,
      position: payload.target.position,
      rotation: payload.target.rotation,
      delegateId: MODIFY_POSITION_BY_PATH_ACTION
    }

    return payload;
  }
  
}