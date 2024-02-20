import { dataFeed } from "../gameplay/data/feed.data";
import { IDungeonDataFeed, IDungeonTemplate } from "../gameplay/dungeon/dungeons.interface";
import { IActorDataFeed, IActor } from "../lib/modules/actor/actor.interface";
import { IAreaDataFeed, IRootArea } from "../lib/modules/area/area.interface";
import { ICardsDeckDataFeed, ICard } from "../lib/modules/cards-deck/cards-deck.interface";
import { IItem } from "../lib/modules/item/item.interface";
import { IQuestDataFeed, IQuest } from "../lib/modules/quest/quest.interface";

export class GameHarnessDataFeed implements
  IDungeonDataFeed,
  IActorDataFeed,
  IQuestDataFeed,
  IAreaDataFeed,
  ICardsDeckDataFeed {
  
  public getCards: (ids?: string[]) => Promise<ICard[]>;

  public async getQuests(ids?: string[] | undefined): Promise<IQuest[]> {
    return dataFeed.quests.filter(q => !ids || ids.includes(q.id));
  }

  public async getQuest(id: string): Promise<IQuest> {
    return dataFeed.quests.find(q => q.id === id);
  }

  public async getDungeonGameplayTemplates(ids?: string[] | undefined): Promise<IDungeonTemplate[]> {
    return dataFeed.dungeonTemplates.filter(q => !ids || ids.includes(q.id));
  }

  public async getDungeonGameplayTemplate(id: string): Promise<IDungeonTemplate> {
    return dataFeed.dungeonTemplates.find(q => q.id === id);
  }

  public async getAreas(ids?: string[] | undefined): Promise<IRootArea[]> {
    return dataFeed.areas.filter(q => !ids || ids.includes(q.id));
  }

  public async getArea(id: string): Promise<IRootArea> {
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

  public async getItems(ids?: string[] | undefined): Promise<IItem[]> {
    return dataFeed.items.filter(q => !ids || ids.includes(q.id));
  }
  
  public async getItem(id: string): Promise<IItem> {
    return dataFeed.items.find(q => q.id === id);
  }
}