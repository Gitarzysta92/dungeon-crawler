import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, from } from 'rxjs';
import { ILoadedDungeonData } from '../interfaces/loaded-dungeon-data.interface';
import { DataFeedService } from '../../data-feed/services/data-feed.service';
import { DungeonStateStore } from '../../dungeon-logic/stores/dungeon-state.store';
import { DungeonSceneStore } from '../../dungeon-scene/stores/dungeon-scene.store';
import { DungeonActivityLogStore } from '../../dungeon-ui/stores/dungeon-activity-log.store';
import { DungeonUiStore } from '../../dungeon-ui/stores/dungeon-ui.store';
import { DungeonInteractionStore } from '../stores/dungeon-interaction.store';

@Injectable()
export class DungeonResolver implements Resolve<ILoadedDungeonData> {

  constructor(
    private readonly _dataFeed: DataFeedService,
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _dungeonInteractionStore: DungeonInteractionStore,
    private readonly _dungeonSceneStore: DungeonSceneStore,
    private readonly _dungeonUiStore: DungeonUiStore,
    private readonly _dungeonActivityLogStore: DungeonActivityLogStore,
  ) { }


  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILoadedDungeonData> {
    return from(this._initializeData())
  }

  private async _initializeData(): Promise<ILoadedDungeonData> {
    await this._dungeonStateStore.initializeStore(this._dataFeed);
    await this._dungeonInteractionStore.initializeStore(this._dungeonStateStore.currentState);
    await this._dungeonSceneStore.initializeStore(this._dungeonStateStore);
    await this._dungeonUiStore.initializeStore(this._dungeonStateStore);
    await this._dungeonActivityLogStore.initializeStore(this._dungeonStateStore.currentState);
    
    const ids = Object.values(this._dungeonStateStore.currentState.board.objects).map(o => o.id);

    return {
      dungeonDataFeed: await this._dataFeed.getDungeon(this._dungeonStateStore.currentState.dungeonId),
      actors: Object.fromEntries((await this._dataFeed.getActors(ids)).map(a => [a.id, a]))
    }
  }
 }
