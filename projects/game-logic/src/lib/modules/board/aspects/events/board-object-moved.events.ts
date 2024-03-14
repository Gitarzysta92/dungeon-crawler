import { EventBase } from "../../../../cross-cutting/event/event";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { IBoardField } from "../../entities/board-field/board-field.interface";
import { IBoardObject } from "../../entities/board-object/board-object.interface";

export const BOARD_OBJECT_MOVED_EVENT = "BOARD_OBJECT_MOVED_EVENT";

export interface IBoardObjectMovedEventPayload {
  boardObject: IBoardObject;
  boardField: IBoardField;
}

export class BoardObjectMovedEvent extends EventBase {
  public delegateId = BOARD_OBJECT_MOVED_EVENT;

  constructor(
    private readonly _boardObject: IBoardObject,
  ) {
    super();
  }

  public isApplicableTo(d: IEventListenerDeclaration<IBoardObjectMovedEventPayload>): boolean {
    const isApplicable = d.delegateId === this.delegateId && this._boardObject === d.payload.boardObject;
    return isApplicable && this._boardObject.isAssigned(d.payload.boardField.position);
  }
}