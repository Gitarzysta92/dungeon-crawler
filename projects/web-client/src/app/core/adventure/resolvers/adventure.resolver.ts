import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DataFeedService } from '../../game-data/services/data-feed.service';
import { AdventureStateStore } from '../stores/adventure-state.store';
import { AdventureGameplayFactory } from '../gameplay/adventure-gameplay.factory';
import { LoadingScreenService } from 'src/app/shared/loaders/services/loading-screen.service';
import { GAME_LOADING_SCREEN } from '../../game/constants/game-loader.constants';
import { GameLoadingService } from '../../game-persistence/services/game-loading.service';
import { IPersistableGameState } from '../../game-persistence/interfaces/persisted-game.interface';
import { GameUiStore } from '../../game-ui/stores/game-ui.store';
import { HeroViewComponent } from '../../game/components/hero-view/hero-view.component';
import { GameMenuViewComponent } from '../../game/components/game-menu-view/game-menu-view.component';
import { JournalViewComponent } from '../../game/components/journal-view/journal-view.component';
import { SceneService } from '../../scene/services/scene.service';
import { SceneAssetsLoaderService } from '../../scene/services/scene-assets-loader.service';
import { IAdventureGameplayState } from '../gameplay/adventure-gameplay.interface';
import { humanPlayer } from '@game-logic/gameplay/data/players.data';

@Injectable()
export class AdventureResolver implements Resolve<void> {

  constructor(
    private readonly _dataFeed: DataFeedService,
    private readonly _gameLoaderService: GameLoadingService,
    private readonly _adventureStateStore: AdventureStateStore,
    private readonly _adventureStateService: AdventureGameplayFactory,
    private readonly _loadingScreenService: LoadingScreenService,
    private readonly _gameUiStore: GameUiStore,
    private readonly _sceneService: SceneService,
    private readonly _sceneAssetsLoader: SceneAssetsLoaderService,
  ) { }

  public async resolve(): Promise<void> { 
    const loadedData = await this._gameLoaderService.loadGameData<IAdventureGameplayState & IPersistableGameState>();
    
    const adventure = loadedData.gameStates.find(gs => gs.isAdventureGameplay);
    if (!adventure) {
      throw new Error("Adventure state not available")
    }
    
    await this._adventureStateStore.initializeStore(adventure, s => this._adventureStateService.initializeAdventureGameplay(s, this._dataFeed));

    await this._gameUiStore.initializeStore({
      auxiliaryViews: [
        // {
        //   component: AreaViewComponent,
        //   isActive: false,
        //   layerId: 1,
        //   label: "area",
        //   icon: "tower" as any,
        //   isDisabled: false,
        //   isHighlighted: false
        // },
        {
          component: HeroViewComponent,
          isActive: false,
          layerId: 1,
          label: "hero",
          icon: "helmet" as any,
          isDisabled: false,
          isHighlighted: false
        },
        {
          component: JournalViewComponent,
          isActive: false,
          layerId: 1,
          label: "hero",
          icon: "journal" as any,
          isDisabled: false,
          isHighlighted: false
        },
        {
          component: GameMenuViewComponent,
          isActive: false,
          layerId: 1,
          label: "game-menu",
          icon: "cog" as any,
          isDisabled: false,
          isHighlighted: false
        }
      ],
      contextBarItems: []
    })

    this._sceneService.createScene(this._sceneAssetsLoader);
    const { scene, entities } = this._adventureStateStore.currentState;
    const composerDeclarations = scene.composerDeclarations.concat(entities
      .filter(e => !!e.createSceneObjects)
      .flatMap(e => e.createSceneObjects()))
    
    await this._sceneAssetsLoader.loadAssets(composerDeclarations as any);
    await this._sceneService.composeScene(composerDeclarations);

    if (!this._adventureStateStore.currentState.isGameStarted) {
      await this._adventureStateStore.currentState.startGame({ players: [humanPlayer] })
    }

    await new Promise(r => setTimeout(r, 1000));
    this._loadingScreenService.hideLoadingScreen(GAME_LOADING_SCREEN);
  }
}
