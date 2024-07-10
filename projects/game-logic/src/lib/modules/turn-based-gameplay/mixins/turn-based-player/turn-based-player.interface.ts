import { IPlayer } from "../../../../base/player/players.interface";
import { ITurnBasedGameplay } from "../../turn-based-gameplay.interface";

export interface ITurnGameplayPlayer extends IPlayer {
  finishTurn(state: ITurnBasedGameplay): ITurnGameplayPlayer;
}