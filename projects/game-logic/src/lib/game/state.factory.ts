import { IHero } from "../features/hero/hero.interface";
import { createDungeonBoard } from "../features/board/board.factory";
import { IBoard } from "../features/board/board.interface";
import { createDungeonDeck } from "../features/dungeon/dungeon-deck.factory";
import { IDungeonDeck } from "../features/dungeon/dungeon-deck.interface";
import { IDungeon } from "../features/dungeon/dungeon.interface";
import { Inventory } from "../features/items/inventory";
import { IInventory } from "../features/items/inventory.interface";
import { AdventureState } from "./adventure-state";
import { DungeonState } from "./dungeon-state";
import { IGameFeed } from "./game.interface";
import { Hero } from "../features/hero/hero";
import { IHeroTemplate } from "./hero-template.interface";
import { v4 } from "uuid";
import { IActor } from "../features/actors/actors.interface";


export class StateFactory {

  public static async createAdventureState(
    initialData: IHeroTemplate,
    gameFeed: IGameFeed
  ): Promise<AdventureState> {
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

    return new AdventureState({
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

  public static async createDungeonState(
    initialData: {
      hero: IHero;
      heroInventory: IInventory;
      heroSpellsAndAbilities: { preparedIds: string[] },
      board?: IBoard<IActor>;
      deck?: IDungeonDeck;
      turn?: number;
      round?: number;
    },
    feed: IGameFeed,
    dungeon: IDungeon
  ): Promise<DungeonState> {
    initialData = JSON.parse(JSON.stringify(initialData));
    dungeon = JSON.parse(JSON.stringify(dungeon));

    if (!!dungeon) {
      const heroObject = Object.assign(new Hero(initialData.hero),
        { position: dungeon.playerSpawnPoint.position, rotation: dungeon.playerSpawnPoint.rotation });    
      dungeon.boardConfiguration.boardObjects.push(heroObject);
    }
 
    return new DungeonState({
      dungeonId: dungeon.id,
      turn: initialData.turn ?? 0,
      round: initialData.round ?? 0,
      deck: initialData.deck || createDungeonDeck(dungeon!.dungeonDeckConfiguration, await feed.getDungeonCards()),
      exitBonuses: [],
      hero: initialData.hero,
      heroInventory: initialData.heroInventory,
      board: initialData.board || createDungeonBoard<IActor>(dungeon!.boardConfiguration),
      effectsToTrigger: [],
      effectLogs: [],
      rewardsTracker: {
        claimedRewards: [],
        rewardsToClaim: []
      },
      changesHistory: [],
      heroPreparedSpellAndAbilityIds: initialData.heroSpellsAndAbilities.preparedIds,
      prevState: null,
      isDungeonFinished: false,
      isDungeonTurn: false,
    })
  }

}