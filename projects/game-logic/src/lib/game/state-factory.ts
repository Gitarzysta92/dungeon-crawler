import { v4 } from "uuid";
import { obstacle, rat, treasure } from "../../data/actors";
import { areas, characters } from "../../data/adventure";
import { Hero } from "../features/actors/hero";
import { AdventureMap } from "../features/adventure/adventure-map";
import { Board } from "../features/board/board";
import { BoardObjeectRotation } from "../features/board/board.interface";
import { CoordsHelper } from "../features/board/coords.helper";
import { DungeonDeck } from "../features/dungeon/dungeon-deck";
import { DungeonLog } from "../features/dungeon/dungeon-log";
import { Inventory } from "../features/items/inventory";
import { QuestLog } from "../features/quest/quest-log";
import { AdventureState } from "./adventure-state";
import { DungeonState } from "./dungeon-state";
import { IAdventureState, IDungeonState } from "./game.interface";


export class StateFactory {

  constructor() { }

  createAdventureState(state: Omit<IAdventureState, 'gameLayerName'>): AdventureState {
    state = JSON.parse(JSON.stringify(state));

    return new AdventureState({
      hero: Object.assign(new Hero(state.hero), { occupiedAreaId: state.hero.occupiedAreaId }),
      heroInventory: new Inventory(state.heroInventory),
      questLog: new QuestLog(state.questLog),
      adventureMap: new AdventureMap({ areas }),
      dungeonLog: new DungeonLog(),
      characters: Object.fromEntries(characters.map(c => [c.id, Object.assign(c, { inventory: new Inventory(c.inventory) })])),
      changesHistory: [],
      prevState: null
    })
  }

  createDungeonState(state: Omit<IDungeonState, "gameLayerName">): DungeonState {
    state = JSON.parse(JSON.stringify(state));

    const coords = CoordsHelper.createHexagonalBoardCoords(3);
    const heroObject = Object.assign(new Hero(state.hero),
      { position: { r: 3, q: 3, s: 0 }, rotation: 0 as BoardObjeectRotation }); 
    const objects = [
      heroObject,
      Object.assign(rat, { position: { r: 0, q: -3, s: 3 } }),
      Object.assign(obstacle, { position: { r: 0, q: 0, s: 0 } }),
      Object.assign(treasure, { position: { r: 3, q: 0, s: -3 } }),
    ];

    return new DungeonState({
      turn: state.turn || 0,
      deck: new DungeonDeck(state.deck),
      escapePenalties: [],
      hero: new Hero(state.hero),
      heroInventory: new Inventory(state.heroInventory),
      board: new Board({
        fields: Object.fromEntries(coords.map(bc => [CoordsHelper.createKeyFromCoordinates(bc), { id: v4(), coords: bc }])),
        objects: Object.fromEntries(objects.map(o => [CoordsHelper.createKeyFromCoordinates(o.position),  o]))
      }),
      effects: state.effects || [],
      changesHistory: [],
      prevState: null,
    })
  }

}