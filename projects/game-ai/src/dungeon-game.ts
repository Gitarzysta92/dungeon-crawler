import { DungeonState } from "@game-logic/lib/states/dungeon-state";
import { DungeonDeckAi } from "./dungeon-deck-ai";
import { DungeonPlayerAi } from "./dungeon-player-ai";
import { StateSnapshotStorage } from "./state-snapshot-storage";
import { GameHarnessFactory } from "@game-logic/game/harness/game-harness.factory";
import { DungeonGameHarness } from "@game-logic/game/harness/dungeon-game-harness";

async function trainModels(deckModel: any, playerModel: any) {
  console.log('Started');
  const dataFeed = GameHarnessFactory.createDataFeed();
  const initialDungeonState = await GameHarnessFactory.prepareInitialDungeonState(dataFeed);
  console.log(initialDungeonState.board);
  const stateStorage = new StateSnapshotStorage<DungeonState>()
  const stateStore = GameHarnessFactory.createDungeonGameHarnessDataStore(initialDungeonState, stateStorage);
  
  const dungeonAi = new DungeonDeckAi(stateStore, deckModel);
  const playerAi = new DungeonPlayerAi(stateStore, playerModel);
  const gameHarness= new DungeonGameHarness(stateStore, playerAi, dungeonAi);

  await gameHarness.performGame();
  console.log('Finished');
  return stateStorage.getSnapshots();
}



trainModels({}, {});