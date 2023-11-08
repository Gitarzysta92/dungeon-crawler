import { Component, OnInit } from '@angular/core';
import { AdventureStateStore } from '../../stores/adventure-state.store';
import { StateFactory } from '@game-logic/lib/game/state.factory';
import { DataFeedService } from 'src/app/core/data-feed/services/data-feed.service';
import { enterDungeon } from "@game-logic/lib/activities/player-activities/enter-dungeon.directive";
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/infrastructure/data-store/api';
import { dungeonStateStore } from 'src/app/core/dungeon-logic/stores/dungeon-state.store';
import { RoutingService } from 'src/app/aspects/navigation/api';

@Component({
  selector: 'app-dungeon-area-view',
  templateUrl: './dungeon-area-view.component.html',
  styleUrls: ['./dungeon-area-view.component.scss']
})
export class DungeonAreaViewComponent implements OnInit {

  constructor(
    private readonly _adventureStateStore: AdventureStateStore,
    private readonly _dataFeed: DataFeedService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _localStorageService: LocalStorageService,
    private readonly _routingService: RoutingService
  ) { }

  ngOnInit(): void {
    this._adventureStateStore.registerStore(this._dataFeed);
  }

  public async enterDungeon(): Promise<void> {
    await this._adventureStateStore.dispatchActivity(enterDungeon({ dungeonId: this._activatedRoute.snapshot.params['id'] }));
    const dungeonState = await StateFactory.createDungeonState(
      this._adventureStateStore.currentState, this._dataFeed, this._adventureStateStore.currentState.dungeonInstance);
    await this._localStorageService.createOrUpdate(dungeonStateStore.description, dungeonState);
    this._routingService.navigateToDungeonInstance(this._adventureStateStore.currentState.dungeonInstance.id)
  }

}
