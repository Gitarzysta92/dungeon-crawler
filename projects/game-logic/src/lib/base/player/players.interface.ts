import { Guid } from "../../infrastructure/extensions/types";
import { IActivity } from "../activity/activity.interface";
import { IGame } from "../game/game.interface";
import { PlayerType } from "./players.constants";

export interface IPlayer extends IPlayerDeclaration {
  isAnyActivityAvailable(game: IGame, activities: IActivity[]): boolean;
}

export interface IPlayerDeclaration {
  id: Guid;
  playerType: PlayerType;
  groupId: Guid;
  selectedPawnId?: Guid;
}