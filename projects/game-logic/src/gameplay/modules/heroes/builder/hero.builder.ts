import { IEntityDeclaration } from "../../../../lib/base/entity/entity.interface";
import { IStatisticDeclaration } from "../../../../lib/modules/statistics/entities/statistic/statistic.interface";
import { IHeroClassDeclaration } from "../entities/hero-class/hero-class.interface";
import { IHeroOriginDeclaration } from "../entities/hero-origin/hero-origin.interface";
import { IHeroRaceDeclaration } from "../entities/hero-race/hero-race.interface";
import { IHeroDeclaration } from "../entities/hero/hero.interface";
import { CLASS_STEP_NAME, ORIGIN_STEP_NAME, RACE_STEP_NAME } from "../heroes.constants";
import { IHeroBuilderStep } from "./hero-builder.interface";
import { v4 } from 'uuid';

export class HeroBuilder {

  constructor() {}

  public static build(
    template: IHeroDeclaration,
    steps: IHeroBuilderStep<IHeroRaceDeclaration & IHeroClassDeclaration & IHeroOriginDeclaration>[],
  ): IEntityDeclaration & IHeroDeclaration {
    if (!steps.every(s => s.isFulfilled)) {
      return;
    }

    const heroRace = steps.find(s => s.stepName === RACE_STEP_NAME).items.find(i => i.isSelected) as IHeroRaceDeclaration;
    const heroClass = steps.find(s => s.stepName === CLASS_STEP_NAME).items.find(i => i.isSelected) as IHeroClassDeclaration;
    const heroOrigin = steps.find(s => s.stepName === ORIGIN_STEP_NAME).items.find(i => i.isSelected) as IHeroOriginDeclaration;

    template.id = v4();

    //SET RACE
    template.raceId = heroRace.id;
    template.size = heroRace.size;
    template.outlets = heroRace.outlets;

    for (let s of heroRace.statistics) {
      const statistic = template.statistics.find(ts => ts.id === s.id);
      statistic.baseValue = s.value;
    }
    template.abilities = template.abilities.concat(heroRace.abilities);
    template.perks = template.perks.concat(heroRace.perks);

    //SET CLASS
    template.classId = heroClass.id;
    template.abilities = template.abilities.concat(heroClass.abilities);
    template.perks = template.perks.concat(heroClass.perks);

    //SET ORIGIN
    template.originId = heroOrigin.id;
    template.occupiedAreaId = heroOrigin.startingAreaId;
    //template.activeQuests = template.activeQuests.concat(heroOrigin.activeQuests);

    return template;
  }

}