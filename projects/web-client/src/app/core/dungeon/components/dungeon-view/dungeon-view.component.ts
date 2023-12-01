import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { combineLatest, connectable, fromEvent, merge, Observable, Subject, tap } from 'rxjs';
import { DungeonStateStore } from 'src/app/core/dungeon-logic/stores/dungeon-state.store';
import { SceneComponent } from 'src/app/core/dungeon-scene/api';
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

@Component({
  templateUrl: './dungeon-view.component.html',
  styleUrls: ['./dungeon-view.component.scss'],
})
export class DungeonViewComponent implements OnInit, OnDestroy {
  @ViewChild(SceneComponent, { static: true }) canvas: SceneComponent | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _routingService: RoutingService,
    private readonly _sceneInitializationService: SceneService,
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
    const { dungeonDataFeed, actors } = this._activatedRoute.snapshot.data.dungeonData;
    this._sceneInitializationService.createScene(
      this.canvas.canvas.nativeElement,
      this._listenForMouseEvents(),
      Object.assign(dungeonDataFeed, this._dungeonStateStore.currentState),
      actors
    );

    this._sceneStateStore.initializeSynchronization(this._dungeonStateStore, this._interactionStateStore);
    this._uiStateStore.initializeSynchronization(this._dungeonStateStore, this._interactionStateStore);
    this._logStateStore.initializeSynchronization(this._dungeonStateStore);

    combineLatest([
      //this._interactionStateStore.state$,
      //this._sceneStateStore.state$,
      //this._uiStateStore.state$,
      //this._dungeonStateStore.state$
    ]).subscribe(x => console.log(x));

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

  private _listenForMouseEvents(): Observable<PointerEvent> {
    const events = merge(
      fromEvent<PointerEvent>(this.canvas.canvas.nativeElement, 'mousemove'),
      fromEvent<PointerEvent>(this.canvas.canvas.nativeElement, 'click')
    );
    const inputs = { pointerEvent$: connectable(events, { connector: () => new Subject() })}
    inputs.pointerEvent$.connect();
    return inputs.pointerEvent$.pipe(tap(e => e.stopPropagation()))
  }
}