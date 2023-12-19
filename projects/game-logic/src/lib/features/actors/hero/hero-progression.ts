import { PromotionDesignateType } from "./hero-progression.constants";
import { IHeroProgression, IHeroPromotion, IPromotionDesignate, IPromotionDesignateFullfilment } from "./hero-progression.interface";
import { IHero } from "./hero.interface";

export class HeroProgression implements IHeroProgression {

  promotions: IHeroPromotion[];

  constructor(data: IHeroProgression) {
    this.promotions = data.promotions;
  }

  public applyPromotion(hero: IHero, fullfilments: IPromotionDesignateFullfilment[] ): void {
    const allowedBasicChange = this.getAllUnappliedDesignatesForGivenExperienceLevel(hero.experiencePoints, PromotionDesignateType.IncreaseBasicStats)
      .reduce((a, c) => a += c.points, 0);
    const actualBasicChange = fullfilments.filter(v => v.promotionDesignateType === PromotionDesignateType.IncreaseBasicStats)
      .reduce((a, c) => a += c.value, 0);
  
    const allowedSecondaryChange = this.getAllUnappliedDesignatesForGivenExperienceLevel(hero.experiencePoints,  PromotionDesignateType.IncreaseSecondaryStats)
      .reduce((a, c) => a += c.points, 0);
    const actualSecondaryChange = fullfilments.filter(v => v.promotionDesignateType === PromotionDesignateType.IncreaseSecondaryStats)
    .reduce((a, c) => a += c.value, 0);

    if (actualBasicChange > allowedBasicChange || actualSecondaryChange > allowedSecondaryChange) {
      throw new Error("Too many points spended during hero promotion");
    }
    
    for (let fullfilment of fullfilments) {
      if (fullfilment.promotionDesignateType === PromotionDesignateType.IncreaseBasicStats ||
        fullfilment.promotionDesignateType === PromotionDesignateType.IncreaseSecondaryStats) {
          (hero[fullfilment.statName as keyof typeof hero] as number) += fullfilment.value;
        }
    }
  }

  public isAvailablePromotion(): boolean {
    return this.promotions.some(p => !p.promoted);
  }

  public getAllUnappliedDesignatesForGivenExperienceLevel(exp: number, type?: PromotionDesignateType): IPromotionDesignate[] {
    return this.promotions.filter(p => !p.promoted && exp > p.requiredExperiencePointsToAdvance)
      .reduce((a, c) => a.concat(c.designations), [] as IPromotionDesignate[])
      .filter(d => !!type ? d.promotionDesignateType === type : true);
  }
}