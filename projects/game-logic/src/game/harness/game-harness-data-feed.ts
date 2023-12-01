import { ICharacter, IActor } from "../../lib/features/actors/actors.interface";
import { IArea } from "../../lib/features/adventure/area.interface";
import { IDungeonCard } from "../../lib/features/dungeon/dungeon-deck.interface";
import { IDungeon } from "../../lib/features/dungeon/dungeon.interface";
import { IEffect } from "../../lib/features/effects/resolve-effect.interface";
import { IInventory } from "../../lib/features/items/inventory.interface";
import { IItem } from "../../lib/features/items/items.interface";
import { IQuest } from "../../lib/features/quests/quests.interface";
import { IGameFeed } from "../../lib/states/game.interface";

export class GameHarnessDataFeed implements IGameFeed {

  public async getQuests(ids?: string[] | undefined): Promise<IQuest[]> {
    return []
  }

  public async getQuest(id: string): Promise<IQuest> {
    return {} as IQuest;
  }

  public async getCharacters(ids?: string[] | undefined): Promise<(ICharacter & { inventory: IInventory; assignedAreaId: string; })[]> {
    return [];
  }

  public async getCharacter(id: string): Promise<ICharacter & { inventory: IInventory; assignedAreaId: string; }> {
    return {} as ICharacter & { inventory: IInventory; assignedAreaId: string; }
  }

  public async getAreas(ids?: string[] | undefined): Promise<IArea[]> {
    return [];
  }

  public async getArea(id: string): Promise<IArea> {
    return {} as IArea;
  }

  public async getActors(ids?: string[] | undefined): Promise<IActor[]> {
    return [];
  }

  public async getActor(id: string): Promise<IActor> {
    return {} as IActor;
  }

  public async getDungeon(id: string): Promise<IDungeon> {
    return {} as IDungeon;
  }

  public async getDungeons(ids?: string[] | undefined): Promise<IDungeon[]> {
    return [];
  } 

  public async getDungeonCards(ids?: string[] | undefined): Promise<IDungeonCard<IEffect>[]> {
    return [];
  }

  public async getItems(ids?: string[] | undefined): Promise<IItem[]> {
    return []
  }
  
  public async getItem(id: string): Promise<IItem> {
    return {} as IItem;
  }
}