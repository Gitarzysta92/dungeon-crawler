import { Component, OnInit } from '@angular/core';
import { AdventureStateStore } from '../../stores/adventure-state.store';
import { DataFeedService } from 'src/app/core/data/services/data-feed.service';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/infrastructure/data-storage/api';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { StoreName } from 'src/app/core/dungeon/stores/dungeon-state.store-keys';

@Component({
  selector: 'app-dungeon-area-view',
  templateUrl: './dungeon-area-view.component.html',
  styleUrls: ['./dungeon-area-view.component.scss']
})
export class DungeonAreaViewComponent implements OnInit {

  public stateLoaded: boolean = false;

  constructor(
    private readonly _adventureStateStore: AdventureStateStore,
    private readonly _dataFeed: DataFeedService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _localStorageService: LocalStorageService,
    private readonly _routingService: RoutingService
  ) { }

  async ngOnInit(): Promise<void> {
    //await this._adventureStateStore.initializeStore(this._dataFeed);
    this.stateLoaded = true;
  }

  public async enterDungeon(): Promise<void> {
    // await this._adventureStateStore.dispatchActivity(enterDungeon({ dungeonId: this._activatedRoute.snapshot.params['id'] }));
    // const dungeonState = await StateFactory.createDungeonState(
    //   this._adventureStateStore.currentState, this._dataFeed, this._adventureStateStore.currentState.dungeonInstance);
    // await this._localStorageService.createOrUpdate(StoreName.dungeonStateStore.description, dungeonState);
    // this._routingService.navigateToDungeonInstance(this._adventureStateStore.currentState.dungeonInstance.dungeonId)
  }

}
