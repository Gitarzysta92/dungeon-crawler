import { IHeroClassDeclaration } from "../mixins/hero-class/hero-class.interface";
import { IHeroOriginDeclaration } from "../mixins/hero-origin/hero-origin.interface";
import { IHeroRaceDeclaration } from "../mixins/hero-race/hero-race.interface";

export interface IHeroRecipe {
  heroName: string;
  heroRace: IHeroRaceDeclaration;
  heroClass: IHeroClassDeclaration;
  heroOrigin: IHeroOriginDeclaration;
}

export interface IHeroBuilderStep<T> {
  items: Array<{ isSelected: boolean } & T>;
  isFulfilled: boolean;
  stepName: string;
}