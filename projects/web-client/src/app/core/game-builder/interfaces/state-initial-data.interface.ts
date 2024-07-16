
import { IAdventureGameplayDeclaration } from "@game-logic/gameplay/modules/adventure/adventure.interface";
import { IHeroClassDeclaration } from "@game-logic/gameplay/modules/heroes/mixins/hero-class/hero-class.interface";
import { IHeroOriginDeclaration } from "@game-logic/gameplay/modules/heroes/mixins/hero-origin/hero-origin.interface";
import { IHeroRaceDeclaration } from "@game-logic/gameplay/modules/heroes/mixins/hero-race/hero-race.interface";
import { IHeroDeclaration } from "@game-logic/gameplay/modules/heroes/mixins/hero/hero.interface";

export interface IBuilderInitialData {
  hero: IHeroDeclaration,
  races: IHeroRaceDeclaration[],
  classes: IHeroClassDeclaration[],
  origins: IHeroOriginDeclaration[],
  adventureMap: IAdventureGameplayDeclaration

}