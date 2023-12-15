import { IActivity } from "../activities/interfaces/activity.interface";
import { IActor, IBasicStats } from "../features/actors/actors.interface";
import { Board } from "../features/board/board";
import { IAffectable, IEffectLog, IEffectsState, ITriggeredLastingEffect } from "../features/effects/commons/effects-commons.interface";
import { Inventory } from "../features/items/inventory";
import { IState } from "../utils/state-dispatcher/interfaces/state.interface";
import { GameLayer } from "./game.constants";
import { IDungeonState } from "./game.interface";
import { RewardsTracker } from "../features/rewards/rewards-tracker";
import { Hero } from "../features/hero/hero";
import { IDungeonExitBonus } from "../features/dungeon/dungeon.interface";
import { DungeonDeck } from "../features/dungeon/dungeon-deck";
import { ItemType } from "../features/items/items.constants";
import { IItem } from "../features/items/items.interface";
import { IDictionary } from "../extensions/types";
import { ActorType } from "../features/actors/actors.constants";
import { SystemActivityName } from "../activities/constants/activity-name";
import { IEffect } from "../features/effects/resolve-effect.interface";
import { validatePossibilityToInteractActor } from "../activities/player-activities/make-actor-interaction.directive";
import { IAassignedBoardObject, IBoardSelectorOrigin } from "../features/board/board.interface";


export class DungeonState implements IState, IDungeonState, IEffectsState {

  public playersNumber: number = 2;
  public dungeonId: string;
  public gameLayer: GameLayer.Dungeon = GameLayer.Dungeon;
  public deck: DungeonDeck;
  public turn: number = 0;
  public round: number = 0;
  public isDungeonTurn: boolean = false;
  
  public get hero() { return this.board.getObjectById(this.heroObjectId) as Hero & IBoardSelectorOrigin}
  public heroObjectId: string;

  public heroInventory!: Inventory;
  public heroPreparedSpellAndAbilityIds: string[];
  public board: Board<IActor>;
  
  public effectsToTrigger: ITriggeredLastingEffect[];
  public effectLogs: IEffectLog[];

  public rewardsTracker: RewardsTracker;
  public exitBonuses: IDungeonExitBonus[];

  public changesHistory: IActivity<{ [key: string]: unknown; }>[];
  public prevState: IDungeonState | null;

  public isDungeonFinished = false;

  constructor(
    data: IState & Omit<IDungeonState, "gameLayer"> & Pick<IEffectsState, 'effectLogs' | 'effectsToTrigger'>
  ) {
    this.dungeonId = data.dungeonId;
    this.deck = new DungeonDeck(data.deck);
    this.exitBonuses = data.exitBonuses || [];
    this.turn = data.turn || 0;
    this.isDungeonTurn = data.isDungeonTurn;
    this.heroObjectId = data.hero?.id ?? (data as DungeonState).heroObjectId;
    this.heroInventory = new Inventory(data.heroInventory);
    this.heroPreparedSpellAndAbilityIds = data.heroPreparedSpellAndAbilityIds;
    data.board.objects = this._initializeActors(data.board.objects);
    this.board = new Board(data.board);
    this.effectsToTrigger = data.effectsToTrigger;
    this.effectLogs = data.effectLogs;
    this.rewardsTracker = new RewardsTracker(data.rewardsTracker)
    this.isDungeonFinished = data.isDungeonFinished;
    this.changesHistory = data.changesHistory;
    this.prevState = data.prevState as IDungeonState;
  }


  public isPlayerNotStartedTurn(): boolean {
    if (!this.changesHistory[0]) {
      return true;
    }
    return this.changesHistory[0]?.name === SystemActivityName.FinishDungeonTurn && this.isDungeonTurn === false;
  }


  public isPlayerTurn(): boolean {
    return !this.isDungeonTurn;
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


  public getAllInteractableActors<T extends IActor>(): Array<T> {
    return this.getAllActors().filter(a => validatePossibilityToInteractActor(this, { actorId: a.id })) as Array<T>  
  }


  public getAllAttackableActors<T extends IActor & IBasicStats>(): Array<T> {
    return this.getAllActors().filter(a => 'health' in a) as Array<T>;
  }


  public getAllEffects(): IEffect[] {
    const actorEffects = this.getAllActors<IActor & IAffectable<IEffect>>()
      .reduce<IEffect[]>((a, c) => Array.isArray(c.lastingEffects) ? a.concat(c.lastingEffects as IEffect[]) : a, []);
    
    const itemEffects = this.heroInventory.getAllEquippedItems();
    return actorEffects.concat(itemEffects as unknown as IEffect[])
      .reduce<IEffect[]>((a, c) => c.secondaryEffects ? a.concat(c.secondaryEffects as IEffect[]) : a, []); 
  }


  public getEquippedWeapons(): (IItem & IEffect)[] {
    return this.heroInventory.getAllEquippedItems().filter(i => i.itemType === ItemType.Weapon) as unknown as (IItem & IEffect)[]
  }

  public updateRoundCount(): void {
    this.round = Math.round(this.turn / this.playersNumber)
  }


  public applyTurnToChangeHistory(): void {
    if (this.changesHistory[0]) {
      this.changesHistory[0].turn = this.turn
    }
  }


  public setPerformerForLastActivity(): void {
    const lastActivity = this.changesHistory[0];
    if (!lastActivity) {
      return;
    }

    lastActivity.playerId = Object.keys(SystemActivityName)
      .includes(lastActivity.name) ? this.deck.id : this.hero.id;
  }


  public removeDefeatedActors(): void {
    const actorsToRemove = this.getAllActors<IBasicStats & IActor & IAassignedBoardObject>()
      .filter(a => 'health' in a && a.health < 0 && a.actorType !== ActorType.Hero);
    
    for (let actor of actorsToRemove) {
      this.board.unassignObject(actor);
    }
  }

  public tryFinishDungeon(): void {
    if (this.hero.isDefeated()) {
      this.isDungeonFinished = true;
    }
  }


  private _initializeActors<T extends IActor>(actors: IDictionary<string, T>): IDictionary<string, T> {
    return Object.fromEntries(Object.entries(actors).map(a => {
      let [id, actor] = a as any;

      if (actor.actorType === ActorType.Hero) {
        actor = new Hero(actor);
      }

      return [id, actor]
    }))
  }

}