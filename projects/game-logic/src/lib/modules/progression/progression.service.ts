


export class ProgressionService {

  // promotions: IHeroPromotion[];

  // constructor(data: IHeroProgression) {
  //   this.promotions = data.promotions;
  // }

  // public applyPromotion(hero: IProgressable, fullfilments: IPromotionDesignateFullfilment[] ): void {
  //   const allowedBasicChange = this.getAllUnappliedDesignatesForGivenExperienceLevel(hero.experiencePoints, PromotionDesignateType.IncreaseBasicStats)
  //     .reduce((a, c) => a += c.points, 0);
  //   const actualBasicChange = fullfilments.filter(v => v.promotionDesignateType === PromotionDesignateType.IncreaseBasicStats)
  //     .reduce((a, c) => a += c.value, 0);
  
  //   const allowedSecondaryChange = this.getAllUnappliedDesignatesForGivenExperienceLevel(hero.experiencePoints,  PromotionDesignateType.IncreaseSecondaryStats)
  //     .reduce((a, c) => a += c.points, 0);
  //   const actualSecondaryChange = fullfilments.filter(v => v.promotionDesignateType === PromotionDesignateType.IncreaseSecondaryStats)
  //   .reduce((a, c) => a += c.value, 0);

  //   if (actualBasicChange > allowedBasicChange || actualSecondaryChange > allowedSecondaryChange) {
  //     throw new Error("Too many points spended during hero promotion");
  //   }
    
  //   for (let fullfilment of fullfilments) {
  //     if (fullfilment.promotionDesignateType === PromotionDesignateType.IncreaseBasicStats ||
  //       fullfilment.promotionDesignateType === PromotionDesignateType.IncreaseSecondaryStats) {
  //         (hero[fullfilment.statName as keyof typeof hero] as number) += fullfilment.value;
  //       }
  //   }
  // }

  // public isAvailablePromotion(): boolean {
  //   return this.promotions.some(p => !p.promoted);
  // }

  // public getAllUnappliedDesignatesForGivenExperienceLevel(exp: number, type?: PromotionDesignateType): IPromotionDesignate[] {
  //   return this.promotions.filter(p => !p.promoted && exp > p.requiredExperiencePointsToAdvance)
  //     .reduce((a, c) => a.concat(c.designations), [] as IPromotionDesignate[])
  //     .filter(d => !!type ? d.promotionDesignateType === type : true);
  // }
}



// {
//   const areas = feed.getAreas.filter(a => a.unlockConditions
//     .some(uc => uc.conditionType === AreaUnlockConditionType.HeroLevel && uc.level === state.hero.level));
  
//   for (let area of areas) {
//     state.adventureMap.unlockArea(area, feed.getAreas);
//   }
// }

// {
//   const areas = feed.getAreas.filter(a => a.unlockConditions
//     .some(uc => uc.conditionType === AreaUnlockConditionType.ItemPossesed &&
//       state.heroInventory.hasItem(uc.itemId)));
  
//   for (let area of areas) {
//     state.adventureMap.unlockArea(area, feed.getAreas);
//   }
// }