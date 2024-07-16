import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { GameLoadingService } from '../../game-persistence/services/game-loading.service';
import { IPersistableGameState } from '../../game-persistence/interfaces/persisted-game.interface';
import { Dungeon } from '../../dungeon/api';
import { Adventure } from '../../adventure/adventure.routing';
import { LoadingScreenService } from 'src/app/shared/loaders/services/loading-screen.service';
import { GameLoadingScreenComponent } from '../components/game-loading-screen/game-loading-screen.component';
import { GAME_LOADING_SCREEN } from '../constants/game-loader.constants';
import { IDungeonGameplayDeclaration } from '@game-logic/gameplay/modules/dungeon/dungeon.interface';
import { INITIALIZATION_LOADING_SCREEN } from 'src/app/infrastructure/configuration/api';
import { IAdventureGameplayDeclaration } from '@game-logic/gameplay/modules/adventure/adventure.interface';


@Injectable()
export class GameResolver implements Resolve<string> {

  constructor(
    private readonly _gameLoaderService: GameLoadingService,
    private readonly _loadingScreenService: LoadingScreenService
  ) { }

  public async resolve(): Promise<string> {
    this._loadingScreenService.hideLoadingScreen(INITIALIZATION_LOADING_SCREEN);

    this._loadingScreenService.showLoadingScreen(GAME_LOADING_SCREEN, GameLoadingScreenComponent)
    const loadedData = await this._gameLoaderService.loadGameData<IDungeonGameplayDeclaration & IAdventureGameplayDeclaration & IPersistableGameState>();
    
    const dungeon = loadedData.gameStates.find(gs => gs.isDungeonGameplay || gs.visitedDungeonAreaId);
    return !!dungeon ? Dungeon.ROOT_PATH : Adventure.ROOT_PATH;
  }
 }
