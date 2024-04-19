import { Guid } from "../../../lib/extensions/types";
import { IHeroClassDeclaration } from "./entities/hero-class/hero-class.interface";
import { IHeroOriginDeclaration } from "./entities/hero-origin/hero-origin.interface";
import { IHeroRaceDeclaration } from "./entities/hero-race/hero-race.interface";
import { IHeroDeclaration } from "./entities/hero/hero.interface";

export interface IHeroesDataFeed {
  getHeroRaces: (ids?: Guid[]) => Promise<IHeroRaceDeclaration[]>;
  getHeroRace: (id: Guid) => Promise<IHeroRaceDeclaration>;
  getHeroClasses: (ids?: Guid[]) => Promise<IHeroClassDeclaration[]>;
  getHeroClass: (id: Guid) => Promise<IHeroClassDeclaration>;
  getHeroOrigins: (ids?: Guid[]) => Promise<IHeroOriginDeclaration[]>;
  getHeroOrigin: (id: Guid) => Promise<IHeroOriginDeclaration>;
  getHeroTemplate: () => Promise<IHeroDeclaration>;
}

