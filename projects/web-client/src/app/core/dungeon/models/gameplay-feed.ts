import { IPlayer } from "./player";
import { IGameDataDto } from "./game-data.dto";

export interface IGameplayFeed {
  players: IPlayer[],
  gameData: IGameDataDto,
}