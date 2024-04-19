import { IHeroClassDeclaration } from "@game-logic/gameplay/modules/heroes/entities/hero-class/hero-class.interface";
import { IHeroOriginDeclaration } from "@game-logic/gameplay/modules/heroes/entities/hero-origin/hero-origin.interface";
import { IHeroRaceDeclaration } from "@game-logic/gameplay/modules/heroes/entities/hero-race/hero-race.interface";
import { IHeroDeclaration } from "@game-logic/gameplay/modules/heroes/entities/hero/hero.interface";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";
import { IVisualMedium } from "../../game-ui/entities/visual-medium/visual-medium.interface";


export interface IGameBuilderState {
  hero: IHeroDeclaration;
  steps: IBuilderStep<IHeroRaceDeclaration[] | IHeroOriginDeclaration[] | IHeroClassDeclaration[]>[];
}

export interface IBuilderStep<T> extends INarrationMedium, IVisualMedium {
  data: T
}

