import { IHeroClassDeclaration } from "../mixins/hero-class/hero-class.interface";
import { IHeroOriginDeclaration } from "../mixins/hero-origin/hero-origin.interface";
import { IHeroRaceDeclaration } from "../mixins/hero-race/hero-race.interface";

export interface IHeroRecipe {
  race: IHeroRaceDeclaration;
  class: IHeroClassDeclaration;
  origin: IHeroOriginDeclaration;
}