import { IActivitySubjectDeclaration } from "../../base/activity/activity.interface";
import { IEntityDeclaration } from "../../base/entity/entity.interface";
import { IConditionDeclaration } from "../../cross-cutting/condition/condition.interface";

import { Guid } from "../../infrastructure/extensions/types";

export interface IPerk extends IPerkDeclaration {
  
}

export interface IPerkDeclaration extends IEntityDeclaration, IActivitySubjectDeclaration {
  prevPerkId?: Guid,
  levels: Array<{
    level: number;
    unlockConditions: IConditionDeclaration<unknown>[];
  }>;
  unlockedLevel?: number;
}

export interface IPerksDataFeed {
  getPerks: (ids?: Guid[]) => Promise<IPerk[]>;
  getPerk: (id: Guid) => Promise<IPerk>;
}