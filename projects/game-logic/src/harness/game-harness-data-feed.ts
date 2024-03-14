
import { IDungeonDataFeed, IDungeonTemplate } from "../gameplay/dungeon/dungeons.interface";
import { dataFeed } from "../gameplay/data/feed.data";
import { IActorDataFeed } from "../lib/modules/actors/actors.interface";
import { IActor } from "../lib/modules/actors/entities/actor/actor.interface";
import { IAreasDataFeed } from "../lib/modules/areas/areas.interface";
import { IAreaDeclaration } from "../lib/modules/areas/entities/area/area.interface";
import { ICardsDeckDataFeed, ICard } from "../lib/modules/cards-deck/cards-deck.interface";
import { IItemDeclaration } from "../lib/modules/items/entities/item/item.interface";
import { IQuestDataFeed } from "../lib/modules/quest/quest.interface";
import { IQuest } from "../lib/modules/quest/entities/quest/quest.interface";

export class GameHarnessDataFeed implements
  IDungeonDataFeed,
  IActorDataFeed,
  IQuestDataFeed,
  IAreasDataFeed,
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
}