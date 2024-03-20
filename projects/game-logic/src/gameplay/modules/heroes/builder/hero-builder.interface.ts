import { IHeroClassDeclaration, IHeroOriginDeclaration, IHeroRaceDeclaration } from "../heroes.interface";

export interface IHeroRecipe {
  heroName: string;
  heroRace: IHeroRaceDeclaration;
  heroClass: IHeroClassDeclaration;
  heroOrigin: IHeroOriginDeclaration;
}