import { Component, OnInit, ViewChild } from '@angular/core';
import { combineLatest, connectable, fromEvent, merge, Observable, Subject, tap } from 'rxjs';
import { DungeonStateStore } from 'src/app/core/dungeon-logic/stores/dungeon-state.store';
import { SceneComponent } from 'src/app/core/dungeon-scene/api';
import { SceneService } from 'src/app/core/dungeon-scene/services/scene.service';
import { BoardBuilderService } from 'src/app/core/dungeon-scene/services/board-builder/board-builder.service';
import { UiInteractionService } from 'src/app/core/dungeon-ui/services/ui-interaction/ui-interaction.service';
import { PlayerTurnControllerService } from '../../services/player-turn-controller/player-turn-controller.service';
import { DungeonTurnControllerService } from '../../services/dungeon-turn-controller/dungeon-turn-controller.service';
import { ActivatedRoute } from '@angular/router';
import { EffectPayloadProviderService } from '../../services/effect-payload-provider/effect-payload-provider.service';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { DungeonArtificialIntelligenceService } from 'src/app/core/dungeon-logic/services/dungeon-artificial-intelligence/dungeon-artificial-intelligence.service';
import { DungeonSceneStore } from 'src/app/core/dungeon-scene/stores/dungeon-scene.store';
import { DungeonUiStore } from 'src/app/core/dungeon-ui/stores/dungeon-ui.store';
import { DungeonInteractionStore } from '../../stores/dungeon-interaction.store';


@Component({
  templateUrl: './dungeon-view.component.html',
  styleUrls: ['./dungeon-view.component.scss'],
  providers: [
    UiInteractionService,
    PlayerTurnControllerService,
    DungeonTurnControllerService,
    BoardBuilderService,
    EffectPayloadProviderService,
    DungeonArtificialIntelligenceService
  ]
})
export class DungeonViewComponent implements OnInit {
  @ViewChild(SceneComponent, { static: true }) canvas: SceneComponent | undefined;

  constructor(
    private readonly _sceneInitializationService: SceneService,
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _interactionStateStore: DungeonInteractionStore,
    private readonly _sceneStateStore: DungeonSceneStore,
    private readonly _uiStateStore: DungeonUiStore,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _playerTurnControllerService: PlayerTurnControllerService,
    private readonly _dungeonTurnControllerService: DungeonTurnControllerService,
    private readonly _routingService: RoutingService,
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

    combineLatest([
      //this._interactionStateStore.state$,
      //this._sceneStateStore.state$,
      //this._uiStateStore.state$,
      //this._dungeonStateStore.state$
    ]).subscribe(x => console.log(x));

    this._initializeGameLoop();
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