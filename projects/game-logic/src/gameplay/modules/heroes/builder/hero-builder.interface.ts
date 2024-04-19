import { IHeroOriginDeclaration } from "../entities/hero-origin/hero-origin.interface";
import { IHeroRaceDeclaration } from "../entities/hero-race/hero-race.interface";
import { IHeroClassDeclaration } from "../entities/hero-class/hero-class.interface";

export interface IHeroRecipe {
  heroName: string;
  heroRace: IHeroRaceDeclaration;
  heroClass: IHeroClassDeclaration;
  heroOrigin: IHeroOriginDeclaration;
}