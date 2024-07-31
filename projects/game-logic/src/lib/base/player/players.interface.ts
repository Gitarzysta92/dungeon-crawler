import { Guid } from "../../infrastructure/extensions/types";
import { IActivity } from "../activity/activity.interface";
import { IEntity, IEntityDeclaration } from "../entity/entity.interface";
import { IGameplay } from "../gameplay/gameplay.interface";
import { PlayerType } from "./players.constants";

export interface IPlayer extends IPlayerState, IEntity {
  isAnyActivityAvailable(game: IGameplay, activities: IActivity[]): boolean;
}

export interface IPlayerState extends IPlayerDeclaration {
  selectedPawnId: Guid;
}

export interface IPlayerDeclaration extends IEntityDeclaration {
  id: Guid;
  isPlayer: true;
  playerType: PlayerType;
  groupId: Guid;
}


export interface IPlayerController {}