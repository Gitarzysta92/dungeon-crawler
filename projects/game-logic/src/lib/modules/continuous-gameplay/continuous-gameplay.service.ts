import { IPlayer } from "../../base/player/players.interface";
import { IContinuousGameplayState } from "./continuous-gameplay.interface";

export class ContinuousGameplayService implements IContinuousGameplayState {
  player: IPlayer;
  currentDay: number;

  constructor() { 
    // this.player = data.player;
    // this.currentDay = data.currentDay;
  }

}