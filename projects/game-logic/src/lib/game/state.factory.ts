import { Hero } from "../features/actors/hero";
import { IHero } from "../features/actors/hero.interface";
import { AdventureMap } from "../features/adventure/adventure-map";;
import { createDungeonBoard } from "../features/board/board.factory";
import { IBoard } from "../features/board/board.interface";
import { createDungeonDeck } from "../features/dungeon/dungeon-deck.factory";
import { IDungeonDeck } from "../features/dungeon/dungeon-deck.interface";
import { DungeonLog } from "../features/dungeon/dungeon-log";
import { IDungeon } from "../features/dungeon/dungeon.interface";
import { Inventory } from "../features/items/inventory";
import { IInventory } from "../features/items/inventory.interface";
import { QuestLog } from "../features/quest/quest-log";
import { AdventureState } from "./adventure-state";
import { DungeonState } from "./dungeon-state";
import { IGameFeed } from "./game.interface";


export class StateFactory {

  public static createAdventureState(initialData: {
    hero: IHero,
    occupiedAreaId: string,
    heroInventory: IInventory,
  } & IGameFeed): AdventureState {
    initialData = JSON.parse(JSON.stringify(initialData));

    return new AdventureState({
      hero: Object.assign(new Hero(initialData.hero), { occupiedAreaId: initialData.occupiedAreaId }),
      heroInventory: new Inventory(initialData.heroInventory),
      questLog: new QuestLog({ activeQuests: [], finishedQuestIds: [] }),
      adventureMap: new AdventureMap({ areas: initialData.areas }),
      dungeons: Object.fromEntries(initialData.dungeons.map(d => {
        return [`${d.id}:${d.assignedAreaId}`, Object.assign(d, {
          dungeonLog: new DungeonLog()
        })]
      })),
      characters: Object.fromEntries(initialData.characters.map(c => {
        return [`${c.id}:${c.assignedAreaId}`, Object.assign(c, {
          inventory: new Inventory(c.inventory),
          quests: initialData.quests.filter(q => q.originId)
        })]
      })),
      changesHistory: [],
      prevState: null
    })
  }

  public static createDungeonState(
    initalData: {
      hero: IHero;
      heroInventory: IInventory;
      board?: IBoard;
      deck?: IDungeonDeck;
      turn?: number;
    },
    feed: IGameFeed,
    dungeon?: IDungeon
  ): DungeonState {
    initalData = JSON.parse(JSON.stringify(initalData));
    dungeon = JSON.parse(JSON.stringify(dungeon));

    if (!!dungeon) {
      const heroObject = Object.assign(new Hero(initalData.hero),
        { position: dungeon.playerSpawnPoint.position, rotation: dungeon.playerSpawnPoint.rotation });    
      dungeon.boardConfiguration.boardObjects.push(heroObject);
    }
 
    return new DungeonState({
      turn: initalData.turn,
      deck: initalData.deck || createDungeonDeck(dungeon!.dungeonDeckConfiguration, feed.dungeonCards),
      escapePenalties: [],
      hero: initalData.hero,
      heroInventory: initalData.heroInventory,
      board: initalData.board || createDungeonBoard(dungeon!.boardConfiguration),
      effectLogs: [],
      changesHistory: [],
      prevState: null,
    })
  }

}