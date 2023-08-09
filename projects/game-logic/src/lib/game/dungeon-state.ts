import { IActivity } from "../activities/interfaces/activity.interface";
import { Hero } from "../features/actors/hero";
import { Board } from "../features/board/board";
import { IDungeonDeck } from "../features/dungeon/dungeon-deck";
import { Effect } from "../features/effects/effect";
import { Inventory } from "../features/items/inventory";
import { IState } from "../utils/state-dispatcher/interfaces/state.interface";
import { AdventureState } from "./adventure-state";
import { GameLayer } from "./game.constants";

export class DungeonState implements IState {
  deck!: IDungeonDeck;
  escapePenalties!: any[];
  gameLayerName = GameLayer.Dungeon;
  turn: number = 0;
  hero!: Hero;
  heroInventory!: Inventory;
  board!: Board;
  effects!: Effect[];
  changesHistory: IActivity<{ [key: string]: unknown; }>[];
  prevState: AdventureState | null;

  constructor(
    data: Omit<DungeonState, 'gameLayerName'>
  ) {
    this.deck = data.deck;
    this.escapePenalties = data.escapePenalties;
    this.turn = data.turn;
    this.hero = data.hero;
    this.heroInventory = data.heroInventory;
    this.board = data.board;
    this.effects = data.effects;
    this.changesHistory = data.changesHistory;
    this.prevState = data.prevState;
    this.changesHistory = [];
    this.prevState = null;
  }
}