import { IState } from "@game-logic/lib/base/state/state.interface";
import { IBuilderStep, IGameBuilderState } from "./game-builder-state.interface";
import { IHeroClassDeclaration } from "@game-logic/gameplay/modules/heroes/entities/hero-class/hero-class.interface";
import { IHeroOriginDeclaration } from "@game-logic/gameplay/modules/heroes/entities/hero-origin/hero-origin.interface";
import { IHeroRaceDeclaration } from "@game-logic/gameplay/modules/heroes/entities/hero-race/hero-race.interface";

export class GameBuilderState implements IState, IGameBuilderState {
  prevState: object;
  hero: any;
  steps: IBuilderStep<IHeroRaceDeclaration[] | IHeroClassDeclaration[] | IHeroOriginDeclaration[]>[] = [];
  currentStepIndex: number = 0;
  get currentStep() { return this.steps[this.currentStepIndex] };

  constructor(s: IGameBuilderState) {
    Object.assign(this, s);
  }
}