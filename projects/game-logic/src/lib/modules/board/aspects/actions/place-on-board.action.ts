import { IDelegateDeclaration } from "../../../../base/delegate/delegate.interface";
import { IActionDefaultPayload, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { JsonPathResolver } from "../../../../extensions/json-path";
import { ResolvableReference } from "../../../../extensions/types";
import { BoardField } from "../../board-field/board-field";
import { BoardObject } from "../../board-object/board-object";
import { IBoardObject, IBoardField } from "../../board.interface";


export const PLACE_ON_BOARD_ACTION_HANDLER_IDENTIFIER = "PLACE_ON_BOARD_ACTION_HANDLER_IDENTIFIER";

export interface IPlaceOnBoardActionPayload extends IActionDefaultPayload {
  target: ResolvableReference<IBoardObject>;
  field: IBoardField;
}


export class PlaceOnBoardActionHandler implements IActionHandler<IPlaceOnBoardActionPayload> {

  public delegateId: string = PLACE_ON_BOARD_ACTION_HANDLER_IDENTIFIER;
  
  public isApplicableTo(m: IDelegateDeclaration<IPlaceOnBoardActionPayload>): boolean {
    return this.delegateId === m.delegateId;
  }

  public prepare(
    d: IPlaceOnBoardActionPayload,
    ctx: unknown
  ): PlaceOnBoardActionPayload {
    return new PlaceOnBoardActionPayload(JsonPathResolver.resolve(d, ctx));
  };

  public async process(payload: PlaceOnBoardActionPayload): Promise<void> {
    payload.target.assign(payload.field);
  }
  
}


export class PlaceOnBoardActionPayload {
  value: number;
  path: any[];
  target: BoardObject;
  field: BoardField;

  constructor(_p: IPlaceOnBoardActionPayload) {
    this.field = _p.field as BoardField;
    this.target = _p.target as BoardObject;
  }
}

