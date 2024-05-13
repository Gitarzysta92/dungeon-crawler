import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import { Observable, from } from 'rxjs';
import { DataFeedService } from '../../game-data/services/data-feed.service';
import { DungeonStateStore } from '../stores/dungeon-state.store';
import { DungeonGameplayStateFactoryService } from '../services/dungeon-gameplay-state-factory.service';
import { DungeonBuilder } from '@game-logic/gameplay/modules/dungeon/builder/dungeon.builder';
import { AdventureStateStore } from '../../adventure/stores/adventure-state.store';

@Injectable()
export class DungeonResolver implements Resolve<void> {
  private _dungeonBuilder: DungeonBuilder;

  constructor(
    private readonly _dataFeed: DataFeedService,
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _adventureStateService: AdventureStateStore,
    private readonly _dungeonStateService: DungeonGameplayStateFactoryService,
  ) { 
    this._dungeonBuilder = new DungeonBuilder();
  }

  public resolve(): Observable<void> {
    return from(this._initializeData())
  }

  private async _initializeData(): Promise<void> {
    if (!this._dungeonStateStore.currentState) {
      const { visitedDungeon, hero, player } = this._adventureStateService.currentState
      const state = await this._dungeonBuilder.build(visitedDungeon, [player], [hero]);
      const gameplay = this._dungeonStateService.initializeDungeonGameplay(state, this._dataFeed);
      await this._dungeonStateStore.setState(gameplay as any);
    }
  }
 }
