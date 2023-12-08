import { DungeonStateStore } from "./game-harness-state-store";
import { GameHarnessDataFeed } from "./game-harness-data-feed";
import { IStateStorage } from "@utils/store/interfaces/store-state-storage.interface";
import { heroTemplate } from "../../data/hero-templates";
import { enterDungeon } from "../../lib/activities/player-activities/enter-dungeon.directive";
import { DungeonState } from "../../lib/states/dungeon-state";
import { StateFactory } from "../../lib/states/state.factory";
import { StateDispatcher } from "../../lib/utils/state-dispatcher/state-dispatcher";

export class GameHarnessFactory {

  public static createDataFeed(): GameHarnessDataFeed {
    return new GameHarnessDataFeed();
  }

  public static async prepareInitialDungeonState(dataFeed: GameHarnessDataFeed): Promise<DungeonState> {
    const state = await StateFactory.createAdventureState(heroTemplate, dataFeed);
    const targetDungeon = (await dataFeed.getDungeons())[0];
    await enterDungeon({ dungeonId: targetDungeon.id })(state, dataFeed);
    return await StateFactory.createDungeonState(state, dataFeed, state.dungeonInstance);
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
        (s: DungeonState) => s.updateRoundCount()
      ]
    };
  
    const stateDispatcher = new StateDispatcher(dispatcherConfiguration);
    const dungeonStateStore = new DungeonStateStore(stateDispatcher, stateStorage);
    dungeonStateStore.initializeStore(initialDungeonState);
    return dungeonStateStore;
  }
}

