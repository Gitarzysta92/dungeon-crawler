import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, from } from 'rxjs';
import { DataFeedService } from '../../data/services/data-feed.service';
import { GameBuilderStateService } from '../services/game-builder-state.service';
import { GameBuilderStateStore } from '../stores/game-builder-state.store';
import { IGameBuilderState } from '../state/game-builder-state.interface';


@Injectable()
export class GameBuilderResolver implements Resolve<void> {

  constructor(
    private readonly _dataFeed: DataFeedService,
    private readonly _gameBuilderStateStore: GameBuilderStateStore,
    private readonly _gameBuilderStateService: GameBuilderStateService,
  ) { }

  public resolve(): Observable<void> {
    return from(this._initializeData())
  }

  private async _initializeData(): Promise<void> {
    const initialState: IGameBuilderState = {
      hero: await this._dataFeed.getHeroTemplate(),
      steps: [
        { data: await this._dataFeed.getHeroRaces(), narrative: { name: "", description: ""}, isMixin: true, isNarrationMedium: true, isVisualMedium: true, visual: {} },
        { data: await this._dataFeed.getHeroClasses(), narrative: { name: "", description: ""}, isMixin: true, isNarrationMedium: true, isVisualMedium: true, visual: {}  },
        { data: await this._dataFeed.getHeroOrigins(), narrative: { name: "", description: ""}, isMixin: true, isNarrationMedium: true, isVisualMedium: true, visual: {}  }
      ]
    }
    await this._gameBuilderStateStore.initializeStore(initialState, s => { return this._gameBuilderStateService.initializeState(s, this._dataFeed);});
  }
 }
