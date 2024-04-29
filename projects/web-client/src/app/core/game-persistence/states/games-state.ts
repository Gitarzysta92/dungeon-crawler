import { Guid } from "@game-logic/lib/extensions/types";
import { IGameSave } from "../interfaces/persisted-game.interface";

export class GamesState {
  selectedGameSaveId: Guid | null;
  savedGames: IGameSave[] = [];
}