import { ActorsFactory } from "../../features/actors/actors.factory";
import { IActor } from "../../features/actors/actors.interface";
import { CardsDeckFactory } from "../../features/actors/cards-deck/cards-deck.factory";
import { BoardFactory } from "../../features/board/board.factory";
import { DungeonFactory } from "../../features/dungeon/dungeon.factory";
import { EffectsFactory } from "../../features/effects/commons/effects.factory";
import { IGameplayFeed } from "../gameplay-feed.interface";
import { DungeonGameplayState } from "./dungeon-global-state";
import { IDungeonGameplayState, IDungeonGameplayPayload, IDungeonGameplayTemplate } from "./dungeon-global-state.interface";


export class DungeonGameplayStateFactory {

  constructor(
    private readonly _cardsDeckFactory: CardsDeckFactory,
    private readonly _boardFactory: BoardFactory,
    private readonly _actorsFactory: ActorsFactory,
    private readonly _dungeonFactory: DungeonFactory,
  ) {}

  public async createState(load: IDungeonGameplayPayload, dataFeed: IGameplayFeed): Promise<DungeonGameplayState> {
    const dungeonTemplate: IDungeonGameplayTemplate = await dataFeed.getDungeonTemplate(load.dungeonId);


    const state = await this.buildState(load, dataFeed);
    return this.initializeState(state);
  }

  public async buildState(load: IDungeonGameplayPayload, dataFeed: IGameplayFeed): Promise<IDungeonGameplayState> {

    load.actors =

    const dungeon = this._dungeonFactory.buildDungeonState()
    const assignedHero = this._boardFactory.createAssignedBoardObject(dungeon.playerSpawnPoint, load.hero);

    const deck = await this._cardsDeckFactory.buildDungeonDeck(load.dungeon.dungeonDeckConfiguration, dataFeed);
    const actors = await this._actorsFactory.buildHandler();
    const board = await this._boardFactory.build<IActor>(load.dungeon.boardConfiguration, [assignedHero]);

   
    return dungeonState;
  }

  public initializeState(initialData: IDungeonGameplayState): DungeonGameplayState {
    initialData.actors

    const dungeonStateHandler = this._dungeonFactory.initializeDungeonState(initialData);
    const actorsStateHandler = this._actorsFactory.initializeActorsState(initialData);
    const boardStateHandler = this._boardFactory.initializeBoardState(initialData);
    const effectsStateHandler = EffectsFactory.initializeEffectsState(initialData);

    const state = new DungeonGameplayState(
      dungeonStateHandler,
      actorsStateHandler,
      boardStateHandler,
      effectsStateHandler
    );

    return state;
  }
}