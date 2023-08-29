import { IActivity } from "../activities/interfaces/activity.interface";
import { IActor } from "../features/actors/actors.interface";
import { Board } from "../features/board/board";
import { IDungeonDeck } from "../features/dungeon/dungeon-deck.interface";
import { IAffectable, IEffectBase, IEffectLog, IEffectsState, ITriggeredLastingEffect } from "../features/effects/effects.interface";
import { Inventory } from "../features/items/inventory";
import { IState } from "../utils/state-dispatcher/interfaces/state.interface";
import { GameLayer } from "./game.constants";
import { IDungeonState } from "./game.interface";
import { RewardsTracker } from "../features/rewards/rewards-tracker";
import { Hero } from "../features/hero/hero";
import { IDungeonExitBonus } from "../features/dungeon/dungeon.interface";
import { IBoardObject } from "../features/board/board.interface";

export class DungeonState implements IState, IDungeonState, IEffectsState {
  gameLayer: GameLayer.Dungeon = GameLayer.Dungeon;
  deck: IDungeonDeck;
  turn: number = 0;
  
  get hero() { return this.board.getObjectById(this._heroObjectId) as unknown as Hero & IBoardObject }
  private _heroObjectId: string;

  heroInventory!: Inventory;
  preparedSpellAndAbilityIds: string[];
  board: Board;
  
  effectsToTrigger: ITriggeredLastingEffect[];
  effectLogs: IEffectLog[];

  rewardsTracker: RewardsTracker;
  exitBonuses: IDungeonExitBonus[];

  changesHistory: IActivity<{ [key: string]: unknown; }>[];
  prevState: IDungeonState | null;

  constructor(
    data: IState & Omit<IDungeonState, "gameLayer"> & Pick<IEffectsState, 'effectLogs' | 'effectsToTrigger'>
  ) {
    this.deck = data.deck;
    this.exitBonuses = data.exitBonuses || [];
    this.turn = data.turn || 0;
    this._heroObjectId = data.hero.id;
    this.heroInventory = new Inventory(data.heroInventory);
    this.preparedSpellAndAbilityIds = data.preparedSpellAndAbilityIds;
    this.board = new Board(data.board);
    this.effectsToTrigger = data.effectsToTrigger;
    this.effectLogs = data.effectLogs;
    this.rewardsTracker = new RewardsTracker(data.rewardsTracker)
    this.changesHistory = data.changesHistory;
    this.prevState = data.prevState as IDungeonState;
  }

  public getAllActors<T extends IActor>(): Array<T> {
    const actors = Object.values(this.board.objects)
      .map(o => {
        return o as unknown as T
      });
    actors.push(this.deck as unknown as T);
    actors.push(this.board as unknown as T);
    return actors;
  }

  public getAllEffects(): IEffectBase[] {
    const actorEffects = this.getAllActors<IActor &IAffectable>()
      .reduce<IEffectBase[]>((a, c) => Array.isArray(c.effects) ? a.concat(c.effects) : a, []);
    
    const itemEffects = this.heroInventory.getAllEquippedItems();
    return actorEffects.concat(itemEffects as unknown as IEffectBase[])
      .reduce<IEffectBase[]>((a, c) => c.secondaryEffects ? a.concat(c.secondaryEffects) : a, []);
  }

}