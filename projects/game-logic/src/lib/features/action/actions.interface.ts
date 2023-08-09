import { ActorType } from "../actors/actor.constants";
import { IAreaSelector } from "../adventure/area.interface";
import { IBoardSelector } from "../board/board.interface";

export interface IUtilizationCost {
  costType: 'source' | 'majorAction' | 'minorAction',
  costValue: number;
}

export interface IAction {
  id: string;
  name: string;
  targetingActor: ActorType[];
  utilizationCosts?: IUtilizationCost[],
  boardSelector?: IBoardSelector,
  areaSelector?: IAreaSelector
}