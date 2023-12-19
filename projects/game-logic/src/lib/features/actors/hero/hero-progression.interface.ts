import { PromotionDesignateType } from "./hero-progression.constants";


export type IPromotionDesignate = IBasicStatsPromotionDesignate | ISecondaryStatsPromotionDesignate;

export interface IProgressable {
  level: number;
  experiencePoints: number;
}

export interface IHeroPromotion {
  level: number;
  requiredExperiencePointsToAdvance: number;
  designations: IPromotionDesignate[];
  promoted?: boolean;
}

export interface IPromotionDesignateBase {
  promotionDesignateType: PromotionDesignateType
}

export interface IBasicStatsPromotionDesignate extends IPromotionDesignateBase {
  promotionDesignateType: PromotionDesignateType.IncreaseBasicStats;
  points: number;
}

export interface ISecondaryStatsPromotionDesignate extends IPromotionDesignateBase {
  promotionDesignateType: PromotionDesignateType.IncreaseSecondaryStats;
  points: number;
}


export interface IHeroProgression {
  promotions: IHeroPromotion[]
}


export interface IPromotionDesignateFullfilment {
  promotionDesignateType: PromotionDesignateType
  statName: string;
  value: number;
}