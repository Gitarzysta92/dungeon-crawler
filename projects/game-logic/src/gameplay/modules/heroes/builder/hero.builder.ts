import { EntityFactory } from "../../../../lib/base/entity/entity.factory";
import { IEntityDeclaration } from "../../../../lib/base/entity/entity.interface";
import { Guid } from "../../../../lib/extensions/types";
import { IAbilitiesDataFeed } from "../../../../lib/modules/abilities/abilities.interface";
import { IPerksDataFeed } from "../../../../lib/modules/perks/perk.interface";
import { IQuestDataFeed } from "../../../../lib/modules/quest/quest.interface";
import { IStatisticDeclaration } from "../../../../lib/modules/statistics/entities/statistic/statistic.interface";
import { IHeroesDataFeed } from "../heroes.interface";
import { IHeroDeclaration } from "../entities/hero/hero.interface";
import { IHeroRecipe } from "./hero-builder.interface";
import { v4 } from 'uuid';

export class HeroBuilder {
  
  public get isFullfilled() {
    return this._recipe.heroClass &&
      this._recipe.heroName &&
      this._recipe.heroOrigin &&
      this._recipe.heroRace
   }

  private _recipe: IHeroRecipe = {} as IHeroRecipe;

  constructor(
    private readonly _dataFeed: IHeroesDataFeed & IAbilitiesDataFeed & IPerksDataFeed & IQuestDataFeed,
    private readonly _entityFactory: EntityFactory
  ) { }
  
  public async selectRace(id: Guid): Promise<void> {
    this._recipe.heroRace = await this._dataFeed.getHeroRace(id);
  }

  public async selectOrigin(id: Guid): Promise<void> {
    this._recipe.heroOrigin = await this._dataFeed.getHeroOrigin(id);
  }

  public async selectClass(id: Guid): Promise<void> {
    this._recipe.heroClass = await this._dataFeed.getHeroClass(id);
  }

  public selectName(name: string): void {
    this._recipe.heroName = name;
  }

  public async 

  public async build(): Promise<IEntityDeclaration & IHeroDeclaration | undefined> {
    if (!this.isFullfilled) {
      return;
    }
    const template = await this._entityFactory.create<IHeroDeclaration>(await this._dataFeed.getHeroTemplate());
    const { heroRace, heroClass, heroOrigin, heroName } = this._recipe;

    template.id = v4();

    //SET RACE
    template.raceId = heroRace.id;
    template.size = heroRace.size;
    template.outlets = heroRace.outlets;

    for (let s of heroRace.statistics) {
      const statistic = template[s.statisticId] as IStatisticDeclaration;
      statistic.baseValue = s.value;
    }
    template.abilities = template.abilities.concat(await this._dataFeed.getAbilities(heroRace.abilityIds));
    template.perks = template.perks.concat(await this._dataFeed.getPerks(heroRace.perkIds));

    //SET CLASS
    template.classId = heroClass.id;
    template.abilities = template.abilities.concat(await this._dataFeed.getAbilities(heroClass.abilities));
    template.perks = template.perks.concat(await this._dataFeed.getPerks(heroClass.perks));

    //SET ORIGIN
    template.originId = heroOrigin.id;
    template.occupiedAreaId = heroOrigin.startingAreaId;
    template.activeQuests = template.activeQuests.concat(await this._dataFeed.getQuests(heroOrigin.activeQuestIds));

    template.name = heroName;

    return template;
  }

}