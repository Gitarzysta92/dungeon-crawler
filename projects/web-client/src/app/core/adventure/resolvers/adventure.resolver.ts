import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DataFeedService } from '../../game-data/services/data-feed.service';
import { AdventureStateStore } from '../stores/adventure-state.store';
import { AdventureGameplayStateFactoryService } from '../services/adventure-gameplay-state-factory.service';
import { LoadingScreenService } from 'src/app/shared/loaders/services/loading-screen.service';
import { GAME_LOADING_SCREEN } from '../../game/constants/game-loader.constants';
import { GameLoadingService } from '../../game-persistence/services/game-loading.service';
import { IAdventureStateDeclaration } from '@game-logic/gameplay/modules/adventure/mixins/adventure-state/adventure-state.interface';
import { IPersistableGameState } from '../../game-persistence/interfaces/persisted-game.interface';

@Injectable()
export class AdventureResolver implements Resolve<void> {

  constructor(
    private readonly _dataFeed: DataFeedService,
    private readonly _gameLoaderService: GameLoadingService,
    private readonly _adventureStateStore: AdventureStateStore,
    private readonly _adventureStateService: AdventureGameplayStateFactoryService,
    private readonly _loadingScreenService: LoadingScreenService
  ) { }

  public async resolve(): Promise<void> { 
    const loadedData = await this._gameLoaderService.loadGameData<IAdventureStateDeclaration & IPersistableGameState>();
    
    const adventure = loadedData.gameStates.find(gs => gs.isAdventureState);
    if (!adventure) {
      throw new Error("Adventure state not available")
    }

    if (!this._adventureStateStore.isInitialized) {
      await this._adventureStateStore.initializeStore(adventure, s => this._adventureStateService.initializeAdventureGameplay(s, this._dataFeed));
    }

    await new Promise(r => setTimeout(r, 1000))
    this._loadingScreenService.hideLoadingScreen(GAME_LOADING_SCREEN)
  }
}
