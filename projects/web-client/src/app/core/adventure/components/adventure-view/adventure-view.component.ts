import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { AdventureStateStore } from '../../stores/adventure-state.store';
import { CommandService } from 'src/app/core/game/services/command.service';
import { UiInteractionService } from 'src/app/core/game-ui/services/ui-interaction.service';
import { AdventureSuggestionService } from '../../services/adventure-suggestion.service';
import { SuggestionService } from 'src/app/core/game/services/suggestion.service';
import { IEntity } from '@game-logic/lib/base/entity/entity.interface';
import { IBoardArea } from '@game-logic/gameplay/modules/board-areas/entities/board-area/board-area.interface';
import { AreaViewComponent } from '../area-view/area-view.component';
import { GameUiStore } from 'src/app/core/game-ui/stores/game-ui.store';
import { AuxiliaryViewService } from 'src/app/core/game-ui/services/auxiliary-view.service';
import { Observable, Subject, filter, map, takeUntil } from 'rxjs';
import { IMenuItem } from 'src/app/aspects/navigation/interfaces/navigation.interface';
import { HeroViewComponent } from 'src/app/core/game/components/hero-view/hero-view.component';
import { GameMenuViewComponent } from 'src/app/core/game/components/game-menu-view/game-menu-view.component';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { IAuxiliaryView } from 'src/app/core/game-ui/interfaces/auxiliary-view.interface';
import { IDungeonArea } from '@game-logic/gameplay/modules/dungeon/mixins/dungeon-area/dungeon-area.interface';
import { DungeonViewComponent } from '../dungeon-view/dungeon-view.component';
import { ICommand } from 'src/app/core/game/interfaces/command.interface';
import { ENTER_DUNGEON_ACTIVITY } from '@game-logic/gameplay/modules/dungeon/dungeon.constants';
import { TRADE_ACTIVITY } from '@game-logic/lib/modules/vendors/vendors.constants';
import { IBoardObject } from '@game-logic/lib/modules/board/entities/board-object/board-object.interface';
import { HumanPlayerService } from '../../services/human-player.service';
import { InteractionService } from 'src/app/core/game/services/interaction.service';
import { MappingService } from 'src/app/core/game/services/mapping.service';
import { RewarderFactory } from '@game-logic/lib/modules/rewards/entities/rewarder/rewarder.factory';
import { RewardViewComponent } from 'src/app/core/game/components/reward-view/reward-view.component';


@Component({
  selector: 'adventure-view',
  templateUrl: './adventure-view.component.html',
  styleUrls: ['./adventure-view.component.scss'],
  providers: [
    CommandService,
    UiInteractionService,
    { provide: SuggestionService, useClass: AdventureSuggestionService },
    AdventureSuggestionService,
    AuxiliaryViewService,
    HumanPlayerService,
    InteractionService,
    MappingService
  ]
})
export class AdventureViewComponent implements OnInit, OnDestroy {

  public availableCommands$: Observable<ICommand[]>;
  public areas$: Observable<IBoardArea[]>;
  public menu$: Observable<(IAuxiliaryView & IMenuItem)[]>;
  public hero$: Observable<any>;

  private _destroyed = new Subject<void>();

  constructor(
    public readonly stateStore: AdventureStateStore,
    private readonly _commandsService: CommandService,
    private readonly _auxiliaryViewService: AuxiliaryViewService,
    private readonly _gameUiStore: GameUiStore,
    private readonly _routingService: RoutingService,
    private readonly _injector: Injector,
    private readonly _humanPlayerService: HumanPlayerService
  ) { }
  
  ngOnInit(): void {
    console.log(this.stateStore.currentState)
    this.hero$ = this.stateStore.state$.pipe(map(s => s.getCurrentPlayerSelectedPawn()))
    this.availableCommands$ = this.stateStore.state$.pipe(map(s => s.getAvailableActivities()));
    this.areas$ = this.stateStore.state$.pipe(map(s => s.getInteractableAreas()));
    this.menu$ = this._gameUiStore.state$.pipe(map(s => s.auxiliaryViews));
    this.stateStore.state$.pipe(takeUntil(this._destroyed), filter(s => !!s.visitedDungeon)).subscribe(s => this._routingService.navigateToDungeon());
  }

  async ngOnDestroy(): Promise<void> {
    this._auxiliaryViewService.dispose();
    this.stateStore.dispose();
    this._destroyed.next();
  }


  public handleEntityClick(entity: IEntity & IBoardArea & IDungeonArea): void {
    const pawn = this.stateStore.currentState.getCurrentPlayerSelectedPawn<IBoardObject>()
    if (!entity) {
      console.warn("Handle entity: entity not provided")
      return;
    }
    if (entity.isBoardArea && entity.nestedAreas.length > 0 && pawn.isAssigned(entity.position)) {
      this._auxiliaryViewService.openAuxiliaryView({ component: AreaViewComponent, layerId: 2 }, { area: entity }, this._injector);
      return;
    }
    if (entity.isDungeonArea && pawn.isAssigned(entity.position)) {
      this._auxiliaryViewService.openAuxiliaryView({ component: DungeonViewComponent, layerId: 2 }, { dungeonArea: entity }, this._injector);
      return;
    }
    if (RewarderFactory.isRewarder(entity) && pawn.isAdjanced(entity)) {
      this._auxiliaryViewService.openAuxiliaryView({ component: RewardViewComponent, layerId: 2 }, { rewarder: entity }, this._injector);
      return;
    }
  }


  public selectTopBarItem(v: IAuxiliaryView): void {
    if (v.component === HeroViewComponent) {
      this._auxiliaryViewService.openAuxiliaryView(v,{ hero: this.stateStore.currentState.getCurrentPlayerSelectedPawn() });
    } else if (v.component === GameMenuViewComponent) {
      this._auxiliaryViewService.openAuxiliaryView(v);
    }
  }


  public handleSelectedCommands(cs: ICommand[]) {
    if (cs.length <= 0 || cs.some(c => this._commandsService?.currentProcess?.isProcessing(c))) {
      this._commandsService?.currentProcess?.cancel()
    } else if(!this._commandsService.currentProcess) {
      if (!this.tryDelegateExecutionToAuxiliaryView(cs)) {
        this._commandsService.executeCommand(cs, this.stateStore, this._humanPlayerService);
      }
    }
  }

  public tryDelegateExecutionToAuxiliaryView(cs: ICommand[]): boolean {
    if (cs.length !== 1) {
      return false;
    }
    const c = cs[0];
    if (c.id === ENTER_DUNGEON_ACTIVITY) {
      this._auxiliaryViewService.openAuxiliaryView({ component: AreaViewComponent, layerId: 2 }, { area: c.subject }, this._injector);
      return true;
    } else if (c.id === TRADE_ACTIVITY) {

    }
  } 

}