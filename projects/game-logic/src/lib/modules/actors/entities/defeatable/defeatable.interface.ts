import { exterminateRatsQuest } from "../../../../../gameplay/data/quests.data";
import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { Guid, ResolvableReference } from "../../../../infrastructure/extensions/types";

export interface IDefeater extends IEntityDeclaration {
  id: Guid;
}

export interface IDefeatIndicator {
  value?: number;
  defeatTreshold: number;
  isDefeatIndicator: boolean;
}

export interface IDefeatable extends IDefeatableDeclaration {
  isDefeated: boolean;
  defeater: IDefeater;
  defeaterId?: Guid;
} 


export interface IDefeatableDeclaration {
  isDefeatable: true;
  defeatIndicators: ResolvableReference<IDefeatIndicator>[]
}


