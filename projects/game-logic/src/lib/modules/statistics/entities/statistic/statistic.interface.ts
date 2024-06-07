import { IActivitySubject, IActivitySubjectDeclaration } from "../../../../base/activity/activity.interface";
import { IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { IModificable } from "../../../../cross-cutting/modifier/modifier.interface";
import { IClonable } from "../../../../infrastructure/extensions/interfaces";
import { Guid } from "../../../../infrastructure/extensions/types";
import { StatisticType } from "../../statistics.constants";
import { IStatisticBearer } from "../bearer/statistic-bearer.interface";

export interface IStatistic extends Omit<IStatisticDeclaration, 'activities'>, IClonable<IStatistic>, IModificable, Omit<Partial<IActivitySubject>, 'isMixin'> {
  statisticBearer?: WeakRef<IStatisticBearer>;
  isImprovable: boolean;
  add(value: number): void;
  subtract(value: number): void;
  improve(value: number): void;
  setback(value: number): void;
  regain(value?: number): void;
  calculate(): this;
}
export interface IStatisticDeclaration extends IModificable, IEntityDeclaration, Omit<Partial<IActivitySubjectDeclaration>, 'isMixin'> {
  id: Guid;
  type: StatisticType;
  isStatistic: true;
  value?: number;
  baseValue?: number;
  regainValue?: number;
  regainWhen?: IEventListenerDeclaration<unknown>[];
};
