import { IActorsDataFeed } from "../actors/actors.interface";
import { ICardsDeckDataFeed } from "../cards-deck/cards-deck.interface";
import { IDungeonConfiguration, IDungeonState, IDungeonTemplate } from "./dungeon.interface";
import { DungeonStateHandler } from "./dungeon.state-handler";

export class DungeonFactory {

  public static buildDungeonState(): IDungeonState {
    const dungeonState: IDungeonState = {
      dungeonId: dungeon.dungeonId,
      turn: 0,
      round: 0,
      isDungeonTurn: false,
      isDungeonFinished: false,
      players: [],
      currentPlayerId: "",
      playersNumber: 0,
      changesHistory: undefined
    }
    return dungeonState;
  }

  public static initializeDungeonState(initialData: IDungeonState): DungeonStateHandler {
    return {} as DungeonStateHandler;
  }

  public static async buildDungeonConfiguration(
    dungeonTemplate: IDungeonTemplate,
    dataFeed: ICardsDeckDataFeed & IActorsDataFeed 
  ): Promise<IDungeonConfiguration> {
    return {} as any;
  }
}