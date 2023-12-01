import { DungeonDeckAi } from "./dungeon-deck-ai.example";
import { DungeonPlayerAi } from "./dungeon-player-ai.example";
import { GameHarnessFactory } from "./harness/game-harness.factory";
import { DungeonGameHarness } from "./harness/dungeon-game-harness";
import { StateSnapshotStorage } from "./state-snapshot-storage.example";
import { DungeonState } from "src/lib/states/dungeon-state";

async function trainModels(deckModel: any, playerModel: any) {
  const dataFeed = GameHarnessFactory.createDataFeed();
  const initialDungeonState = await GameHarnessFactory.prepareInitialDungeonState(dataFeed);
  const stateStorage = new StateSnapshotStorage<DungeonState>()
  const stateStore = GameHarnessFactory.createDungeonGameHarnessDataStore(initialDungeonState, stateStorage);
  
  const dungeonAi = new DungeonDeckAi(stateStore, deckModel);
  const playerAi = new DungeonPlayerAi(stateStore, playerModel);
  const gameHarness= new DungeonGameHarness(stateStore, playerAi, dungeonAi);

  await gameHarness.performGame();
  return stateStorage.getSnapshots();
}