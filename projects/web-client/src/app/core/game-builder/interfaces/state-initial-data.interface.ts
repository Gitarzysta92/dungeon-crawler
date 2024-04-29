import { IAdventureTemplate } from "@game-logic/gameplay/modules/adventure/adventure.interface";
import { IHeroClassDeclaration } from "@game-logic/gameplay/modules/heroes/entities/hero-class/hero-class.interface";
import { IHeroOriginDeclaration } from "@game-logic/gameplay/modules/heroes/entities/hero-origin/hero-origin.interface";
import { IHeroRaceDeclaration } from "@game-logic/gameplay/modules/heroes/entities/hero-race/hero-race.interface";
import { IHeroDeclaration } from "@game-logic/gameplay/modules/heroes/entities/hero/hero.interface";

export interface IStateInitialData {
  hero: IHeroDeclaration,
  races: IHeroRaceDeclaration[],
  classes: IHeroClassDeclaration[],
  origins: IHeroOriginDeclaration[],
  adventureTemplate: IAdventureTemplate

}