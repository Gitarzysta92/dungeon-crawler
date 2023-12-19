import { v4 } from "uuid";
import { IHeroTemplate } from "../../features/hero/hero-template.interface";
import { Inventory } from "../../features/items/inventory";
import { AdventureGlobalState } from "./adventure-state";
import { IGameplayFeed } from "../gameplay-feed.interface";

export class AdventureGlobalStateFactory {


  public static async buildState(initialData: IHeroTemplate): Promise<IAdventureGlobalState> {

  }


  public static async createAdventureState(
    initialData: IHeroTemplate,
    gameFeed: IGameplayFeed
  ): Promise<AdventureGlobalState> {
    initialData = JSON.parse(JSON.stringify(initialData));

    const quests = await gameFeed.getQuests();
    const items = await gameFeed.getItems();

    const heroInventory = {
      id: v4(),
      actorId: initialData.id,
      slots: initialData.inventory.itemSlots,
      items: initialData.inventory.itemBindings.map(ib => {
        const sourceItem = items.find(i => i.id === ib.itemId);
        if (!sourceItem) {
          throw new Error("Cannot find item during adventure creation")
        }
        return Object.assign({...sourceItem}, ib);
      })
    }


    const hero = Object.assign({}, initialData);
    delete (hero as any).itemSlots;
    delete (hero as any).itemBindings;

    return new AdventureGlobalState({
      hero: Object.assign(initialData, { occupiedAreaId: initialData.occupiedAreaId, occupiedRootAreaId: initialData.occupiedRootAreaId }),
      heroInventory: heroInventory,
      heroProgression: initialData.heroProgression,
      questLog: { activeQuests: [], finishedQuestIds: [] },
      adventureMap: { unlockedAreas: await gameFeed.getAreas() },
      dungeons: Object.fromEntries((await gameFeed.getDungeons()).map(d => {
        return [`${d.assignedAreaId}`, Object.assign(d, {
          dungeonLog: {}
        })]
      })),
      characters: Object.fromEntries((await gameFeed.getCharacters()).map(c => {
        return [`${c.id}:${c.assignedAreaId}`, Object.assign(c, {
          inventory: new Inventory(c.inventory),
          quests: quests.filter(q => q.originId)
        })]
      })),
      heroSpellsAndAbilities: {
        learnedIds: initialData.heroSpellsAndAbilities.learnedIds,
        preparedIds: initialData.heroSpellsAndAbilities.preparedIds
      },
      rewardsTracker: {
        claimedRewards: [],
        rewardsToClaim: []
      },
      changesHistory: [],
      prevState: null
    })
  }
}