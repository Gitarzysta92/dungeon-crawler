
import { IActionDeclaration, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { ResolvableReference } from "../../../../infrastructure/extensions/types";
import { IBoardAssignment, IBoardObject } from "../../entities/board-object/board-object.interface";


export const PLACE_ON_BOARD_ACTION = "PLACE_ON_BOARD_ACTION";

export interface IPlaceOnBoardActionPayload {
  target: ResolvableReference<IBoardObject>;
  assignment: IBoardAssignment;
}


export class PlaceOnBoardActionHandler implements IActionHandler<IPlaceOnBoardActionPayload> {

  public delegateId: string = PLACE_ON_BOARD_ACTION;
  
  public isApplicableTo(m: IActionDeclaration<IPlaceOnBoardActionPayload>): boolean {
    return this.delegateId === m.delegateId;
  }

  public canBeProcessed(payload: IPlaceOnBoardActionPayload): boolean {
    return true;
  }

  public async process(payload: IPlaceOnBoardActionPayload): Promise<void> {
    (payload.target as IBoardObject).assign(payload.assignment);
  }
  
}