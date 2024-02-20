import { DungeonStateStore } from "./dungeon-state-store";
import { GameHarnessDataFeed } from "../game-harness-data-feed";
import { IStateStorage } from "@utils/store/interfaces/store-state-storage.interface";
import { heroTemplate } from "../../gameplay/data/hero-templates";
import { enterDungeon } from "../../gameplay/adventure/activities/enter-dungeon.activity";
import { DungeonGameplay } from "../../gameplay/dungeon/state/dungeon-gameplay";
import { AdventureGameplayFactory } from "../../gameplay/adventure/adventure-gameplay.factory";
import { DungeonGameplayFactory } from "../../gameplay/dungeon/state/dungeon-gameplay.factory";
import { StateDispatcher } from "../../lib/base/state/state-dispatcher";

export class GameHarnessFactory {

  constructor(
    private readonly _adventureGameplayFactory: AdventureGameplayFactory,
    private readonly _dungeonGameplayFactory: DungeonGameplayFactory,
    private readonly _dataFeed: GameHarnessDataFeed
  ) {}

  public createDataFeed(): GameHarnessDataFeed {
    return new GameHarnessDataFeed();
  }

  public async prepareInitialDungeonState(): Promise<DungeonGameplay> {
    const state = await this._adventureGameplayFactory.create(heroTemplate);
    const targetDungeon = (await this._dataFeed.getDungeonGameplayTemplates())[0];
    await enterDungeon({ dungeonId: targetDungeon.id })(state, this._dataFeed);
    return await this._dungeonGameplayFactory.create(targetDungeon.id, [{ ...state.player, heroes: [state.hero] }]);
  }

  public createDungeonGameHarnessDataStore(
    initialDungeonState: DungeonGameplay,
    stateStorage: IStateStorage<DungeonGameplay>
  ): DungeonStateStore {
    const gameDataFeed = new GameHarnessDataFeed();
    const dispatcherConfiguration = {
      context: gameDataFeed,
      postDirectiveMutators: [
        (s: DungeonGameplay) => s.gameplayService.applyTurnToChangeHistory(),
        (s: DungeonGameplay) => s.gameplayService.setPerformerForLastActivity(),
        (s: DungeonGameplay) => s.gameplayService.updateRoundCount()
      ]
    };
  
    const stateDispatcher = new StateDispatcher(dispatcherConfiguration);
    const dungeonStateStore = new DungeonStateStore(stateDispatcher, stateStorage);
    dungeonStateStore.initializeStore(initialDungeonState);
    return dungeonStateStore;
  }
}

