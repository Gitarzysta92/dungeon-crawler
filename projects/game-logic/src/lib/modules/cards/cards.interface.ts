import { Guid } from "../../infrastructure/extensions/types";
import { ICard, ICardDeclaration } from "./entities/card/card.interface";

export interface ICardsDeckDataFeed {
  getCards: (ids?: Guid[]) => Promise<ICardDeclaration[]>;
  getCard: (id: Guid) => Promise<ICardDeclaration>;
}


