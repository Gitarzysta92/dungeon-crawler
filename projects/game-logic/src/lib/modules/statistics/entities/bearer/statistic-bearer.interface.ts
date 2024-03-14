import { IEntity } from "../../../../base/entity/entity.interface";
import { IInteractionResourceProvider } from "../../../../cross-cutting/interaction/interaction.interface";
import { IStatistic, IStatisticDeclaration } from "../statistic/statistic.interface";

export interface IStatisticBearer extends IStatisticBearerDeclaration<[]>, IInteractionResourceProvider {
  calculateStatistics(): this;
  getCalculatedStatistics(): IStatistic[];
  getCalculatedStatistic(statisticId: string): IStatistic | undefined;
  getStatisticById(statisticId: string): IStatistic | undefined;
}
export type IStatisticBearerDeclaration<T extends Array<string>> =
  Record<T[number], IStatisticDeclaration> & { isStatisticBearer: true; } &
  IEntity;
