import { Injectable } from '@angular/core';
import { IAdventureState, IDungeonState } from '@game-logic/lib/states/game.interface';
import { adventureStateStore } from 'src/app/core/adventure/stores/adventure-state.store';
import { dungeonStateStore } from 'src/app/core/dungeon-logic/stores/dungeon-state.store';
import { IndexedDbService, LocalStorageService } from 'src/app/infrastructure/data-store/api';
import { IGameSettings } from '../../interfaces/game-settings.interface';
import { IPersistedGameProgression } from '../../interfaces/persisted-game-progression.interface';

@Injectable({
  providedIn: 'root'
})
export class PersistedGameProgressionService {

  private _persistedProgressionsKey: string = 'persisted-progressions-key';

  constructor(
    private readonly _localStoreService: LocalStorageService,
    private readonly _indexedDbService: IndexedDbService
  ) { 
    this._indexedDbService.createTable(this._persistedProgressionsKey);
  }
  
  public async loadProgression(progression: IPersistedGameProgression): Promise<void> {
    const isLoaded = await this.isGameProgressLoaded();
    if (isLoaded) {
      await this.persistCurrentProgression();
    }

    await this._localStoreService.createOrUpdate(adventureStateStore.description, progression.adventureState);
    if (progression.dungeonState) {
      await this._localStoreService.createOrUpdate(dungeonStateStore.description, progression.dungeonState);
    }
  }

  public async isGameProgressLoaded(): Promise<boolean> {
    return !!await this._localStoreService.read<IAdventureState>(adventureStateStore.description)
  }

  public async persistCurrentProgression(): Promise<void> {
    const adventureState = await this._localStoreService.read<IGameSettings & IAdventureState>(adventureStateStore.description);
    const dungeonState = await this._localStoreService.read<IGameSettings & IDungeonState>(dungeonStateStore.description);

    if (!adventureState) {
      return;
    }

    await this._indexedDbService
      .createOrUpdate<IPersistedGameProgression>(adventureState.adventureStateId, { adventureState, dungeonState }, this._persistedProgressionsKey);
    
    this._localStoreService.clear(adventureStateStore.description);
    this._localStoreService.clear(dungeonStateStore.description);
  }

  public async getPersistedProgressions(): Promise<IPersistedGameProgression[]> {
    return this._indexedDbService.readAll<IPersistedGameProgression>(this._persistedProgressionsKey);
  }

  public async getCurrentProgression(): Promise<IPersistedGameProgression | undefined> {
    const adventureState = await this._localStoreService.read<IGameSettings & IAdventureState>(adventureStateStore.description);
    const dungeonState = await this._localStoreService.read<IGameSettings & IDungeonState>(dungeonStateStore.description);

    if (!adventureState) {
      return;
    }

    return { dungeonState, adventureState };
  }

  public async removeProgression(progression: IPersistedGameProgression): Promise<void> {
    const dungeonState = await this._localStoreService.read<IGameSettings & IDungeonState>(adventureStateStore.description);

    if (!!dungeonState) {
      this._localStoreService.clear(adventureStateStore.description);
      this._localStoreService.clear(dungeonStateStore.description);
    } else {
      this._indexedDbService.clear(progression.adventureState.adventureStateId, this._persistedProgressionsKey);
    }
  }

}
