import { IHeroDeclaration } from "@game-logic/gameplay/modules/heroes/mixins/hero/hero.interface";
import IBuilderStep from "./builder-step.interface";
import { IAdventureGameplayDeclaration } from "@game-logic/gameplay/modules/adventure/adventure.interface";



export interface IGameBuilderState {
  hero: IHeroDeclaration;
  adventure: IAdventureGameplayDeclaration;
  steps: IBuilderStep[];
  currentStepId: number;
}
