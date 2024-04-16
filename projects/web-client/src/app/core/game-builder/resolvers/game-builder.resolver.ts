import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, from } from 'rxjs';
import { DataFeedService } from '../../data/services/data-feed.service';
import { GameBuilderStateService } from '../services/game-builder-state.service';
import { GameBuilderStateStore } from '../stores/game-builder-state.store';


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
    const initialState = 
    await this._gameBuilderStateStore.initializeStore(s => this._gameBuilderStateService.initializeState(s, this._dataFeed));
  }
 }
