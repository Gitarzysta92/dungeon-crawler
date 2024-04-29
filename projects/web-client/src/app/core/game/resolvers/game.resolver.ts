import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, from } from 'rxjs';
import { GamePersistenceService } from '../../game-persistence/services/game-persistence.service';
import { AdventureGameplayService } from '../../adventure/services/adventure-gameplay.service';
import { AdventureStateStore } from '../../adventure/stores/adventure-state.store';
import { DataFeedService } from '../../data/services/data-feed.service';
import { DungeonStateService } from '../../dungeon/services/dungeon-state.service';
import { DungeonStateStore } from '../../dungeon/stores/dungeon-state.store';
import { IAdventureGameplayStateDto } from '@game-logic/gameplay/state/adventure/adventure-gameplay.interface';
import { IDungeonGameplayStateDto } from '@game-logic/gameplay/state/dungeon/dungeon-gameplay.interface';

@Injectable()
export class GameResolver implements Resolve<void> {

  constructor(
    private readonly _gameLoaderService: GamePersistenceService,
    private readonly _dataFeed: DataFeedService,
    private readonly _adventureStateStore: AdventureStateStore,
    private readonly _adventureStateService: AdventureGameplayService,
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _dungeonStateService: DungeonStateService,
  ) { }

  public async resolve(): Promise<void> {
    const loadedData = await this._gameLoaderService.loadGameData<IDungeonGameplayStateDto & IAdventureGameplayStateDto>();

    const dungeon = loadedData.gameStates.find(gs => gs.isDungeonState);
    if (dungeon) {
      await this._dungeonStateStore.initializeStore(s => this._dungeonStateService.initializeDungeonGameplay(s, this._dataFeed));
    }

    const adventure = loadedData.gameStates.find(gs => gs.isAdventureState);
    if (adventure) {
      await this._adventureStateStore.initializeStore(s => this._adventureStateService.initializeAdventureGameplay(s, this._dataFeed));
    }
  }
 }
