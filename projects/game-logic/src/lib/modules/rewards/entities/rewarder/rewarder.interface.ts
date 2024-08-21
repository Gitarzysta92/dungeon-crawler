import { IActivitySubject, IActivitySubjectDeclaration } from "../../../../base/activity/activity.interface";
import { IEntity, IEntityDeclaration } from "../../../../base/entity/entity.interface";
import { IActionDeclaration } from "../../../../cross-cutting/action/action.interface";


export interface IRewarder extends
  Omit<IRewarderDeclaration, 'entities' | 'activities'>, IEntity,
  Partial<Omit<IActivitySubject, 'isMixin'>> {
  rewards: IActionDeclaration<unknown>[];
  isRewarder: true;
}

export interface IRewarderDeclaration extends IEntityDeclaration, Partial<Omit<IActivitySubjectDeclaration, 'isMixin'>> {
  rewards: IActionDeclaration<unknown>[];
  isRewarder: true;
  claimed?: boolean;
}