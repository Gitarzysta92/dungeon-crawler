import { ICard } from "./entities/deck/deck.interface";
import { Guid } from "../../extensions/types";


export interface ICardsDeckDataFeed {
  getCards: (ids?: Guid[]) => Promise<ICard[]>;
}
