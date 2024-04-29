import { IHeroDeclaration } from "@game-logic/gameplay/modules/heroes/entities/hero/hero.interface";
import IBuilderStep from "./builder-step.interface";
import { IAdventureTemplate } from "@game-logic/gameplay/modules/adventure/adventure.interface";


export interface IGameBuilderState {
  hero: IHeroDeclaration;
  adventure: IAdventureTemplate;
  steps: IBuilderStep[];
  currentStepIndex: number;
}
