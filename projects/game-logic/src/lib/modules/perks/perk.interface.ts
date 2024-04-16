import { IEntityDeclaration } from "../../base/entity/entity.interface";
import { IConditionDeclaration } from "../../cross-cutting/condition/condition.interface";
import { IActivitySubject } from "../../base/activity/activity.interface";
import { Guid } from "../../extensions/types";

export interface IPerk extends IPerkDeclaration {
  
}

export interface IPerkDeclaration extends IEntityDeclaration, IActivitySubject {
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