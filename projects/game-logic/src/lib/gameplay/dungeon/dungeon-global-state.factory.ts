import { ActorsFactory } from "../../features/actors/actors.factory";
import { IActor } from "../../features/actors/actors.interface";
import { BoardFactory } from "../../features/board/board.factory";
import { CardsDeckFactory } from "../../features/cards-deck/cards-deck.factory";
import { DungeonFactory } from "../../features/dungeon/dungeon.factory";
import { EffectsFactory } from "../../features/effects/commons/effects.factory";
import { IGameplayFeed } from "../gameplay-feed.interface";
import { DungeonGlobalState } from "./dungeon-global-state";
import { IDungeonGlobalState, IDungeonGlobalStateLoad } from "./dungeon-global-state.interface";


export class DungeonGlobalStateFactory {

  public static async createState(load: IDungeonGlobalStateLoad, dataFeed: IGameplayFeed): Promise<DungeonGlobalState> {
    const state = await this.buildState(load, dataFeed);
    return this.initializeState(state);
  }

  public static async buildState(load: IDungeonGlobalStateLoad, dataFeed: IGameplayFeed): Promise<IDungeonGlobalState> {

    const dungeon = DungeonFactory.buildDungeonState()

    const deck = await CardsDeckFactory.buildDungeonDeck(load.dungeon.dungeonDeckConfiguration, dataFeed);

    const assignedHero = BoardFactory.createAssignedBoardObject<IActor>(dungeon.playerSpawnPoint, load.hero);

    const board = await BoardFactory.buildDungeonBoard<IActor>(load.dungeon.boardConfiguration, [assignedHero]);

   
    return dungeonState;
  }

  public static initializeState(initialData: IDungeonGlobalState): DungeonGlobalState {
    const dungeonStateHandler = DungeonFactory.initializeDungeonState(initialData);
    const actorsStateHandler = ActorsFactory.initializeActorsState(initialData);
    const boardStateHandler = BoardFactory.initializeBoardState(initialData);
    const effectsStateHandler = EffectsFactory.initializeEffectsState(initialData);

    const state = new DungeonGlobalState(
      dungeonStateHandler,
      actorsStateHandler,
      boardStateHandler,
      effectsStateHandler
    );

    return state;
  }
}