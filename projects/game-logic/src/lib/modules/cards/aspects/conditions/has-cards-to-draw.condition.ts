import { IActionDeclaration } from "../../../../cross-cutting/action/action.interface";
import { IConditionHandler } from "../../../../cross-cutting/condition/condition.interface";
import { IDeckBearer } from "../../entities/deck-bearer/deck-bearer.interface";


export const HAS_NO_CARDS_TO_DRAW = "HAS_NO_CARDS_TO_DRAW";

export interface IHasNoCardsToDrawConditionPayload {
  bearer: IDeckBearer;
}

export class HasNoCardsToDrawHandler implements IConditionHandler<IHasNoCardsToDrawConditionPayload> {
  public delegateId = HAS_NO_CARDS_TO_DRAW;


  public isApplicableTo(d: IActionDeclaration<IHasNoCardsToDrawConditionPayload>): boolean {
    return d.delegateId === this.delegateId;
  }

  public process(payload: IHasNoCardsToDrawConditionPayload): boolean {
    if (!payload.bearer) {
      throw new Error("Cards bearer not provided.")
    }
    return payload.bearer.drawPile.pile.length <= 0;
  }
}