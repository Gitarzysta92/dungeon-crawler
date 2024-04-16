import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, from } from 'rxjs';
import { DataFeedService } from '../../data/services/data-feed.service';
import { AdventureStateStore } from '../stores/adventure-state.store';
import { AdventureStateService } from '../services/dungeon-state.service';

@Injectable()
export class AdventureResolver implements Resolve<void> {

  constructor(
    private readonly _dataFeed: DataFeedService,
    private readonly _adventureStateStore: AdventureStateStore,
    private readonly _adventureStateService: AdventureStateService,
  ) { }

  public resolve(): Observable<void> {
    return from(this._initializeData())
  }

  private async _initializeData(): Promise<void> {
    await this._adventureStateStore.initializeStore(s => this._adventureStateService.initializeAdventureGameplay(s, this._dataFeed));
  }
 }
