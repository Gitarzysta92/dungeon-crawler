import { IPlayer } from "../../../lib/base/player/players.interface";
import { Guid } from "../../../lib/extensions/types";
import { IAreaOccupier } from "../../../lib/modules/areas/entities/occupier/occupier.interface";
import { IAreasDataFeed } from "../../../lib/modules/areas/areas.interface";
import { IContinuousGameplayState } from "../../../lib/modules/continuous-gameplay/continuous-gameplay.interface";
import { IGameplaySharedState, IGameplaySharedDataFeed } from "../../shared/gameplay-shared.interface";
import { IAdventureGameplayTemplateDataFeed } from "../adventure.interface";


export type IAdventureGameplayState =
  IContinuousGameplayState &
  IGameplaySharedState &
  { entities:  Array<Partial<IAreaOccupier>> }


export type IAdventureGameplayPayload = {
  adventureId: Guid;
  player: IPlayer;
};


export type IAdventureGameplayFeed =
  IAdventureGameplayTemplateDataFeed &
  IAreasDataFeed &
  IGameplaySharedDataFeed; 
