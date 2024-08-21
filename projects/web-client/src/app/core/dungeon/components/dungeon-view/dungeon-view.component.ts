import { Component, OnDestroy, OnInit } from '@angular/core';
import { DungeonStateStore } from 'src/app/core/dungeon/stores/dungeon-state.store';
import { SceneService } from 'src/app/core/scene/services/scene.service';
import { StoreService } from 'src/app/infrastructure/data-storage/api';
import { ComputerPlayerService } from '../../services/computer-player.service';
import { IAuxiliaryView } from 'src/app/core/game-ui/interfaces/auxiliary-view.interface';
import { Observable, firstValueFrom, map, merge, of } from 'rxjs';
import { IMenuItem } from 'src/app/aspects/navigation/interfaces/navigation.interface';
import { GameUiStore } from 'src/app/core/game-ui/stores/game-ui.store';
import { GameMenuViewComponent } from 'src/app/core/game/components/game-menu-view/game-menu-view.component';
import { HeroViewComponent } from 'src/app/core/game/components/hero-view/hero-view.component';
import { AuxiliaryViewService } from 'src/app/core/game-ui/services/auxiliary-view.service';
import { UiInteractionService } from 'src/app/core/game-ui/services/ui-interaction.service';
import { CommandService } from 'src/app/core/game/services/command.service';
import { SceneAssetsLoaderService } from 'src/app/core/scene/services/scene-assets-loader.service';
import { AdventureSuggestionService } from 'src/app/core/adventure/services/adventure-suggestion.service';
import { SuggestionService } from 'src/app/core/game/services/suggestion.service';
import { PlayerType } from '@game-logic/lib/base/player/players.constants';
import { DungeonArtificialIntelligenceService } from '../../../game-ai/services/dungeon-artificial-intelligence.service';
import { HumanPlayerService } from '../../services/human-player.service';
import { IDeck } from '@game-logic/lib/modules/cards/entities/deck/deck.interface';
import { DungeonGameplay } from '../../gameplay/dungeon.gameplay';
import { IHero } from '@game-logic/gameplay/modules/heroes/mixins/hero/hero.interface';
import { IStatistic } from '@game-logic/lib/modules/statistics/entities/statistic/statistic.interface';
import { IActivityResource } from '@game-logic/lib/base/activity/activity.interface';
import { SceneInteractionService } from 'src/app/core/scene/api';
import { StoreName } from '../../stores/dungeon-state.store-keys';
import { ITurnGameplayPlayer } from '@game-logic/lib/modules/turn-based-gameplay/mixins/turn-based-player/turn-based-player.interface';
import { DragService } from 'src/app/core/game-ui/services/drag.service';
import { CDK_DRAG_CONFIG } from '@angular/cdk/drag-drop';
import { INarrativeMedium } from 'src/app/core/game-ui/mixins/narrative-medium/narrative-medium.interface';
import { ICommand } from 'src/app/core/game/interfaces/command.interface';
import { InteractionProcess, InteractionService } from 'src/app/core/game/services/interaction.service';
import { MappingService } from 'src/app/core/game/services/mapping.service';
import { ModalService } from 'src/app/core/game-ui/services/modal.service';
import { TurnIntermissionComponent } from '../turn-intermission/turn-intermission.component';
import { IGameplayEntity } from 'src/app/core/game/interfaces/game.interface';
import { IActor } from '@3d-scene/lib/actors/actor.interface';
import { IDungeonGameplayEntity } from '@game-logic/gameplay/modules/dungeon/dungeon.interface';


const DragConfig = {
  dragStartThreshold: 0,
  pointerDirectionChangeThreshold: 5,
  zIndex: 10000
};

