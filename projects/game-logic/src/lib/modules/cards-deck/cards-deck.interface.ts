import { Guid } from "../../infrastructure/extensions/types";
import { ICard } from "./entities/deck/deck.interface";


export interface ICardsDeckDataFeed {
  getCards: (ids?: Guid[]) => Promise<ICard[]>;
}
