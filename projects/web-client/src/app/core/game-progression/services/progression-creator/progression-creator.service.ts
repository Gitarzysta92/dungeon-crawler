import { Injectable } from '@angular/core';
import { StateFactory } from '@game-logic/lib/states/state.factory';
import { DataFeedService } from '../../../data-feed/services/data-feed.service';
import { v4 } from 'uuid';
import { AdventureState } from '@game-logic/lib/states/adventure-state';
import { IGameSettings } from '../../interfaces/game-settings.interface';
import { IHeroDataFeedEntity } from 'src/app/core/data-feed/interfaces/data-feed-hero-entity.interface';

@Injectable({
  providedIn: 'root'
})
export class ProgressionCreatorService {

  constructor(
    private readonly _dataFeedService: DataFeedService,
  ) { }

  public async createGame(
    name: string,
    avatar: string,
    hero: IHeroDataFeedEntity,
  ): Promise<AdventureState & IGameSettings> { 
    const adventureState = await StateFactory.createAdventureState(hero, this._dataFeedService);
    adventureState.hero.id = v4();

    return Object.assign(adventureState, {
      timestamp: new Date().getTime().toString(),
      gameVersion: await this._dataFeedService.getVersion(),
      heroName: name,
      heroAvatar: avatar,
      adventureStateId: v4()
    })
  }
}
