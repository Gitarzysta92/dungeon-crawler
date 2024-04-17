import { IState } from "@game-logic/lib/base/state/state.interface";
import { IGameBuilderStateDto } from "./game-builder-state.interface";

export class GameBuilderState implements IState {
  prevState: object;
  constructor(s: IGameBuilderStateDto) {
    Object.assign(s);
  }
}


export class BuilderStep {

}