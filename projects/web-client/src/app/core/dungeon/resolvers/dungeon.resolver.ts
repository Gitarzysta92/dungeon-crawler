import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DataFeedService } from '../../game-data/services/data-feed.service';
import { DungeonStateStore } from '../stores/dungeon-state.store';
import { DungeonGameplayFactory } from '../gameplay/dungeon-gameplay.factory';
import { GameLoadingService } from '../../game-persistence/services/game-loading.service';
import { IPersistableGameState } from '../../game-persistence/interfaces/persisted-game.interface';
import { LoadingScreenService } from 'src/app/shared/loaders/services/loading-screen.service';
import { GAME_LOADING_SCREEN } from '../../game/constants/game-loader.constants';
import { AdventureStateStore } from '../../adventure/stores/adventure-state.store';
import { AdventureGameplayFactory } from '../../adventure/gameplay/adventure-gameplay.factory';
import { GameLoadingScreenComponent } from '../../game/components/game-loading-screen/game-loading-screen.component';
import { GameUiStore } from '../../game-ui/stores/game-ui.store';
import { HeroViewComponent } from '../../game/components/hero-view/hero-view.component';
import { JournalViewComponent } from '../../game/components/journal-view/journal-view.component';
import { GameMenuViewComponent } from '../../game/components/game-menu-view/game-menu-view.component';
import { IDungeonGameplayState } from '../gameplay/dungeon-gameplay.interface';
import { SceneAssetsLoaderService } from '../../scene/services/scene-assets-loader.service';
import { SceneService } from '../../scene/services/scene.service';
import { IAdventureGameplayState } from '../../adventure/gameplay/adventure-gameplay.interface';
import { DungeonGameplayBuilder } from '../gameplay/dungeon-gameplay.builder';
import { computerPlayer, humanPlayer } from '../../game-data/constants/players.data';


@Injectable()
export class DungeonResolver implements Resolve<void> {

  constructor(
    private readonly _dataFeed: DataFeedService,
    private readonly _gameLoaderService: GameLoadingService,
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _dungeonStateService: DungeonGameplayFactory,
    private readonly _loadingScreenService: LoadingScreenService,
    private readonly _adventureStateStore: AdventureStateStore,
    private readonly _adventureStateService: AdventureGameplayFactory,
    private readonly _gameUiStore: GameUiStore,
    private readonly _sceneAssetsLoader: SceneAssetsLoaderService,
    private readonly _sceneService: SceneService,
    private readonly _dungeonGameplayBuilder: DungeonGameplayBuilder
  ) { }

  public async resolve(): Promise<void> {
    this._loadingScreenService.showLoadingScreen(GAME_LOADING_SCREEN, GameLoadingScreenComponent);
    const loadedData = await this._gameLoaderService.loadGameData<IDungeonGameplayState & IAdventureGameplayState & IPersistableGameState>();

    const adventure = loadedData.gameStates.find(gs => gs.isAdventureGameplay);
    if (!adventure) {
      throw new Error("Adventure state not available")
    }
    await this._adventureStateStore.initializeStore(adventure, s => this._adventureStateService.initializeAdventureGameplay(s, this._dataFeed));

    let dungeon = loadedData.gameStates.find(gs => gs.isDungeonGameplay) as IDungeonGameplayState;
    if (!dungeon) {
      const { visitedDungeon, hero, persistedGameDataId } = this._adventureStateStore.currentState;
      dungeon = await this._dungeonGameplayBuilder.createDungeon(visitedDungeon, [hero], persistedGameDataId);
    }
    if (!dungeon) {
      throw new Error("Dungeon not available");
    }
    await this._dungeonStateStore.initializeStore(dungeon, s => this._dungeonStateService.initializeDungeonGameplay(s, this._dataFeed));

    this._gameUiStore.initializeStore({
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
    const { scene, entities } = this._dungeonStateStore.currentState;
    const composerDeclarations = scene.composerDeclarations.concat(entities
      .filter(e => !!e.createSceneObjects)
      .flatMap(e => e.createSceneObjects()))
    
    await this._sceneAssetsLoader.loadAssets(composerDeclarations as any);
    await this._sceneService.composeScene(composerDeclarations);

    this._dungeonStateStore.currentState.initializeGameplayLoop();
    if (!this._dungeonStateStore.currentState.isGameStarted) {
      await this._dungeonStateStore.currentState.startGame({
        players: [humanPlayer, computerPlayer],
        order: [humanPlayer.id, computerPlayer.id]
      })
    }

    await new Promise(r => setTimeout(r, 1000));
    this._loadingScreenService.hideLoadingScreen(GAME_LOADING_SCREEN);
  }

}
