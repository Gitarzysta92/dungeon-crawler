import { Guid } from "../../infrastructure/extensions/types";
import { ICard } from "./entities/card/card.interface";

export interface ICardsDeckDataFeed {
  getCards: (ids?: Guid[]) => Promise<ICard[]>;
}


