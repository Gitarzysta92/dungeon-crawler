import { Guid } from "../../../lib/infrastructure/extensions/types";
import { IHeroClassDeclaration } from "./mixins/hero-class/hero-class.interface";
import { IHeroOriginDeclaration } from "./mixins/hero-origin/hero-origin.interface";
import { IHeroRaceDeclaration } from "./mixins/hero-race/hero-race.interface";
import { IHeroDeclaration } from "./mixins/hero/hero.interface";

export interface IHeroesDataFeed {
  getHeroRaces: (ids?: Guid[]) => Promise<IHeroRaceDeclaration[]>;
  getHeroRace: (id: Guid) => Promise<IHeroRaceDeclaration>;
  getHeroClasses: (ids?: Guid[]) => Promise<IHeroClassDeclaration[]>;
  getHeroClass: (id: Guid) => Promise<IHeroClassDeclaration>;
  getHeroOrigins: (ids?: Guid[]) => Promise<IHeroOriginDeclaration[]>;
  getHeroOrigin: (id: Guid) => Promise<IHeroOriginDeclaration>;
  getHeroTemplate: () => Promise<IHeroDeclaration>;
}

