import { IActorsState } from "./actors.interface";
import { ActorsStateHandler } from "./actors.state-handler";

export class ActorsFactory {
  static initializeActorsState(state: IActorsState): ActorsStateHandler {
    return {} as ActorsStateHandler;
  }
}