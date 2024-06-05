import { IGame } from "@game-logic/lib/base/game/game.interface";

export interface IPersistableGame extends IGame {
  persistedGameDataId: string;
}