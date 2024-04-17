import { Injectable } from "@angular/core";
import { IAdventureTemplate } from "@game-logic/gameplay/modules/adventure/adventure.interface";
import { IHeroDeclaration } from "@game-logic/gameplay/modules/heroes/entities/hero/hero.interface";
import { IHeroClassDeclaration, IHeroOriginDeclaration, IHeroRaceDeclaration } from "@game-logic/gameplay/modules/heroes/heroes.interface";
import { IAdventureGameplayFeed } from "@game-logic/gameplay/state/adventure/adventure-gameplay.interface";
import { IDungeonGameplayFeed } from "@game-logic/gameplay/state/dungeon/dungeon-gameplay.interface";
import { IAbilityDeclaration } from "@game-logic/lib/modules/abilities/entities/ability/ability.interface";
import { IAreaDeclaration } from "@game-logic/lib/modules/areas/entities/area/area.interface";
import { IItemDeclaration } from "@game-logic/lib/modules/items/entities/item/item.interface";
import { IPerk } from "@game-logic/lib/modules/perks/perk.interface";
import { IndexedDbService } from "src/app/infrastructure/data-store/api";
import { ACTOR_DATA_FEED_KEY, ADVENTURE_TEMPLATE_DATA_FEED_KEY, AREAS_DATA_FEED_KEY, DUNGEON_CARDS_DATA_FEED_KEY, DUNGEON_TEMPLATES_DATA_FEED_KEY, HERO_ORIGIN_DATA_FEED_KEY, HERO_RACE_DATA_FEED_KEY, HERO_TEMPLATE_DATA_FEED_KEY, ITEMS_DATA_FEED_KEY, PERKS_DATA_FEED_KEY, QUEST_DATA_FEED_KEY, STATISTICS_DATA_FEED_KEY } from "../constants/data-feed-keys";
import { IQuest } from "@game-logic/lib/modules/quest/entities/quest/quest.interface";
import { IDungeonAreaDeclaration } from "@game-logic/gameplay/modules/dungeon/entities/dungeon-area/dungeon-area.interface";
import { IActorDeclaration } from "@game-logic/lib/modules/actors/entities/actor/actor.interface";
import { ICard } from "@game-logic/lib/modules/cards-deck/entities/deck/deck.interface";


@Injectable({
  providedIn: 'root'
})
export class DataFeedService implements IAdventureGameplayFeed, IDungeonGameplayFeed {

  constructor(
    private readonly _indexedDbService: IndexedDbService
  ) {}

  public async getQuests(ids?: string[] | undefined) {
    return this._getListData<IQuest>(QUEST_DATA_FEED_KEY, ids);
  }

  public async getQuest(id: string) {
    return this._indexedDbService.read<IQuest>(id, QUEST_DATA_FEED_KEY);
  }

  public async getDungeonTemplates(ids?: string[] | undefined) {
    return this._getListData<IDungeonAreaDeclaration>(DUNGEON_TEMPLATES_DATA_FEED_KEY, ids);
  }

  public async getDungeonTemplate(id: string) {
    return this._indexedDbService.read<IDungeonAreaDeclaration>(id, DUNGEON_TEMPLATES_DATA_FEED_KEY);
  }

  public async getAreas(ids?: string[] | undefined): Promise<IAreaDeclaration[]> {
    return this._getListData<IAreaDeclaration>(AREAS_DATA_FEED_KEY, ids);
  }

  public async getArea(id: string): Promise<IAreaDeclaration> {
    return this._indexedDbService.read<IAreaDeclaration>(id, AREAS_DATA_FEED_KEY);
  }

  public async getActors(ids?: string[] | undefined) {
    return this._getListData<IActorDeclaration>(ACTOR_DATA_FEED_KEY, ids);
  }

  public async getActor(id: string)  {
    return this._indexedDbService.read<IActorDeclaration>(id, ACTOR_DATA_FEED_KEY);
  }

  public async getCards(ids?: string[] | undefined) {
    return this._getListData<ICard>(DUNGEON_CARDS_DATA_FEED_KEY, ids);
  }

  public async getItems(ids?: string[] | undefined) {
    return this._getListData<IItemDeclaration>(ITEMS_DATA_FEED_KEY, ids);
  }
  
  public async getItem(id: string) {
    return this._indexedDbService.read<IItemDeclaration>(id, ITEMS_DATA_FEED_KEY);
  }

  public async getHeroRaces(ids?: string[]) {
    return this._getListData<IHeroRaceDeclaration>(HERO_RACE_DATA_FEED_KEY, ids);
  }

  public async getHeroRace(id: string) {
    return this._indexedDbService.read<IHeroRaceDeclaration>(id, HERO_RACE_DATA_FEED_KEY);
  }

  public async getHeroClasses(ids?: string[]) {
    return this._getListData<IHeroClassDeclaration>(HERO_RACE_DATA_FEED_KEY, ids);
  }

  public async getHeroClass(id: string) {
    return this._indexedDbService.read<IHeroClassDeclaration>(id, HERO_RACE_DATA_FEED_KEY);
  }

  public async getHeroOrigins(ids?: string[]) {
    return this._getListData<IHeroOriginDeclaration>(HERO_ORIGIN_DATA_FEED_KEY, ids);
  }

  public async getHeroOrigin(id: string) {
    return this._indexedDbService.read<IHeroOriginDeclaration>(id, HERO_ORIGIN_DATA_FEED_KEY);
  }

  public async getHeroTemplate() {
    return this._indexedDbService.read<IHeroDeclaration>("", HERO_TEMPLATE_DATA_FEED_KEY);
  }

  public async getAbilities(ids?: string[]) {
    return this._getListData<IAbilityDeclaration>(HERO_ORIGIN_DATA_FEED_KEY, ids);
  }

  public async getAbility(id: string) {
    return this._indexedDbService.read<IAbilityDeclaration>(id, HERO_ORIGIN_DATA_FEED_KEY);
  }

  public async getPerks(ids?: string[]): Promise<IPerk[]> {
    return this._getListData<IPerk>(PERKS_DATA_FEED_KEY, ids);
  }

  public async getPerk(id: string): Promise<IPerk> {
    return this._indexedDbService.read<IPerk>(id, PERKS_DATA_FEED_KEY);
  }

  public async getFormulas(ids?: string[]) {
    return this._getListData<IPerk>(STATISTICS_DATA_FEED_KEY, ids);
  }

  public async getFormula(id: string) {
    return this._indexedDbService.read<IPerk>(id, STATISTICS_DATA_FEED_KEY);
  }

  public async getAdventureGameplayTemplate() {
    return this._indexedDbService.read<IAdventureTemplate>("", ADVENTURE_TEMPLATE_DATA_FEED_KEY);
  }

  private async _getListData<T extends object>(tableKey: string, ids?: string[]): Promise<T[]> {
    if (Array.isArray(ids)) {
      return await Promise.all(ids.map(id => this._indexedDbService.read<T>(id, tableKey)))
    } else {
      return await this._indexedDbService.readAll(tableKey)
    }
  }
}
