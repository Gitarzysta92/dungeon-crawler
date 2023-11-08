import { AreaType, AreaUnlockConditionType } from "./area.constants";

export type IAreaUnlockCondition = IHeroLevelCondition |
  IAnotherAreaUnlockedCondition |
  IPossesedItemCondition |
  IRewardCondition

export interface IArea {
  id: string;
  areaType: AreaType;
  parentAreaId?: string;
  areaConnections: IAreaConnection[];
  unlockConditions: IAreaUnlockCondition[];
  visitied?: boolean;
  unlocked?: boolean;
  childAreaIds?: string[]
}

export interface IAreaConnection {
  fromAreaId: string;
  toAreaId: string;
  distance: number;
}

export interface IAreaAccessConditionBase {
  conditionType: AreaUnlockConditionType
}

export interface IHeroLevelCondition extends IAreaAccessConditionBase {
  conditionType: AreaUnlockConditionType.HeroLevel;
  level: number;
}

export interface IAnotherAreaUnlockedCondition extends IAreaAccessConditionBase {
  conditionType: AreaUnlockConditionType.AnotherAreaUnlocked;
  areaId: string;
}

export interface IPossesedItemCondition extends IAreaAccessConditionBase {
  conditionType: AreaUnlockConditionType.ItemPossesed;
  itemId: string;
}

export interface IRewardCondition extends IAreaAccessConditionBase {
  conditionType: AreaUnlockConditionType.Reward;
}

export interface IAreaSelector {
  character: IAreaObject;
}

export interface IAreaObject {
  occupiedAreaId: string;
  occupiedRootAreaId: string;
}