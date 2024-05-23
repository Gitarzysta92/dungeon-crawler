import { dataFeed } from "../gameplay/data/feed.data";
import { IAdventureDataFeed } from "../gameplay/modules/adventure/adventure.interface";
import { IAdventureMapDeclaration } from "../gameplay/modules/adventure/mixins/adventure-map/adventure-map.interface";
import { IDungeonDataFeed } from "../gameplay/modules/dungeon/dungeon.interface";
import { IHeroesDataFeed } from "../gameplay/modules/heroes/heroes.interface";
import { IHeroClassDeclaration } from "../gameplay/modules/heroes/mixins/hero-class/hero-class.interface";
import { IHeroOriginDeclaration } from "../gameplay/modules/heroes/mixins/hero-origin/hero-origin.interface";
import { IHeroRaceDeclaration } from "../gameplay/modules/heroes/mixins/hero-race/hero-race.interface";
import { IHeroDeclaration } from "../gameplay/modules/heroes/mixins/hero/hero.interface";
import { IAbilitiesDataFeed } from "../lib/modules/abilities/abilities.interface";
import { IAbilityDeclaration } from "../lib/modules/abilities/entities/ability/ability.interface";
import { IActorDataFeed } from "../lib/modules/actors/actors.interface";
import { IActor } from "../lib/modules/actors/entities/actor/actor.interface";
import { IAreasDataFeed } from "../lib/modules/areas/areas.interface";
import { IAreaDeclaration } from "../lib/modules/areas/entities/area/area.interface";
import { ICardsDeckDataFeed } from "../lib/modules/cards-deck/cards-deck.interface";
import { ICard } from "../lib/modules/cards-deck/entities/deck/deck.interface";
import { IItemDeclaration } from "../lib/modules/items/entities/item/item.interface";
import { IItemsDataFeed } from "../lib/modules/items/items.interface";
import { IPerk, IPerksDataFeed } from "../lib/modules/perks/perk.interface";
import { IQuestDataFeed } from "../lib/modules/quest/quest.interface";
import { IFormulaDefinition } from "../lib/modules/statistics/formula/formula.interface";
import { IStatisticDataFeed } from "../lib/modules/statistics/statistics.interface";


export class DataFeed implements
  IDungeonDataFeed,
  IActorDataFeed,
  IQuestDataFeed,
  IAreasDataFeed,
  ICardsDeckDataFeed,
  IHeroesDataFeed,
  IAbilitiesDataFeed,
  IPerksDataFeed,
  IStatisticDataFeed,
  IItemsDataFeed,
  IAdventureDataFeed
{

  public async getQuests(ids?: string[] | undefined) {
    return dataFeed.quests.filter(q => !ids || ids.includes(q.id));
  }

  public async getQuest(id: string) {
    return dataFeed.quests.find(q => q.id === id);
  }

  public async getDungeonTemplates(ids?: string[] | undefined) {
    return dataFeed.dungeonAreas.filter(q => !ids || ids.includes(q.id));
  }

  public async getDungeonTemplate(id: string) {
    return dataFeed.dungeonAreas.find(q => q.id === id);
  }

  public async getAreas(ids?: string[] | undefined): Promise<IAreaDeclaration[]> {
    return dataFeed.areas.filter(q => !ids || ids.includes(q.id));
  }

  public async getArea(id: string): Promise<IAreaDeclaration> {
    return dataFeed.areas.find(q => q.id === id);
  }

  public async getActors(ids?: string[] | undefined): Promise<IActor[]> {
    return dataFeed.actors.filter(q => !ids || ids.includes(q.id));
  }

  public async getActor(id: string): Promise<IActor> {
    return dataFeed.actors.find(q => q.id === id);
  }

  public async getDungeonCards(ids?: string[] | undefined): Promise<ICard[]> {
    return dataFeed.dungeonCards.filter(q => !ids || ids.includes(q.id));
  }

  public async getItems(ids?: string[] | undefined): Promise<IItemDeclaration[]> {
    return dataFeed.items.filter(q => !ids || ids.includes(q.id));
  }
  
  public async getItem(id: string): Promise<IItemDeclaration> {
    return dataFeed.items.find(q => q.id === id);
  }

  public async getHeroRaces(ids?: string[]): Promise<IHeroRaceDeclaration[]> {
    return dataFeed.heroRaces.filter(q => !ids || ids.includes(q.id));
  }

  public async getHeroRace(id: string): Promise<IHeroRaceDeclaration> {
    return dataFeed.heroRaces.find(q => q.id === id);
  }

  public async getHeroClasses(ids?: string[]): Promise<IHeroClassDeclaration[]> {
    return dataFeed.heroClasses.filter(q => !ids || ids.includes(q.id));
  }

  public async getHeroClass(id: string): Promise<IHeroClassDeclaration> {
    return dataFeed.heroClasses.find(q => q.id === id);
  }

  public async getHeroOrigins(ids?: string[]): Promise<IHeroOriginDeclaration[]> {
    return dataFeed.heroOrigins.filter(q => !ids || ids.includes(q.id));
  }

  public async getHeroOrigin(id: string): Promise<IHeroOriginDeclaration> {
    return dataFeed.heroOrigins.find(q => q.id === id);
  }

  public async getHeroTemplate(): Promise<IHeroDeclaration> {
    return dataFeed.heroTemplate
  }

  public async getAbilities(ids?: string[]): Promise<IAbilityDeclaration[]> {
    return dataFeed.abilities.filter(q => !ids || ids.includes(q.id));
  }

  public async getAbility(id: string): Promise<IAbilityDeclaration> {
    return dataFeed.abilities.find(q => q.id === id);
  }

  public async getPerks(ids?: string[]): Promise<IPerk[]> {
    return dataFeed.perks.filter(q => !ids || ids.includes(q.id));
  }

  public async getPerk(id: string): Promise<IPerk> {
    return dataFeed.perks.find(q => q.id === id);
  }

  public async getFormulas(ids?: string[]): Promise<IFormulaDefinition[]> {
    return dataFeed.formulas.filter(q => !ids || ids.includes(q.id));
  }

  public async getFormula(id: string): Promise<IFormulaDefinition> {
    return dataFeed.formulas.find(q => q.id === id);
  }

  public async getCards(ids?: string[]) {
    return dataFeed.cards.filter(q => !ids || ids.includes(q.id));
  }

  public async getAdventureMap(): Promise<IAdventureMapDeclaration> {
    return dataFeed.adventureTemplate;
  }
}