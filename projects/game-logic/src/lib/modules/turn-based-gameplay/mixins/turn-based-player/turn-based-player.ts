import { Player } from "../../../../base/player/player";
import { ITurnBasedGameplay } from "../../turn-based-gameplay.interface";
import { ITurnGameplayPlayer } from "./turn-based-player.interface";


export class TurnGameplayPlayer extends Player implements ITurnGameplayPlayer {

  constructor(data: ITurnGameplayPlayer) {
    super(data);
  }

  public finishTurn(state: ITurnBasedGameplay): ITurnGameplayPlayer {
    return state.nextTurn();
  } 
}