import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DungeonStateStore } from 'src/app/core/dungeon/stores/dungeon-state.store';
import { SceneService } from 'src/app/core/scene/services/scene.service';
import { StoreService } from 'src/app/infrastructure/data-storage/api';
import { ComputerTurnService } from '../../services/computer-player.service';
import { IEntity } from '@game-logic/lib/base/entity/entity.interface';
import { ISceneMedium } from 'src/app/core/scene/mixins/scene-medium/scene-medium.interface';
import { IAuxiliaryView } from 'src/app/core/game-ui/interfaces/auxiliary-view.interface';
import { Observable, distinctUntilChanged, filter, map } from 'rxjs';
import { IMenuItem } from 'src/app/aspects/navigation/interfaces/navigation.interface';
import { GameUiStore } from 'src/app/core/game-ui/stores/game-ui.store';
import { GameMenuViewComponent } from 'src/app/core/game/components/game-menu-view/game-menu-view.component';
import { HeroViewComponent } from 'src/app/core/game/components/hero-view/hero-view.component';
import { AuxiliaryViewService } from 'src/app/core/game-ui/services/auxiliary-view.service';
import { UiService } from 'src/app/core/game-ui/services/ui.service';
import { CommandsService } from 'src/app/core/game/services/commands.service';
import { SceneAssetsLoaderService } from 'src/app/core/scene/services/scene-assets-loader.service';
import { AdventureSuggestionService } from 'src/app/core/adventure/services/adventure-suggestion.service';
import { SuggestionService } from 'src/app/core/game/services/suggestion.service';
import { PlayerType } from '@game-logic/lib/base/player/players.constants';
import { IAbility } from '@game-logic/lib/modules/abilities/entities/ability/ability.interface';
import { DungeonArtificialIntelligenceService } from '../../../game-ai/services/dungeon-artificial-intelligence.service';
import { HumanPlayerService } from '../../services/human-player.service';
import { IDeck } from '@game-logic/lib/modules/cards/entities/deck/deck.interface';
import { DungeonGameplay } from '../../gameplay/dungeon.gameplay';
import { IHero } from '@game-logic/gameplay/modules/heroes/mixins/hero/hero.interface';
import { IStatistic } from '@game-logic/lib/modules/statistics/entities/statistic/statistic.interface';
import { IActivityResource } from '@game-logic/lib/base/activity/activity.interface';
import { SceneInteractionService } from 'src/app/core/scene/api';

@Component({
  templateUrl: './dungeon-view.component.html',
  styleUrls: ['./dungeon-view.component.scss'],
  providers: [
    SceneAssetsLoaderService,
    SceneInteractionService,
    CommandsService,
    UiService,
    { provide: SuggestionService, useClass: AdventureSuggestionService },
    AdventureSuggestionService,
    AuxiliaryViewService,
    ComputerTurnService,
    DungeonArtificialIntelligenceService,
    HumanPlayerService
  ]
})
export class DungeonViewComponent implements OnInit, AfterViewInit, OnDestroy {

  public menu$: Observable<IMenuItem[]>;
  public selectedPawn: IHero;
  public deck: IDeck
  public abilities: IAbility[];
  public auxCommands: any[];
  public allowInteractions: boolean = false;
  public activityResources: Array<IStatistic & IActivityResource>;
  public turn: number;
  public gameplay: DungeonGameplay;

  constructor(
    public readonly sceneService: SceneService,
    public readonly stateStore: DungeonStateStore,
    private readonly _storeService: StoreService,
    private readonly _computerTurnService: ComputerTurnService,
    private readonly _gameUiStore: GameUiStore,
    private readonly _auxiliaryViewService: AuxiliaryViewService,
    private readonly _commandsService: CommandsService
  ) { }

  ngOnInit(): void {
    console.log(this.stateStore.currentState);
    this.makeUiAdjustments();
    this._manageComputerTurn();
    this._manageHumanTurn();
    this.stateStore.currentState.startGame(this.stateStore.currentState.players);
  }

  ngAfterViewInit(): void {
    //const { scene, entities } = this.stateStore.currentState;
    //this.sceneService.initializeScene(scene.composerDeclarations, entities.filter(e => e.isSceneMedium) as Array<IEntity & ISceneMedium>);
  }

  ngOnDestroy(): void {
    this._storeService.closeStore(this.stateStore);
  }

  public selectTopBarItem(v: IAuxiliaryView): void {
    if (v.component === HeroViewComponent) {
      this._auxiliaryViewService.openAuxiliaryView(v,{ hero: this.selectedPawn });
    }

    if (v.component === GameMenuViewComponent) {
      this._auxiliaryViewService.openAuxiliaryView(v);
    }
  }

  public handleEntityClick(e: any) {

  }

  public makeUiAdjustments() {
    this.menu$ = this._gameUiStore.state$.pipe(map(s => s.auxiliaryViews));
  }

  public nextTurn() {
    this.stateStore.currentState.nextTurn();
    this.stateStore.setState(this.stateStore.currentState);
  }

  private _manageComputerTurn() {
    this.stateStore.state$
      .pipe(
        distinctUntilChanged((p, c) => p.turn !== c.turn),
        filter(() => this._computerTurnService.isComputerTurn(this.stateStore))
      )
      .subscribe(async () => {
        await this._computerTurnService.handleTurn(this.stateStore);
        this.nextTurn();
      })
  }

  private _manageHumanTurn() {
    this.stateStore.state$
      .subscribe(s => {
        this._updateViewData(s);
        if (s.currentPlayer.playerType === PlayerType.Human) {
          this.allowInteractions = !this._commandsService.currentProcess
        } else {
          this.allowInteractions = false;
        }
    })
  }

  private _updateViewData(gameplay: DungeonGameplay) {
    this.selectedPawn = gameplay.getSelectedPawn(gameplay.humanPlayer);
    this.activityResources = Object.values(this.selectedPawn.statistic).filter(s => s.isActivityResource);
    this.deck = this.selectedPawn.deck;
    this.gameplay = gameplay;
    this.abilities = this.selectedPawn.abilities;
    this.auxCommands = this._createAuxCommands();
  }

  private _createAuxCommands(): any[] {
    return [];
  }

}