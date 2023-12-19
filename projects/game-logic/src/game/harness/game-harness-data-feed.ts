import { dataFeed } from "../../data/feed.data";
import { ICharacter, IActor } from "../../lib/features/actors/actors.interface";
import { IArea } from "../../lib/features/adventure/area.interface";
import { ICard } from "../../lib/features/cards-deck/cards-deck.interface";
import { IDungeonState } from "../../lib/features/dungeon/dungeon.interface";
import { IEffect } from "../../lib/features/effects/resolve-effect.interface";
import { IInventory } from "../../lib/features/items/inventory.interface";
import { IItem } from "../../lib/features/items/items.interface";
import { IQuest } from "../../lib/features/quests/quests.interface";
import { IGameFeed } from "../../lib/states/game.interface";

export class GameHarnessDataFeed implements IGameFeed {

  public async getQuests(ids?: string[] | undefined): Promise<IQuest[]> {
    return dataFeed.quests.filter(q => !ids || ids.includes(q.id));
  }

  public async getQuest(id: string): Promise<IQuest> {
    return dataFeed.quests.find(q => q.id === id);
  }

  public async getCharacters(ids?: string[] | undefined): Promise<(ICharacter & { inventory: IInventory; assignedAreaId: string; })[]> {
    return dataFeed.characters.filter(q => !ids || ids.includes(q.id));
  }

  public async getCharacter(id: string): Promise<ICharacter & { inventory: IInventory; assignedAreaId: string; }> {
    return dataFeed.characters.find(q => q.id === id);
  }

  public async getAreas(ids?: string[] | undefined): Promise<IArea[]> {
    return dataFeed.areas.filter(q => !ids || ids.includes(q.id));
  }

  public async getArea(id: string): Promise<IArea> {
    return dataFeed.areas.find(q => q.id === id);
  }

  public async getActors(ids?: string[] | undefined): Promise<IActor[]> {
    return dataFeed.actors.filter(q => !ids || ids.includes(q.id));
  }

  public async getActor(id: string): Promise<IActor> {
    return dataFeed.actors.find(q => q.id === id);
  }

  public async getDungeons(ids?: string[] | undefined): Promise<IDungeonState[]> {
    return dataFeed.dungeons.filter(q => !ids || ids.includes(q.dungeonId));
  } 

  public async getDungeon(id: string): Promise<IDungeonState> {
    return dataFeed.dungeons.find(q => q.dungeonId === id);
  }

  public async getDungeonCards(ids?: string[] | undefined): Promise<ICard<IEffect>[]> {
    return dataFeed.dungeonCards.filter(q => !ids || ids.includes(q.id));
  }

  public async getItems(ids?: string[] | undefined): Promise<IItem[]> {
    return dataFeed.items.filter(q => !ids || ids.includes(q.id));
  }
  
  public async getItem(id: string): Promise<IItem> {
    return dataFeed.items.find(q => q.id === id);
  }
}