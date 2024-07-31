import { v4 } from 'uuid';
import { IHeroDeclaration } from "../mixins/hero/hero.interface";
import { IHeroRecipe } from "./hero-builder.interface";

export class HeroBuilder {

  constructor() {}

  public static build(
    template: IHeroDeclaration,
    recipe: IHeroRecipe,
  ): IHeroDeclaration {

    template.id = v4();

    //SET RACE
    template.raceId = recipe.race.id;
    template.outlets = recipe.race.outlets;

    for (let s of recipe.race.statistics) {
      const statistic = Object.values(template.statistic).find(ts => ts.id === s.id);
      statistic.baseValue = s.value;
    }
    template.abilities = template.abilities.concat(recipe.race.abilities);
    template.perks = template.perks.concat(recipe.race.perks);

    //SET CLASS
    template.classId = recipe.class.id;
    template.abilities = template.abilities.concat(recipe.class.abilities);
    template.perks = template.perks.concat(recipe.class.perks);

    //SET ORIGIN
    template.originId = recipe.origin.id;
    //template.activeQuests = template.activeQuests.concat(heroOrigin.activeQuests);

    return template;
  }

}