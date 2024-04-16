import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import { Observable, from } from 'rxjs';
import { DataFeedService } from '../../data/services/data-feed.service';
import { DungeonStateStore } from '../stores/dungeon-state.store';
import { DungeonStateService } from '../services/dungeon-state.service';
import { DungeonBuilder } from '@game-logic/gameplay/modules/dungeon/builder/dungeon.builder';
import { AdventureStateStore } from '../../adventure/stores/adventure-state.store';

@Injectable()
export class DungeonResolver implements Resolve<void> {

  constructor(
    private readonly _dataFeed: DataFeedService,
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _adventureStateService: AdventureStateStore,
    private readonly _dungeonStateService: DungeonStateService,
  ) { }

  public resolve(): Observable<void> {
    return from(this._initializeData())
  }

  private async _initializeData(): Promise<void> {
    await this._dungeonStateStore.initializeStore(s => this._dungeonStateService.initializeDungeonGameplay(s, this._dataFeed));

    if (!this._dungeonStateStore.currentState) {
      const { visitedDungeon, hero, player } = this._adventureStateService.currentState
      const state = await DungeonBuilder.build(visitedDungeon, [player], [hero]);
      const gameplay = this._dungeonStateService.initializeDungeonGameplay(state, this._dataFeed);
      await this._dungeonStateStore.setState(gameplay);
    }
  }
 }
