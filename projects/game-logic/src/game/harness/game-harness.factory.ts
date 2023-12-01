import { DungeonState } from "src/lib/states/dungeon-state";
import { StateDispatcher } from "src/lib/utils/state-dispatcher/state-dispatcher";
import { DungeonStateStore } from "./game-harness-state-store";
import { GameHarnessDataFeed } from "./game-harness-data-feed";
import { StateFactory } from "src/lib/states/state.factory";
import { IStateStorage } from "@utils/store/interfaces/store-state-storage.interface";
import { heroTemplate } from "src/data/hero-templates";



export class GameHarnessFactory {

  public static createDataFeed(): GameHarnessDataFeed {
    return new GameHarnessDataFeed();
  }

  public static async prepareInitialDungeonState(dataFeed: GameHarnessDataFeed): Promise<DungeonState> {
    const { dungeonInstance, ...state } = await StateFactory.createAdventureState(heroTemplate, dataFeed);
    return await StateFactory.createDungeonState(state, dataFeed, dungeonInstance);
  }

  public static createDungeonGameHarnessDataStore(
    initialDungeonState: DungeonState,
    stateStorage: IStateStorage<DungeonState>
  ): DungeonStateStore {
    const gameDataFeed = new GameHarnessDataFeed();
    const dispatcherConfiguration = {
      context: gameDataFeed,
      postDirectiveMutators: [
        (s: DungeonState) => s.applyTurnToChangeHistory(),
        (s: DungeonState) => s.setPerformerForLastActivity(),
        (s: DungeonState) => s.updateRound()
      ]
    };
  
    const stateDispatcher = new StateDispatcher(dispatcherConfiguration);
    const dungeonStateStore = new DungeonStateStore(stateDispatcher, stateStorage);
    dungeonStateStore.initializeStore(initialDungeonState);
    return dungeonStateStore;
  }
}

