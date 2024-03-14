import { IEntity } from "../../../../base/entity/entity.interface";
import { Guid } from "../../../../extensions/types";

export interface IDefeater extends IEntity {
  id: Guid;
}

export interface IDefeatIndicator {
  value?: number;
  defeatTreshold: number;
  isDefeatIndicator: boolean;
}

export type IDefeatable<T extends Array<string>> = {
  isDefeated: boolean;
  defeater: IDefeater;
  defeaterId?: Guid;
} & IDefeatableDeclaration<T>;


export type IDefeatableDeclaration<T extends Array<string>> = {
  isDefeatable: true;
  defeaterId?: Guid;
} & Record<T[number], IDefeatIndicator> & IEntity;