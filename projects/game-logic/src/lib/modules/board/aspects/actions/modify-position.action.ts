import { IActionHandler, IActionDeclaration } from "../../../../cross-cutting/action/action.interface";
import { ResolvableReference } from "../../../../extensions/types";
import { IBoardObject, IBoardObjectDeclaration } from "../../entities/board-object/board-object.interface";
import { BoardService } from "../../board.service";
import { IPathSegment } from "../../pathfinding/pathfinding.interface";

export const MODIFY_POSITION_ACTION = "MODIFY_POSITION_ACTION";

export interface IModifyPositionActionPayload {
  target: ResolvableReference<IBoardObjectDeclaration>;
  coords?: IPathSegment;
}

export class ModifyPositionActionHandler implements IActionHandler<IModifyPositionActionPayload> {

  public delegateId: string = MODIFY_POSITION_ACTION;

  constructor(
    private readonly _boardService: BoardService
  ) { }
  
  public isApplicableTo(m: IActionDeclaration<IModifyPositionActionPayload>): boolean {
    return this.delegateId === m.delegateId;
  }

  public async process(payload: IModifyPositionActionPayload): Promise<void> {
    this._boardService.move(payload.target as IBoardObject, payload.coords as IPathSegment);
  }
  
}
