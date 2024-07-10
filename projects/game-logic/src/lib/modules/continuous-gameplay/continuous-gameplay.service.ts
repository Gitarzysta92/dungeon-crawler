import { IPlayer, IPlayerDeclaration } from "../../base/player/players.interface";
import { IContinuousGameplayState } from "./continuous-gameplay.interface";

export class ContinuousGameplayService implements IContinuousGameplayState {
  player: IPlayerDeclaration;
  currentDay: number;

  constructor() { 
    // this.player = data.player;
    // this.currentDay = data.currentDay;
  }

  hydrate(d: IContinuousGameplayState) {
    this.player = d.player;
    this.currentDay = d.currentDay;
  }

}