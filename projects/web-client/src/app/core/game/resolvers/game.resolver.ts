import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AdventureGameplayStateFactory } from '../../adventure/state/adventure-gameplay-state.factory';
import { AdventureStateStore } from '../../adventure/stores/adventure-state.store';
import { DataFeedService } from '../../game-data/services/data-feed.service';
import { DungeonStateFactory } from '../../dungeon/state/dungeon-gameplay-state.factory';
import { DungeonStateStore } from '../../dungeon/stores/dungeon-state.store';
import { IAdventureGameplayStateDto } from '@game-logic/gameplay/state/adventure/adventure-gameplay.interface';
import { IDungeonGameplayStateDto } from '@game-logic/gameplay/state/dungeon/dungeon-gameplay.interface';
import { GameLoadingService } from '../../game-persistence/services/game-loading.service';
import { IPersistableGameState } from '../../game-persistence/interfaces/persisted-game.interface';
import { Dungeon } from '../../dungeon/api';
import { Adventure } from '../../adventure/adventure.routing';
import { LoadingScreenService } from 'src/app/shared/loaders/services/loading-screen.service';
import { GameLoadingScreenComponent } from '../components/game-loading-screen/game-loading-screen.component';
import { GAME_LOADING_SCREEN } from '../constants/game-loader.constants';

@Injectable()
export class GameResolver implements Resolve<string> {

  constructor(
    private readonly _gameLoaderService: GameLoadingService,
    private readonly _dataFeed: DataFeedService,
    private readonly _adventureStateStore: AdventureStateStore,
    private readonly _adventureStateService: AdventureGameplayStateFactory,
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _dungeonStateService: DungeonStateFactory,
    private readonly _loadingScreenService: LoadingScreenService
  ) { }

  public async resolve(): Promise<string> {
    this._loadingScreenService.showLoadingScreen(GAME_LOADING_SCREEN, GameLoadingScreenComponent)
    const loadedData = await this._gameLoaderService.loadGameData<IDungeonGameplayStateDto & IAdventureGameplayStateDto & IPersistableGameState>();

    const dungeon = loadedData.gameStates.find(gs => gs.isDungeonState);
    if (dungeon) {
      if (!this._dungeonStateStore.isInitialized) {
        await this._dungeonStateStore.initializeStore(s => this._dungeonStateService.initializeDungeonGameplay(s, this._dataFeed)); 
      }
      await this._dungeonStateStore.setState(dungeon);
    }

    const adventure = loadedData.gameStates.find(gs => gs.isAdventureState);
    if (!adventure) {
      throw new Error("Adventure state not available")
    }

    if (!this._adventureStateStore.isInitialized) {
      await this._adventureStateStore.initializeStore(s => this._adventureStateService.initializeAdventureGameplay(s, this._dataFeed));
    }

    await this._adventureStateStore.setState(adventure);

    return !!dungeon ? Dungeon.ROOT_PATH : Adventure.ROOT_PATH;
  }
 }
