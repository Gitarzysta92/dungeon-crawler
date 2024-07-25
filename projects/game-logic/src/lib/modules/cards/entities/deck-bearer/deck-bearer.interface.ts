import { IActivityDoer } from "../../../../base/activity/activity.interface";
import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IPawnDeclaration } from "../../../../base/pawn/pawn.interface";
import { ICard } from "../card/card.interface";
import { IDeck, IDeckDeclaration } from "../deck/deck.interface";

export interface IDeckBearer extends IDeckBearerDeclaration, IActivityDoer {
  deck: IDeck;
}


export interface IDeckBearerDeclaration extends IEntityDeclaration, IPawnDeclaration {
  isDeckBearer: true;
  deck: IDeckDeclaration;
  cards: ICard[];
  drewCards?: boolean;
}