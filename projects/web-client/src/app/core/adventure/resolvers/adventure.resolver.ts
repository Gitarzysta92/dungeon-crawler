import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, from } from 'rxjs';
import { DataFeedService } from '../../game-data/services/data-feed.service';
import { AdventureStateStore } from '../stores/adventure-state.store';
import { AdventureGameplayStateFactory } from '../state/adventure-gameplay-state.factory';

@Injectable()
export class AdventureResolver implements Resolve<void> {

  constructor(
    private readonly _dataFeed: DataFeedService,
    private readonly _adventureStateStore: AdventureStateStore,
    private readonly _adventureStateService: AdventureGameplayStateFactory,
  ) { }

  public resolve(): Observable<void> {
    return from(this._initializeData())
  }

  private async _initializeData(): Promise<void> {
    await this._adventureStateStore.initializeStore(s => this._adventureStateService.initializeAdventureGameplay(s, this._dataFeed));
  }
 }
