import { IActivity } from "../activities/interfaces/activity.interface";
import { IActor } from "../features/actors/actors.interface";
import { IHero } from "../features/actors/hero.interface";
import { Board } from "../features/board/board";
import { IDungeonDeck } from "../features/dungeon/dungeon-deck.interface";
import { IAffectable, IEffect, IEffectLog, IEffectsState } from "../features/effects/effects.interface";
import { Inventory } from "../features/items/inventory";
import { IState } from "../utils/state-dispatcher/interfaces/state.interface";
import { GameLayer } from "./game.constants";
import { IDungeonState } from "./game.interface";

export class DungeonState implements IState, IDungeonState, IEffectsState {
  gameLayer: GameLayer.Dungeon = GameLayer.Dungeon;
  deck: IDungeonDeck;
  escapePenalties: any[];
  turn: number = 0;
  
  get hero() { return this.board.getObjectById(this._heroObjectId) as unknown as IHero }
  private _heroObjectId: string;

  heroInventory!: Inventory;
  board: Board;
  
  effectLogs: IEffectLog[];

  changesHistory: IActivity<{ [key: string]: unknown; }>[];
  prevState: IDungeonState | null;

  constructor(
    data: IState & Omit<IDungeonState, "gameLayer"> & Pick<IEffectsState, 'effectLogs'>
  ) {
    this.deck = data.deck;
    this.escapePenalties = data.escapePenalties || [];
    this.turn = data.turn || 0;
    this._heroObjectId = data.hero.id;
    this.heroInventory = new Inventory(data.heroInventory);
    this.board = new Board(data.board);
    this.effectLogs = data.effectLogs;
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

  public getAllEffects(): IEffect[] {
    const actorEffects = this.getAllActors<IActor &IAffectable>()
      .reduce<IEffect[]>((a, c) => a.concat(c.effects), []);
    
    const itemEffects = this.heroInventory.getAllEquippedItems();
    return actorEffects.concat(itemEffects as unknown as IEffect[])
      .reduce<IEffect[]>((a, c) => c.secondaryEffects ? a.concat(c.secondaryEffects) : a, []);
  }

}