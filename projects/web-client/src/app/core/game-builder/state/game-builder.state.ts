import { IHero } from "@game-logic/gameplay/modules/heroes/entities/hero/hero.interface";
import { IState } from "@game-logic/lib/base/state/state.interface";

export class GameBuilderState implements IState {
  
  prevState: object;
  
  getSelectedHero(): IHero {
    throw new Error("Method not implemented.");
  }
  
}


export class BuilderStep {
  
}