import { IActivity } from "../../activities/interfaces/activity.interface";
import { BoardStateHandler } from "../../features/board/board.state-handler";
import { IRevertableState } from "../../utils/state-dispatcher/interfaces/state.interface";
import { IAassignedBoardObject } from "../../features/board/board.interface";
import { BoardField } from "../../features/board/board-field";
import { EffectsStateHandler } from "../../features/effects/commons/effects-state-handler/effects.state-handler";
import { DungeonStateHandler } from "../../features/dungeon/dungeon.state-handler";
import { ActorsStateHandler } from "../../features/actors/actors.state-handler";
import { IDungeonState } from "../../features/dungeon/dungeon.interface";
import { IDungeonGlobalState } from "./dungeon-global-state.interface";


export class DungeonGlobalState implements IDungeonGlobalState, IRevertableState {
  
  // DungeonState section
  public get dungeonId() { return this.dungeonStateHandler.dungeonId };
  public get players() { return this.dungeonStateHandler.players };
  public get currentPlayerId() { return this.dungeonStateHandler.currentPlayerId };
  public get playersNumber() { return this.dungeonStateHandler.players.length };
  public get turn() { return this.dungeonStateHandler.turn };
  public get round() { return this.dungeonStateHandler.round };
  public get isDungeonTurn() { return this.dungeonStateHandler.isDungeonTurn };
  public get isDungeonFinished() { return this.dungeonStateHandler.isDungeonFinished };
  
  // ActorsState section
  public get actors() { return this.actorsStateHandler.actors };

  // BoardState section
  public get fields() { return this.boardStateHandler.fields };
  public get objects() { return this.boardStateHandler.objects };

  // EffectsState section
  public get lastingEffects() { return this.effectsStateHandler.lastingEffects };
  
  // RevertableState section
  public changesHistory: IActivity<{ [key: string]: unknown; }>[];
  public prevState: IDungeonState | null;

  constructor(
    public readonly dungeonStateHandler: DungeonStateHandler,
    public readonly actorsStateHandler: ActorsStateHandler,
    public readonly boardStateHandler: BoardStateHandler<BoardField, IAassignedBoardObject>,
    public readonly effectsStateHandler: EffectsStateHandler
  ) {}

  // public get hero() { return this.board.getObjectById(this.heroObjectId) as Hero & IBoardSelectorOrigin}
  // public getEquippedWeapons(): (IItem & IEffect)[] {
  //   return this.heroInventory.getAllEquippedItems().filter(i => i.itemType === ItemType.Weapon) as unknown as (IItem & IEffect)[]
  // }
}