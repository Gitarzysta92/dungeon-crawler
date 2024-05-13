import { IHeroDeclaration } from "@game-logic/gameplay/modules/heroes/mixins/hero/hero.interface";
import IBuilderStep from "./builder-step.interface";
import { IAdventureMap } from "@game-logic/gameplay/modules/adventure/mixins/adventure-map/adventure-map.interface";


export interface IGameBuilderState {
  hero: IHeroDeclaration;
  adventure: IAdventureMap;
  steps: IBuilderStep[];
  currentStepId: number;
}
