import { ITravelState } from "../../../framework/modules/area/travel/travel.interface";
import { IAreaObject } from "../../../framework/modules/area/area-object/area-object.interface";
import { IGameplaySharedDataFeed, IGameplaySharedState } from "../gameplay-shared.interface";
import { IPlayer } from "../../../framework/base/player/players.interface";
import { IHero } from "../../hero.interface";
import { Guid } from "../../../framework/extensions/types";
import { IAdventureGameplayTemplateDataFeed } from "../adventure.interface";
import { IAreasDataFeed } from "../../entities/areas/areas.interface";
import { IContinuousGameplayState } from "../../../framework/modules/playstyle/continuous/continuous-gameplay.interface";


export type IAdventureGameplayState =
  IContinuousGameplayState &
  IGameplaySharedState &
  { entities:  Array<Partial<IAreaObject>> } &
  ITravelState;


export type IAdventureGameplayPayload = {
  adventureId: Guid;
  player: IPlayer;
  hero: IHero;
};


export type IAdventureGameplayFeed =
  IAdventureGameplayTemplateDataFeed &
  IAreasDataFeed &
  IGameplaySharedDataFeed; 
