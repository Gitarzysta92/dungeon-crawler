import { IActivitySubject, IActivitySubjectDeclaration } from "../../../../base/activity/activity.interface";
import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IModificable, IModificableDeclaration } from "../../../../cross-cutting/modifier/modifier.interface";
import { Guid } from "../../../../infrastructure/extensions/types";
import { IStatisticBearer } from "../bearer/statistic-bearer.interface";


export interface IStatistic extends Omit<IStatisticDeclaration, 'activities' | 'entities'>, Omit<Partial<IActivitySubject>, 'isMixin'>, IEntity, IModificable {
  statisticBearer?: WeakRef<IStatisticBearer>;
  readonly value: number;
  add(value: number): void;
  subtract(value: number): number;
  improve(value: number): void;
  setback(value: number): void;
  regain(value?: number): void;
}
export interface IStatisticDeclaration extends IEntityDeclaration, IModificableDeclaration, Omit<Partial<IActivitySubjectDeclaration>, 'isMixin'> {
  id: Guid;
  isStatistic: true;
  maxBaseValue?: number;
  minBaseValue?: number;
  baseValue: number;
};
