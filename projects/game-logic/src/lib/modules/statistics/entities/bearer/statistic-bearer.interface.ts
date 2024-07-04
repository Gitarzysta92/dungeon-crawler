import { IActivityResourceProvider } from "../../../../base/activity/activity.interface";
import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IStatistic, IStatisticDeclaration } from "../statistic/statistic.interface";

export interface IStatisticBearer extends IActivityResourceProvider, IStatisticBearerDeclaration, IEntityDeclaration {
  statistic: { [key: string]: IStatistic }
  calculateStatistics(): this;
  getCalculatedStatistics(): IStatistic[];
  getCalculatedStatistic(statisticId: string): IStatistic | undefined;
  getStatisticById(statisticId: string): IStatistic | undefined;
  hasStatistic(statisticId: string): boolean;
}


export interface IStatisticBearerDeclaration {
  isStatisticBearer: true;
  statistic: { [key: string]: IStatisticDeclaration }
}
