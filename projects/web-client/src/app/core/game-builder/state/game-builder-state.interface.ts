import { IHeroDeclaration } from "@game-logic/gameplay/modules/heroes/entities/hero/hero.interface";
import { IHeroClassDeclaration, IHeroOriginDeclaration, IHeroRaceDeclaration } from "@game-logic/gameplay/modules/heroes/heroes.interface";

export interface IGameBuilderStateDto {
  hero: IHeroDeclaration;
  heroRaces: IHeroRaceDeclaration[];
  heroOrigins: IHeroOriginDeclaration[];
  heroClasses: IHeroClassDeclaration[];
}