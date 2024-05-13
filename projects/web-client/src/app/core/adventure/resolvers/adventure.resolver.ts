import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DataFeedService } from '../../game-data/services/data-feed.service';
import { AdventureStateStore } from '../stores/adventure-state.store';
import { AdventureGameplayStateFactoryService } from '../services/adventure-gameplay-state-factory.service';
import { LoadingScreenService } from 'src/app/shared/loaders/services/loading-screen.service';
import { GAME_LOADING_SCREEN } from '../../game/constants/game-loader.constants';
import { Observable, map, tap, timer } from 'rxjs';

@Injectable()
export class AdventureResolver implements Resolve<boolean> {

  constructor(
    private readonly _dataFeed: DataFeedService,
    private readonly _adventureStateStore: AdventureStateStore,
    private readonly _adventureStateService: AdventureGameplayStateFactoryService,
    private readonly _loadingScreenService: LoadingScreenService
  ) { }

  public resolve(): Observable<boolean> { 
    return timer(1000)
      .pipe(
        tap(() => this._loadingScreenService.hideLoadingScreen(GAME_LOADING_SCREEN)),
        map(() => true)
      )
  }
}
