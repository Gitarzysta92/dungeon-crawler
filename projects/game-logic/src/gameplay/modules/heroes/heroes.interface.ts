import { Guid } from "../../../lib/extensions/types";
import { Size, Side } from "../../../lib/modules/board/entities/board-object/board-object.constants";
import { IHeroDeclaration } from "./entities/hero/hero.interface";

export interface IHeroRaceDeclaration {
  id: Guid;
  size: Size;
  outlets: Side[];
  statistics: { key: string; value: number; }[];
  abilityIds: Guid[];
  perkIds: Guid[];
  //items: { itemId: Guid, amount: number, slotId: Guid; }[];
}

export interface IHeroClassDeclaration {
  id: Guid;
  abilityIds: Guid[];
  perkIds: Guid[];
  //items: { itemId: Guid, amount: number, slotId: Guid; }[]; 
}

export interface IHeroOriginDeclaration {
  id: Guid;
  startingAreaId: Guid;
  activeQuestIds: Guid[];
}

export interface IHeroesDataFeed {
  getHeroRaces: (ids?: Guid[]) => Promise<IHeroRaceDeclaration[]>;
  getHeroRace: (id: Guid) => Promise<IHeroRaceDeclaration>;
  getHeroClasses: (ids?: Guid[]) => Promise<IHeroClassDeclaration[]>;
  getHeroClass: (id: Guid) => Promise<IHeroClassDeclaration>;
  getHeroOrigins: (ids?: Guid[]) => Promise<IHeroOriginDeclaration[]>;
  getHeroOrigin: (id: Guid) => Promise<IHeroOriginDeclaration>;
  getHeroTemplate: () => Promise<IHeroDeclaration>;
}

