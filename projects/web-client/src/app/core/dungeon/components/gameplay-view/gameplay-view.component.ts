import { Component, OnInit, ViewChild } from '@angular/core';
import { combineLatest, Connectable, connectable, fromEvent, map, merge, Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { DungeonStateStore } from 'src/app/core/dungeon-logic/stores/dungeon-state.store';
import { SceneComponent, SceneInteractionService } from 'src/app/core/dungeon-scene/api';
import { SceneInitializationService } from 'src/app/core/dungeon-scene/services/scene-initialization/scene-initialization.service';
import { createAdventureState } from '@game-logic/tests/test-helpers';
import { dataFeed } from '@game-logic/data/feed.data';
import { dungeon } from '@game-logic/data/dungeon.data';
import { mapStatesToViewState } from '../../mappings/dungeon-mappings';
import { actors } from 'src/app/core/adventure/constants/data';
import { IViewState } from '../../interfaces/view-state.interface';
import { BoardBuilderService } from 'src/app/core/dungeon-scene/services/board-builder/board-builder.service';
import { DungeonSceneStore } from 'src/app/core/dungeon-scene/stores/dungeon-scene.store';
import { DungeonUiStore } from 'src/app/core/dungeon-ui/stores/dungeon-ui.store';
import { mapLogicFieldToSceneField, mapLogicObjectToSceneObject } from 'src/app/core/dungeon-scene/mappings/dungeon-scene-mappings';
import { UiInteractionService } from 'src/app/core/dungeon-ui/services/ui-interaction/ui-interaction.service';
import { DungeonActivityLogStore } from 'src/app/core/dungeon-ui/stores/dungeon-activity-log.store';
import { InteractionControllerService } from '../../services/interaction-controller/interaction-controller.service';
import { DungeonInteractionStore } from '../../stores/dungeon-interaction.store';
import { IEffect } from '@game-logic/lib/features/effects/effect-commons.interface';


@Component({
  templateUrl: './gameplay-view.component.html',
  styleUrls: ['./gameplay-view.component.scss'],
  providers: [
    SceneInteractionService,
    DungeonSceneStore,
    DungeonUiStore,
    DungeonActivityLogStore,
    SceneInitializationService,
    DungeonInteractionStore,
    SceneInteractionService,
    UiInteractionService,
    InteractionControllerService,
    BoardBuilderService
  ]
})
export class GameplayViewComponent implements OnInit {

  @ViewChild(SceneComponent, { static: true }) canvas: SceneComponent | undefined;

  public viewState$: Observable<IViewState>;
  public viewState: IViewState;
  public isLoading: boolean = true;

  private _mouseEvents: Connectable<PointerEvent>;


  constructor(
    public readonly dungeonActivityLogStore: DungeonActivityLogStore,
    private readonly _sceneInitializationService: SceneInitializationService,
    private readonly _interactionControllerService: InteractionControllerService,
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _dungeonSceneStore: DungeonSceneStore,
    private readonly _dungeonUiStore: DungeonUiStore,
    private readonly _dungeonInteractionStore: DungeonInteractionStore
  ) { }

  ngOnInit(): void {
    const adventureState = createAdventureState();
    this._dungeonStateStore.registerStore(adventureState, dataFeed, dungeon);
    this._dungeonSceneStore.registerStore(this._dungeonStateStore.currentState);
    this._dungeonUiStore.registerStore(this._dungeonStateStore.currentState);
    this._dungeonInteractionStore.registerStore(this._dungeonStateStore.currentState);
    this.dungeonActivityLogStore.registerStore(this._dungeonStateStore.currentState);

    const { currentState } = this._dungeonStateStore;
    this._mouseEvents = this._listenForMouseEvents();

    this._sceneInitializationService.createScene(
      this.canvas.canvas.nativeElement,
      this._mouseEvents,
      Object.values(currentState.board.objects).map(o => mapLogicObjectToSceneObject(Object.assign({ ...actors[o.id]}, o))),
      Object.values(currentState.board.fields).map(f => mapLogicFieldToSceneField(f)),
    );

    this.viewState = mapStatesToViewState(
      this._dungeonStateStore.currentState,
      this._dungeonSceneStore.currentState,
      this._dungeonUiStore.currentState,
      this._dungeonInteractionStore.currentState
    );

    this._listenForStateChanges();
  }

  public async castEffect(effect: IEffect): Promise<void> {
    await this._interactionControllerService.castEffect(effect);
  }

  private _listenForStateChanges(): void {
    this.viewState$ = combineLatest([
      this._dungeonStateStore.state,
      this._dungeonSceneStore.state,
      this._dungeonUiStore.state,
      this._dungeonInteractionStore.state
    ])
      .pipe(
        map(states => mapStatesToViewState(...states)),
        tap(states => console.log(states)),
      )
      
    this.viewState$.subscribe(state => this.viewState = state);
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