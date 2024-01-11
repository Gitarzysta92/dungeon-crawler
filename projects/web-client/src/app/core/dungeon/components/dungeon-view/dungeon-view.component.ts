import { Component, OnDestroy, OnInit } from '@angular/core';
import { DungeonStateStore } from 'src/app/core/dungeon-logic/stores/dungeon-state.store';
import { SceneService } from 'src/app/core/dungeon-scene/services/scene.service';
import { PlayerTurnControllerService } from '../../services/player-turn-controller/player-turn-controller.service';
import { DungeonTurnControllerService } from '../../services/dungeon-turn-controller/dungeon-turn-controller.service';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { DungeonSceneStore } from 'src/app/core/dungeon-scene/stores/dungeon-scene.store';
import { DungeonUiStore } from 'src/app/core/dungeon-ui/stores/dungeon-ui.store';
import { DungeonInteractionStore } from '../../stores/dungeon-interaction.store';
import { DungeonActivityLogStore } from 'src/app/core/dungeon-ui/stores/dungeon-activity-log.store';
import { StoreService } from 'src/app/infrastructure/data-store/api';
import { IDungeonDataFeedEntity } from 'src/app/core/data-feed/interfaces/data-feed-dungeon-entity.interface';


@Component({
  templateUrl: './dungeon-view.component.html',
  styleUrls: ['./dungeon-view.component.scss'],
})
export class DungeonViewComponent implements OnInit, OnDestroy {

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _routingService: RoutingService,
    private readonly _sceneService: SceneService,
    private readonly _playerTurnControllerService: PlayerTurnControllerService,
    private readonly _dungeonTurnControllerService: DungeonTurnControllerService,
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _interactionStateStore: DungeonInteractionStore,
    private readonly _sceneStateStore: DungeonSceneStore,
    private readonly _uiStateStore: DungeonUiStore,
    private readonly _logStateStore: DungeonActivityLogStore,
    private readonly _storeService: StoreService
  ) { }

  ngOnInit(): void {
    this._sceneStateStore.initializeSynchronization(this._dungeonStateStore, this._interactionStateStore);
    this._uiStateStore.initializeSynchronization(this._dungeonStateStore, this._interactionStateStore);
    this._logStateStore.initializeSynchronization(this._dungeonStateStore);
  }

  ngAfterViewInit(): void {
    const { visualScene } = this._activatedRoute.snapshot.data.dungeonData.dungeonDataFeed as IDungeonDataFeedEntity;
    this._sceneService.initializeScene({ bgColor: visualScene.bgColor, composerDefinitions: visualScene.composerDefinitions });
    this._initializeGameLoop();
  }

  ngOnDestroy(): void {
    this._logStateStore.stopSynchronization();
    this._uiStateStore.stopSynchronization();
    this._sceneStateStore.stopSynchronization();

    this._storeService.closeStores([
      this._dungeonStateStore.transactionStore,
      this._dungeonStateStore.store,
      this._uiStateStore.store,
      this._sceneStateStore.store,
      this._interactionStateStore.store,
      this._logStateStore.store
    ], true)
  }

  private async _initializeGameLoop(): Promise<void> {
    while (!this._dungeonStateStore.currentState.isDungeonFinished) {
      if (this._dungeonStateStore.currentState.isPlayerTurn()) {
        await this._playerTurnControllerService.handlePlayerTurn();
      }

      if (this._dungeonStateStore.currentState.isDungeonFinished) {
        break;
      }
      await this._dungeonTurnControllerService.makeDungeonTurn();
    }
    this._routingService.nagivateToDungeonSummary(this._dungeonStateStore.currentState.dungeonId);
  }

}