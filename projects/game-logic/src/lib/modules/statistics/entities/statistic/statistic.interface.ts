import { IActivitySubject, IActivitySubjectDeclaration } from "../../../../base/activity/activity.interface";
import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IModificableDeclaration } from "../../../../cross-cutting/modifier/modifier.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { StatisticType } from "../../statistics.constants";
import { IStatisticBearer } from "../bearer/statistic-bearer.interface";

export interface IStatistic extends Omit<IStatisticDeclaration, 'activities' | 'entities'>, IModificableDeclaration, Omit<Partial<IActivitySubject>, 'isMixin'>, IEntity {
  statisticBearer?: WeakRef<IStatisticBearer>;
  isImprovable: boolean;
  isRegainable: boolean;
  add(value: number): void;
  subtract(value: number): number;
  improve(value: number): void;
  setback(value: number): void;
  regain(value?: number): void;
  calculate(): this;
}
export interface IStatisticDeclaration extends IModificableDeclaration, IEntityDeclaration, Omit<Partial<IActivitySubjectDeclaration>, 'isMixin'> {
  id: Guid;
  type: StatisticType;
  isStatistic: true;
  value?: number;
  baseValue?: number;
  regainValue?: number;
};
