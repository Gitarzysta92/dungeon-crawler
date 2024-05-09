import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DataFeedService } from '../../game-data/services/data-feed.service';
import { AdventureStateStore } from '../stores/adventure-state.store';
import { AdventureGameplayStateFactory } from '../state/adventure-gameplay-state.factory';
import { LoadingScreenService } from 'src/app/shared/loaders/services/loading-screen.service';
import { GAME_LOADING_SCREEN } from '../../game/constants/game-loader.constants';

@Injectable()
export class AdventureResolver implements Resolve<void> {

  constructor(
    private readonly _dataFeed: DataFeedService,
    private readonly _adventureStateStore: AdventureStateStore,
    private readonly _adventureStateService: AdventureGameplayStateFactory,
    private readonly _loadingScreenService: LoadingScreenService
  ) { }

  public async resolve(): Promise<void> {
    await new Promise(res => setTimeout(res, 10000));
    this._loadingScreenService.hideLoadingScreen(GAME_LOADING_SCREEN)
    return;
  }

 }