@Component({
  templateUrl: './dungeon-view.component.html',
  styleUrls: ['./dungeon-view.component.scss'],
  providers: [
    SceneAssetsLoaderService,
    SceneInteractionService,
    CommandService,
    UiInteractionService,
    { provide: SuggestionService, useClass: AdventureSuggestionService },
    AdventureSuggestionService,
    AuxiliaryViewService,
    ComputerPlayerService,
    DungeonArtificialIntelligenceService,
    HumanPlayerService,
    DragService,
    { provide: CDK_DRAG_CONFIG, useValue: DragConfig },
    InteractionService,
    MappingService
  ]
})
export class DungeonViewComponent implements OnInit, OnDestroy {

  public menu$: Observable<IMenuItem[]>;
  public selectedPawn: IHero;
  public player: ITurnGameplayPlayer;
  public deck: IDeck
  public abilities$: Observable<Array<ICommand & { subject: INarrativeMedium }>>;
  public allowInteractions: boolean = false;
  public activityResources: Array<IStatistic & IActivityResource>;
  public turn: number;
  public gameplay: DungeonGameplay;
  public actors$: Observable<Array<IGameplayEntity & IDungeonGameplayEntity>>;
  public hero: IHero;

  constructor(
    public readonly sceneService: SceneService,
    public readonly stateStore: DungeonStateStore,
    private readonly _storeService: StoreService,
    private readonly _computerTurnService: ComputerPlayerService,
    private readonly _gameUiStore: GameUiStore,
    private readonly _auxiliaryViewService: AuxiliaryViewService,
    private readonly _commandsService: CommandService,
    private readonly _humanPlayerService: HumanPlayerService,
    private readonly _modalService: ModalService,
    private readonly _interactionService: InteractionService
  ) { }

  ngOnInit(): void {
    console.log(this.stateStore.currentState);
    this.menu$ = this._gameUiStore.state$.pipe(map(s => s.auxiliaryViews));
    this.actors$ = this.stateStore.state$.pipe(map(s => s.entities.filter((e: any) => e.isActor && !e.isBoardField)));
    this.stateStore.state$.subscribe(s => this._updateViewData(s));
    this.stateStore.currentState.listenForCurrentPlayer()
      .subscribe(async p => {
        await firstValueFrom(this._modalService.createLastingPanel(TurnIntermissionComponent, 3000, { player: p }));
        if (p.playerType === PlayerType.Computer) {
         await this._computerTurnService.makeTurn(p, this.stateStore);
        }
      });
    
    merge(this._commandsService.process$, this._interactionService.process$)
      .subscribe(p => {
        this.allowInteractions = this.stateStore.currentState.currentPlayer.playerType === PlayerType.Human &&
          (p instanceof InteractionProcess || !p)
      })
  }

  ngOnDestroy(): void {
    this.stateStore.dispose();
    this.sceneService.dispose();
    this._storeService.closeStore(StoreName.dungeonStateStore);
  }

  public selectTopBarItem(v: IAuxiliaryView): void {
    if (v.component === HeroViewComponent) {
      this._auxiliaryViewService.openAuxiliaryView(v,{ hero: this.selectedPawn });
    }
    if (v.component === GameMenuViewComponent) {
      this._auxiliaryViewService.openAuxiliaryView(v);
    }
  }

  public handleSelectedCommands(cs: ICommand[]) {
    if (cs.length <= 0 || cs.some(c => this._commandsService?.currentProcess?.isProcessing(c))) {
      this._commandsService?.currentProcess?.cancel()
    } else if(!this._commandsService.currentProcess) {
      this._commandsService.executeCommand(cs, this.stateStore, this._humanPlayerService);
    }
  }

  private _updateViewData(gameplay: DungeonGameplay) {
    this.selectedPawn = gameplay.getSelectedPawn(gameplay.humanPlayer);
    this.player = gameplay.humanPlayer;
    this.deck = this.selectedPawn.deck;
    this.hero = this.selectedPawn;
    this.gameplay = gameplay;
    this.abilities$ = of(this.selectedPawn.abilities.flatMap(a => a.activities) as Array<ICommand & { subject: INarrativeMedium }>);
  }

}