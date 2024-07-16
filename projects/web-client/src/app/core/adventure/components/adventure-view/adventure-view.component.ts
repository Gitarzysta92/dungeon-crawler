import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { AdventureStateStore } from '../../stores/adventure-state.store';
import { SceneService } from 'src/app/core/scene/services/scene.service';
import { CommandsService } from 'src/app/core/game/services/commands.service';
import { UiService } from 'src/app/core/game-ui/services/ui.service';
import { AdventureSuggestionService } from '../../services/adventure-suggestion.service';
import { SuggestionService } from 'src/app/core/game/services/suggestion.service';
import { IEntity } from '@game-logic/lib/base/entity/entity.interface';
import { IBoardArea } from '@game-logic/gameplay/modules/board-areas/entities/board-area/board-area.interface';
import { AreaViewComponent } from '../area-view/area-view.component';
import { GameUiStore } from 'src/app/core/game-ui/stores/game-ui.store';
import { AuxiliaryViewService } from 'src/app/core/game-ui/services/auxiliary-view.service';
import { Observable, filter, map } from 'rxjs';
import { IMenuItem } from 'src/app/aspects/navigation/interfaces/navigation.interface';
import { HeroViewComponent } from 'src/app/core/game/components/hero-view/hero-view.component';
import { GameMenuViewComponent } from 'src/app/core/game/components/game-menu-view/game-menu-view.component';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { IAuxiliaryView } from 'src/app/core/game-ui/interfaces/auxiliary-view.interface';
import { IDungeonArea } from '@game-logic/gameplay/modules/dungeon/mixins/dungeon-area/dungeon-area.interface';
import { DungeonViewComponent } from '../dungeon-view/dungeon-view.component';
import { SceneInteractionService } from 'src/app/core/scene/api';
import { ICommand } from 'src/app/core/game/interfaces/command.interface';


@Component({
  selector: 'adventure-view',
  templateUrl: './adventure-view.component.html',
  styleUrls: ['./adventure-view.component.scss'],
  providers: [
    CommandsService,
    UiService,
    { provide: SuggestionService, useClass: AdventureSuggestionService },
    AdventureSuggestionService,
    AuxiliaryViewService,
  ]
})
export class AdventureViewComponent implements OnInit, OnDestroy {


  public availableCommands$: Observable<ICommand[]>;
  public areas$: Observable<IBoardArea[]>;
  public menu$: Observable<(IAuxiliaryView & IMenuItem)[]>;
  hero$: Observable<any>;


  constructor(
    public readonly stateStore: AdventureStateStore,
    private readonly _commandsService: CommandsService,
    private readonly _auxiliaryViewService: AuxiliaryViewService,
    private readonly _gameUiStore: GameUiStore,
    private readonly _routingService: RoutingService,
    private readonly _injector: Injector,
  ) { }
  
  ngOnInit(): void {
    this.hero$ = this.stateStore.state$.pipe(map(s => s.getCurrentPlayerSelectedPawn()))
    this.availableCommands$ = this.stateStore.state$.pipe(map(s => this._commandsService.getAvailableCommands(s)));
    this.areas$ = this.stateStore.state$.pipe(map(s => s.getInteractableAreas()));
    this.menu$ = this._gameUiStore.state$.pipe(map(s => s.auxiliaryViews));
    this.stateStore.state$.pipe(filter(s => !!s.visitedDungeon)).subscribe(s => this._routingService.navigateToDungeon());
  }

  async ngOnDestroy(): Promise<void> {
    this._auxiliaryViewService.dispose()
    this.stateStore.dispose();
    this._gameUiStore.dispose();
  }


  public handleEntityClick(entity: IEntity & IBoardArea & IDungeonArea): void {
    const pawn = this.stateStore.currentState.getCurrentPlayerSelectedPawn()
    if (entity && entity.isBoardArea && entity.nestedAreas.length > 0 && pawn.isAssigned(entity.position)) {
      this._auxiliaryViewService.openAuxiliaryView({ component: AreaViewComponent, layerId: 2 }, { area: entity }, this._injector);
    } else if (entity && entity.isDungeonArea && pawn.isAssigned(entity.position)) {
      this._auxiliaryViewService.openAuxiliaryView({ component: DungeonViewComponent, layerId: 2 }, { dungeonArea: entity }, this._injector);
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
    if (cs.length <= 0 || cs.some(c => this._commandsService?.currentProcess?.hasCommand(c))) {
      this._commandsService.finalizeExecutionProcess();
    } else if (cs.length > 1) {
      this._commandsService.tryExecuteCommand(this.stateStore, cs);
    } else if (cs.length === 1) {
      this._commandsService.executeCommand(this.stateStore, cs[0]);
    }
  }

}