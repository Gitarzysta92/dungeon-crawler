import { IActivityDoer } from "../../../../base/activity/activity.interface";
import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IModifierExposer } from "../../../../cross-cutting/modifier/modifier.interface";
import { IStatistic } from "../../../statistics/entities/statistic/statistic.interface";


export interface IStatisticBearer extends IActivityDoer, IStatisticBearerDeclaration, IEntityDeclaration, IModifierExposer {
  statistic: { [key: string]: IStatistic }
  statistics: IStatistic[];
  calculateStatistics(): this;
  getCalculatedStatistics(): IStatistic[];
  getCalculatedStatistic(statisticId: string): IStatistic | undefined;
  getStatisticById(statisticId: string): IStatistic | undefined;
  hasStatistic(statisticId: string): boolean;
}


export interface IStatisticBearerDeclaration {
  isStatisticBearer: true;
}
