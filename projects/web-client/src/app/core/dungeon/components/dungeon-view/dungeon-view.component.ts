import { Component, OnInit, ViewChild } from '@angular/core';
import { combineLatest, concat, Connectable, connectable, from, fromEvent,  merge, Observable, startWith, Subject, switchMap, tap } from 'rxjs';
import { DungeonStateStore } from 'src/app/core/dungeon-logic/stores/dungeon-state.store';
import { SceneComponent, SceneInteractionService } from 'src/app/core/dungeon-scene/api';
import { SceneInitializationService } from 'src/app/core/dungeon-scene/services/scene-initialization/scene-initialization.service';
import { IDungeonViewModel } from '../../interfaces/view-model.interface';
import { BoardBuilderService } from 'src/app/core/dungeon-scene/services/board-builder/board-builder.service';
import { DungeonSceneStore } from 'src/app/core/dungeon-scene/stores/dungeon-scene.store';
import { DungeonUiStore } from 'src/app/core/dungeon-ui/stores/dungeon-ui.store';
import { UiInteractionService } from 'src/app/core/dungeon-ui/services/ui-interaction/ui-interaction.service';
import { DungeonActivityLogStore } from 'src/app/core/dungeon-ui/stores/dungeon-activity-log.store';
import { PlayerTurnControllerService } from '../../services/player-turn-controller/interaction-controller.service';
import { DungeonInteractionStore } from '../../stores/dungeon-interaction.store';
import { DungeonTurnControllerService } from '../../services/dungeon-turn-controller/dungeon-turn-controller.service';
import { DungeonCardResolverService } from 'src/app/core/dungeon-logic/services/dungeon-card-resolver/dungeon-card-resolver.service';
import { ActivatedRoute } from '@angular/router';
import { DungeonViewModelService } from '../../services/dungeon-view-model/dungeon-view-model.service';
import { EffectControllerService } from '../../services/effect-controller/effect-controller.service';
import { RoutingService } from 'src/app/aspects/navigation/api';


@Component({
  templateUrl: './dungeon-view.component.html',
  styleUrls: ['./dungeon-view.component.scss'],
  providers: [
    SceneInteractionService,
    SceneInitializationService,
    SceneInteractionService,
    UiInteractionService,
    PlayerTurnControllerService,
    DungeonTurnControllerService,
    DungeonCardResolverService,
    BoardBuilderService,
    DungeonViewModelService,
    EffectControllerService
  ]
})
export class DungeonViewComponent implements OnInit {
  @ViewChild(SceneComponent, { static: true }) canvas: SceneComponent | undefined;

  public viewState$: Observable<IDungeonViewModel>;
  public viewState: IDungeonViewModel;
  
  constructor(
    public readonly dungeonActivityLogStore: DungeonActivityLogStore,
    private readonly _sceneInitializationService: SceneInitializationService,
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _dungeonSceneStore: DungeonSceneStore,
    private readonly _dungeonUiStore: DungeonUiStore,
    private readonly _dungeonInteractionStore: DungeonInteractionStore,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _dungeonViewModelService: DungeonViewModelService,
    private readonly _playerTurnControllerService: PlayerTurnControllerService,
    private readonly _dungeonTurnControllerService: DungeonTurnControllerService,
    private readonly _routingService: RoutingService
  ) { }

  async ngOnInit(): Promise<void> {
    this.viewState$ = this._listenForStateChanges();
    this.viewState$.subscribe(s => this.viewState = s);

    const { dungeonDataFeed, actors } = this._activatedRoute.snapshot.data.dungeonData;
    this._sceneInitializationService.createScene(
      this.canvas.canvas.nativeElement,
      this._listenForMouseEvents(),
      Object.assign(dungeonDataFeed, this._dungeonStateStore.currentState),
      actors
    );

    this._initializeGameLoop();
  }

  private async _initializeGameLoop(): Promise<void> {
    while (!this._dungeonStateStore.currentState.isDungeonFinished) {
      await this._playerTurnControllerService.handlePlayerTurn();
      await this._dungeonTurnControllerService.makeDungeonTurn();
    }

    this._routingService.nagivateToDungeonSummary(this._dungeonStateStore.currentState.dungeonId);
  }
    
  private _listenForStateChanges(): Observable<IDungeonViewModel> {
    return concat(
      from(this._dungeonViewModelService.mapStatesToViewModel(
        this._dungeonStateStore.currentState,
        this._dungeonSceneStore.currentState,
        this._dungeonUiStore.currentState,
        this._dungeonInteractionStore.currentState 
      )),
      combineLatest([
        this._dungeonStateStore.state,
        this._dungeonSceneStore.state,
        this._dungeonUiStore.state,
        this._dungeonInteractionStore.state 
      ])
        .pipe(switchMap(states => from(this._dungeonViewModelService.mapStatesToViewModel(...states))))
    )
      .pipe(
        startWith(this._dungeonViewModelService.getInitialViewModel()),
        tap(states => console.log(states))
      ) as Observable<IDungeonViewModel>
  } 

  private _listenForMouseEvents(): Connectable<PointerEvent> {
    const events = merge(
      fromEvent<PointerEvent>(this.canvas.canvas.nativeElement, 'mousemove'),
      fromEvent<PointerEvent>(this.canvas.canvas.nativeElement, 'click')
    );
    const inputs = { pointerEvent$: connectable(events, { connector: () => new Subject() })}
    inputs.pointerEvent$.connect();
    return inputs.pointerEvent$
  }
}