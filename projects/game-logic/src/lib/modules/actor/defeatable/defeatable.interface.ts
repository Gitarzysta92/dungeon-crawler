import { IEntity } from "../../../base/entity/entity.interface";
import { Guid } from "../../../extensions/types";

export type IDefeatable<T extends Array<string>> = {
  isDefeatable: true;
  isDefeated?: boolean;
  defeater?: IDefeater;
} & Record<T[number], IDefeatIndicator> & IEntity;

export interface IDefeatIndicator {
  value?: number;
  defeatTreshold: number;
}

export interface IDefeater {
  id: Guid;
}

