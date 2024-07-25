import { IActionDeclaration, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { ResolvableReference } from "../../../../infrastructure/extensions/types";
import { IBoardObjectRotation, ICubeCoordinates  } from "../../board.interface";
import { BoardService } from "../../board.service";
import { IBoardAssignment, IBoardObject } from "../../entities/board-object/board-object.interface";
import { IPath } from "../../pathfinding/pathfinding.interface";

export const MODIFY_POSITION_BY_PATH_ACTION = "MODIFY_POSITION_BY_PATH_ACTION";

export interface IModifyPositionByPathActionPayload {
  target: ResolvableReference<IBoardObject>;
  rotation: ResolvableReference<IBoardObjectRotation>;
  path: IPath;
}

export interface IModifyPositionByPathActionProcess {
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

  public async *process(payload: IModifyPositionByPathActionPayload): AsyncGenerator<unknown, IModifyPositionByPathActionPayload, IModifyPositionByPathActionProcess> {
    for (let segment of payload.path.segments) {
      this._boardService.move(payload.target as IBoardObject, segment);
      if (segment.isDestination) {
        segment.rotation = payload.rotation as IBoardObjectRotation;
        (payload.target as IBoardObject & IBoardAssignment).rotation = segment.rotation;
      }
      yield {
        target: payload.target,
        position: segment.position,
        rotation: segment.rotation,
        delegateId: MODIFY_POSITION_BY_PATH_ACTION
      }
    }
    return payload;
  }
  
}