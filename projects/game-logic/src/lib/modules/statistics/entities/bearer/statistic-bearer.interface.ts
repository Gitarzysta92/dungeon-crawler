import { IActivityDoer } from "../../../../base/activity/activity.interface";
import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IValue } from "../../../../misc/value/value.interface";
import { IStatistic } from "../statistic/statistic.interface";

export interface IStatisticBearer extends IActivityDoer, IStatisticBearerDeclaration, IEntityDeclaration {
  statistics: IStatistic[];
  getCalculatedStatistics(): IStatistic[];
  getCalculatedStatistic(statisticId: string): IStatistic | undefined;
  getStatisticById(statisticId: string): IStatistic | undefined;
  hasStatistic(statisticId: string): boolean;
}


export interface IStatisticBearerDeclaration {
  isStatisticBearer: true;
}