import { AreaAccessConditionType } from "./area.constants";

export interface IArea {
  id: string;
  name: string;
  parentAreaId?: string;
  areaConnections: IAreaConnection[]
  accessCondition: IAreaAccessCondition[];
}

export interface IAreaConnection {
  fromAreaId: string;
  toAreaId: string;
  distance: number;
}

export interface IAreaAccessCondition {
  conditionType: AreaAccessConditionType
}

export interface IHeroLevelCondition extends IAreaAccessCondition {
  condtionType: AreaAccessConditionType.HeroLevel;
  level: number;
}

export interface IAreaSelector {
  character: IAreaObject;
}

export interface IAreaObject {
  occupiedAreaId: string;
}