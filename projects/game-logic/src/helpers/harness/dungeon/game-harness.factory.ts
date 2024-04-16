import { StateStore } from "../../state-store";
import { DataFeed } from "../../data-feed";
import { IStateStorage } from "@utils/store/interfaces/store-state-storage.interface";
import { enterDungeon } from "../../../gameplay/activities/adventure/enter-dungeon.activity";
import { DungeonGameplayLogicState } from "../../../gameplay/state/dungeon/dungeon-gameplay";
import { DungeonGameplayFactory } from "../../dungeon-gameplay.factory";
import { StateDispatcher } from "../../../lib/base/state/state-dispatcher";
import { AdventureGameplayFactory } from "../../adventure-gameplay.factory";

export class GameHarnessFactory {

  // constructor(
  //   private readonly _adventureGameplayFactory: AdventureGameplayFactory,
  //   private readonly _dungeonGameplayFactory: DungeonGameplayFactory,
  //   private readonly _dataFeed: DataFeed
  // ) {}

  // public createDataFeed(): DataFeed {
  //   return new DataFeed();
  // }

  // public async prepareInitialDungeonState(): Promise<DungeonGameplay> {
  //   const state = await this._adventureGameplayFactory.create(heroTemplate);
  //   const targetDungeon = (await this._dataFeed.getDungeonAreas())[0];
  //   await enterDungeon({ dungeonId: targetDungeon.id })(state, this._dataFeed);
  //   return await this._dungeonGameplayFactory.create(targetDungeon.id, [{ ...state.player, heroes: [state.hero] }]);
  // }

  // public createDungeonGameHarnessDataStore(
  //   initialDungeonState: DungeonGameplay,
  //   stateStorage: IStateStorage<DungeonGameplay>
  // ): StateStore {
  //   const gameDataFeed = new DataFeed();
  //   const dispatcherConfiguration = {
  //     context: gameDataFeed,
  //     postDirectiveMutators: [
  //       (s: DungeonGameplay) => s.gameplayService.applyTurnToChangeHistory(),
  //       (s: DungeonGameplay) => s.gameplayService.setPerformerForLastActivity(),
  //       (s: DungeonGameplay) => s.gameplayService.updateRoundCount()
  //     ]
  //   };
  
  //   const stateDispatcher = new StateDispatcher(dispatcherConfiguration);
  //   const dungeonStateStore = new StateStore(stateDispatcher, stateStorage);
  //   dungeonStateStore.initializeStore(initialDungeonState);
  //   return dungeonStateStore;
  // }
}

