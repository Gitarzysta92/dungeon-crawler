import { IDelegateDeclaration } from "../../../../base/delegate/delegate.interface";
import { IActionDefaultPayload, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { JsonPathResolver } from "../../../../extensions/json-path";
import { ResolvableReference } from "../../../../extensions/types";
import { IBoardObject } from "../../board.interface";
import { BoardService } from "../../board.service";
import { IPath } from "../../pathfinding/pathfinding.interface";



export const MODIFY_POSITION_BY_PATH_ACTION_HANDLER_IDENTIFIER = "MODIFY_POSITION_BY_PATH_ACTION_HANDLER_IDENTIFIER";

export interface IModifyPositionByPathActionPayload extends IActionDefaultPayload {
  target: ResolvableReference<IBoardObject>;
  path?: IPath[];
}

export class ModifyPositionByPathActionHandler implements IActionHandler<IModifyPositionByPathActionPayload> {

  public delegateId: string = MODIFY_POSITION_BY_PATH_ACTION_HANDLER_IDENTIFIER;

  constructor(
    private readonly _boardService: BoardService
  ) { }
  
  public isApplicableTo(m: IDelegateDeclaration<IModifyPositionByPathActionPayload>): boolean {
    return this.delegateId === m.delegateId;
  }

  public prepare(
    d: IModifyPositionByPathActionPayload,
    ctx: unknown
  ): ModifyPositionByPathActionPayload {
    return new ModifyPositionByPathActionPayload(JsonPathResolver.resolve(d, ctx));
  };

  public async process(payload: ModifyPositionByPathActionPayload): Promise<void> {
    for (let segment of payload.path) {
      this._boardService.move(payload.target, segment);
    }
  }
  
}


export class ModifyPositionByPathActionPayload {
  value: number;
  path: any[];
  target: any;

  constructor(
    _p: IModifyPositionByPathActionPayload
  ) {
  }
}


