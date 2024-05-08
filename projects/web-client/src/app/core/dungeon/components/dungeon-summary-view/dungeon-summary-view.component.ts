import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { AdventureStateStore } from 'src/app/core/adventure/stores/adventure-state.store';
import { DataFeedService } from 'src/app/core/game-data/services/data-feed.service';
import { StoreName } from 'src/app/core/dungeon/stores/dungeon-state.store-keys';
import { LocalStorageService } from 'src/app/infrastructure/data-storage/api';

@Component({
  selector: 'dungeon-summary-view',
  templateUrl: './dungeon-summary-view.component.html',
  styleUrls: ['./dungeon-summary-view.component.scss']
})
export class DungeonSummaryViewComponent implements OnInit {

  public isDefeated: boolean;



  constructor(
    private readonly _localStorageService: LocalStorageService,
    private readonly _routingService: RoutingService,
    private readonly _adventureStateStore: AdventureStateStore,
    private readonly _dataFeed: DataFeedService
  ) { }

  async ngOnInit(): Promise<void> {
    //await this._adventureStateStore.initializeStore(this._dataFeed);
    if (!this._adventureStateStore.currentState) {
      this._routingService.navigateToMainMenu();
    }

    // const rawState = await this._localStorageService.read<DungeonState>(StoreName.dungeonStateStore.description);
    // if (!rawState) {
    //   this._routingService.navigateToArea(AreaType.Dungeon, this._adventureStateStore.currentState.hero.occupiedAreaId);
    // }

    // this._state = new DungeonState(rawState);
    // this.isDefeated = this._state.hero.isDefeated();
  }

  public navigateToArea() {
    // this._localStorageService.clear(StoreName.dungeonStateStore.description);
    // this._routingService.navigateToArea(AreaType.Dungeon, this._adventureStateStore.currentState.hero.occupiedAreaId);
    
  }

}
