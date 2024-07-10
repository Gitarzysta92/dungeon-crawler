import { AfterViewInit, Component, Injector, OnDestroy } from '@angular/core';
import { AdventureStateStore } from '../../stores/adventure-state.store';
import { SceneAssetsLoaderService } from 'src/app/core/scene/services/scene-assets-loader.service';
import { SceneService } from 'src/app/core/scene/services/scene.service';
import { CommandsService } from 'src/app/core/game/services/commands.service';
import { ISceneMedium } from 'src/app/core/scene/mixins/scene-medium/scene-medium.interface';
import { UiService } from 'src/app/core/game-ui/services/ui.service';
import { IGameplayEntity } from '../../interfaces/adventure-gameplay-state.interface';
import { AdventureSuggestionService } from '../../services/adventure-suggestion.service';
import { SuggestionService } from 'src/app/core/game/services/suggestion.service';
import { IEntity } from '@game-logic/lib/base/entity/entity.interface';
import { IBoardArea } from '@game-logic/gameplay/modules/board-areas/entities/board-area/board-area.interface';
import { ComponentPortal } from '@angular/cdk/portal';
import { AreaViewComponent } from '../area-view/area-view.component';
import { GameUiStore } from 'src/app/core/game-ui/stores/game-ui.store';
import { AuxiliaryViewService } from 'src/app/core/game-ui/services/auxiliary-view.service';
import { Observable, map } from 'rxjs';
import { IMenuItem } from 'src/app/aspects/navigation/interfaces/navigation.interface';
import { HeroViewComponent } from 'src/app/core/game/components/hero-view/hero-view.component';
import { GameMenuViewComponent } from 'src/app/core/game/components/game-menu-view/game-menu-view.component';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { IAuxiliaryView } from 'src/app/core/game-ui/interfaces/auxiliary-view.interface';
import { IDungeonArea } from '@game-logic/gameplay/modules/dungeon/mixins/dungeon-area/dungeon-area.interface';
import { DungeonViewComponent } from '../dungeon-view/dungeon-view.component';
import { ENTER_DUNGEON_ACTIVITY } from '@game-logic/gameplay/modules/dungeon/dungeon.constants';


@Component({
  selector: 'adventure-view',
  templateUrl: './adventure-view.component.html',
  styleUrls: ['./adventure-view.component.scss'],
  providers: [
    SceneAssetsLoaderService,
    CommandsService,
    UiService,
    { provide: SuggestionService, useClass: AdventureSuggestionService },
    AdventureSuggestionService,
    AuxiliaryViewService,
  ]
})
export class AdventureViewComponent implements AfterViewInit, OnDestroy {

  public entities: IGameplayEntity[];
  public scale: number = 1;
  public interactableAreas: any;
  public selectedPortal: ComponentPortal<AreaViewComponent>;
  public menu$: Observable<IMenuItem[]>;
  public activities: IMenuItem[];


  constructor(
    public readonly sceneService: SceneService,
    public readonly stateStore: AdventureStateStore,
    private readonly _interactionService: CommandsService,
    private readonly _auxiliaryViewService: AuxiliaryViewService,
    private readonly _gameUiStore: GameUiStore,
    private readonly _routingService: RoutingService,
    private readonly _injector: Injector
  ) { }

  async ngAfterViewInit(): Promise<void> {
    const { scene, entities } = this.stateStore.currentState;
    console.log(this.stateStore.currentState);
    await this.sceneService.initializeScene(scene.composerDeclarations, entities.filter(e => e.isSceneMedium) as Array<IEntity &ISceneMedium>);
    this.makeUiAdjustments(entities);
    // Development
    // const field = entities.find(e => e.id === '7933C948-7358-4E92-95F2-8AECB6ECB0C9');
    // this.openAreaView(field as IBoardArea)
  }

