import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IActivityResourceProvider } from "../../../../base/activity/activity.interface";
import { IStatistic, IStatisticDeclaration } from "../statistic/statistic.interface";

export interface IStatisticBearer extends IStatisticBearerDeclaration, IActivityResourceProvider {
  calculateStatistics(): this;
  getCalculatedStatistics(): IStatistic[];
  getCalculatedStatistic(statisticId: string): IStatistic | undefined;
  getStatisticById(statisticId: string): IStatistic | undefined;
  hasStatistic(statisticId: string): boolean;
}
export type IStatisticBearerDeclaration = { [key: string]: IStatisticDeclaration | unknown } &
  { isStatisticBearer: true; } &
  IEntityDeclaration;



  // export type IStatisticBearerDeclaration<T extends Array<string>> =
  // Record<T[number], IStatisticDeclaration> & { isStatisticBearer: true; } &
  // IEntityDeclaration;
