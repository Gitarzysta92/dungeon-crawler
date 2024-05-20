import { IStatisticBearer } from "../bearer/statistic-bearer.interface";
import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IClonable } from "../../../../extensions/interfaces";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { StatisticType } from "../../statistics.constants";
import { IModificable } from "../../../../cross-cutting/modifier/modifier.interface";
import { Guid } from "../../../../extensions/types";

export interface IStatistic extends IStatisticDeclaration, IClonable<IStatistic>, IModificable {
  statisticBearer?: WeakRef<IStatisticBearer>;
  add(value: number): void;
  subtract(value: number): void;
  improve(value: number): void;
  setback(value: number): void;
  regain(value?: number): void;
  calculate(): this;
}
export interface IStatisticDeclaration extends IModificable, IEntityDeclaration{
  id: Guid;
  type: StatisticType;
  isStatistic: true;
  value?: number;
  baseValue?: number;
  regainValue?: number;
  regainWhen?: IEventListenerDeclaration<unknown>[];
};