  async ngOnDestroy(): Promise<void> {
    this._auxiliaryViewService.dispose()
    this.sceneService.dispose();
    this.stateStore.dispose();
    this._gameUiStore.dispose();
  }

  public handleEntityClick(entity: IEntity & Partial<IBoardArea> & Partial<IDungeonArea>) {
    const pawn = this.stateStore.currentState.getSelectedPawn();
    if (entity && entity.isBoardArea && entity.nestedAreas.length > 0 && pawn.isAssigned(entity.position)) {
      this._auxiliaryViewService.openAuxiliaryView({ component: AreaViewComponent, layerId: 2 }, { area: entity }, this._injector);
    } else if (entity && entity.isDungeonArea && pawn.isAssigned(entity.position)) {
      this._auxiliaryViewService.openAuxiliaryView({ component: DungeonViewComponent, layerId: 2 }, { dungeonArea: entity }, this._injector);
    }
  }

  // ############ to replace
  public selectTopBarItem(v: IAuxiliaryView): void {
    if (v.component === HeroViewComponent) {
      this._auxiliaryViewService.openAuxiliaryView(v,{ hero: this.stateStore.currentState.getSelectedPawn() });
    }

    if (v.component === GameMenuViewComponent) {
      this._auxiliaryViewService.openAuxiliaryView(v);
    }
  }


  public selectActivity(v: IMenuItem & { commands: any[] } | null) {
    if (v && !v.isActive) {
      v.isActive = true;
      if (v.commands.length === 1) {
        const command = v.commands[0];
        if (command.id === ENTER_DUNGEON_ACTIVITY) {
          this.handleEntityClick(command.subject);
        }
      }
      this._interactionService.tryExecuteCommand(this.stateStore, v.commands);
    } else {
      this._interactionService.finalizeExecutionProcess();
    }
  }


  public makeUiAdjustments(entities: any) {
    this.sceneService.components.hexagonGrid.initializeFieldHovering()
    this.entities = (entities as any).filter(e => !!e.position);
    this.interactableAreas = (entities as any).filter(e => e.isBoardArea && e.isUnlocked && e.nestedAreas.length > 0)
    this.handleUiScaleAndPositionAssociated3dObject();
    this.menu$ = this._gameUiStore.state$.pipe(map(s => s.auxiliaryViews));
    this.stateStore.state$
      .pipe(map(s => {
        const availableCommands = this._interactionService.getAvailableCommands(this.stateStore.currentState);
        const items = new Map<string, IMenuItem & any>();

        for (let c of availableCommands) {
          const item = items.get(c.id);
          if (item) {
            item.commands.push(c);
            continue;
          }

          items.set(c.id, {
            icon: "map",
            isActive: false,
            isDisabled: false,
            isHighlighted: false,
            label: "",
            commands: [c]
          })
        }

        return Array.from(items.values());
    })).subscribe(a => this.activities = a)
    
    this.stateStore.state$.subscribe(s => {

      if (s.visitedDungeon) {
        this._routingService.navigateToDungeon();
      }
    })
  }


  public handleUiScaleAndPositionAssociated3dObject(): void {
    this.sceneService.sceneApp.listenForCameraPositionChange().subscribe(d => {
      this.sceneService.sceneApp.camera.updateMatrixWorld()
      for (let e of this.entities) {
        e.updateScreenCoords(this.sceneService.sceneApp.camera as any, this.sceneService.sceneApp.renderer as any);
      }
      this.scale = d * 0.005;
    })
  }

}




// public async playAdventure(): Promise<void> {
//   do {
//     this._suggestionService.hideAllSuggestions();
//     const availableCommands = this._interactionService.getAvailableCommands(this.stateStore.currentState);
//     const selection = await this._interactionService.requestCommandSelection(this.stateStore.currentState, availableCommands);
//     if (!selection.confirmed) {
//       continue;
//     }
//     await selection.command.execute(this.stateStore);
//   } while (this._interactionService.areAvailableCommands(this.stateStore.currentState));
// }
