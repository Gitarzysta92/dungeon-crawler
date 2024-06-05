import { AfterViewInit, Component } from '@angular/core';
import { AdventureStateStore } from '../../stores/adventure-state.store';
import { ModalService2 } from 'src/app/shared/dialogs/api';
import { GameMenuComponent } from 'src/app/core/menus/components/game-menu/game-menu.component';
import { SceneAssetsLoaderService } from 'src/app/core/scene/services/scene-assets-loader.service';
import { SceneService } from 'src/app/core/scene/services/scene.service';
import { InteractionService } from 'src/app/core/game/services/interaction.service';
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
import { IAuxiliaryView } from 'src/app/core/game-ui/interfaces/auxiliary-view.interface';
import { HeroViewComponent } from 'src/app/core/game/components/hero-view/hero-view.component';


@Component({
  selector: 'adventure-view',
  templateUrl: './adventure-view.component.html',
  styleUrls: ['./adventure-view.component.scss'],
  providers: [
    SceneAssetsLoaderService,
    InteractionService,
    UiService,
    { provide: SuggestionService, useClass: AdventureSuggestionService },
    AdventureSuggestionService,
    AuxiliaryViewService,
  ]
})
export class AdventureViewComponent implements AfterViewInit {

  public entities: IGameplayEntity[];
  public scale: number = 1;
  public interactableAreas: any;
  public selectedPortal: ComponentPortal<AreaViewComponent>;
  public menu$: Observable<IMenuItem[]>;


  constructor(
    public readonly sceneService: SceneService,
    public readonly stateStore: AdventureStateStore,
    private readonly _modalService2: ModalService2,
    private readonly _interactionService: InteractionService,
    private readonly _suggestionService: AdventureSuggestionService,
    private readonly _auxiliaryViewService: AuxiliaryViewService,
    private readonly _gameUiStore: GameUiStore
  ) { }

  async ngAfterViewInit(): Promise<void> {
    const { scene, entities } = this.stateStore.currentState;
    await this.sceneService.initializeScene(scene.composerDeclarations, entities.filter(e => e.isSceneMedium) as Array<IEntity &ISceneMedium>);
    this.makeUiAdjustments(entities);
    this.playAdventure();


    const field = entities.find(e => e.id === '7933C948-7358-4E92-95F2-8AECB6ECB0C9');
    this.openAreaView(field as IBoardArea)
  }


  public async playAdventure(): Promise<void> {
    do {
      this._suggestionService.hideAllSuggestions();
      const availableCommands = this._interactionService.getAvailableCommands(this.stateStore.currentState);
      const selection = await this._interactionService.requestCommandSelection(this.stateStore.currentState, availableCommands);
      if (!selection.confirmed) {
        continue;
      }
      await selection.command.execute(this.stateStore);
    } while (this._interactionService.areAvailableCommands(this.stateStore.currentState));
  }

  public handleSceneClick(x: any) {
    if (Array.isArray(x)) {
      this.openAreaView(x[0])
    } 
  }

  public openAreaView(area: IBoardArea): void {
    const pawn = this.stateStore.currentState.getSelectedPawn();
    const auxiliaryView = this._gameUiStore.currentState.auxiliaryViews.find(av => av.component === AreaViewComponent)
    if (pawn.isAdjanced(area) && auxiliaryView) {
      this._auxiliaryViewService.openAuxiliaryView(auxiliaryView, { area })
      this.selectedPortal = new ComponentPortal(AreaViewComponent);
    }
  }


  // ############ to replace
  public openAuxiliaryView(v: IAuxiliaryView): void {
    if (v.component === HeroViewComponent) {
      this._auxiliaryViewService.openAuxiliaryView(v,{ hero: this.stateStore.currentState.getSelectedPawn() });
    }
  }


  public openModal() {
    this._modalService2.open(GameMenuComponent)
  }

  public makeUiAdjustments(entities: any) {
    this.sceneService.components.board2Component.initializeFieldHovering()
    this.entities = (entities as any).filter(e => !!e.position);
    this.interactableAreas = (entities as any).filter(e => e.isBoardArea && e.isUnlocked && e.nestedAreas.length > 0)
    this.handleUiScaleAndPositionAssociated3dObject();
    this.menu$ = this._gameUiStore.state$.pipe(map(s => s.auxiliaryViews))
  }


  public handleUiScaleAndPositionAssociated3dObject(): void {
    this.sceneService.sceneApp.listenForCameraPositionChange().subscribe(d => {
      this.sceneService.sceneApp.camera.updateMatrixWorld()
      for (let e of this.entities) {
        e.updateViewportCoords(this.sceneService.sceneApp.camera as any, this.sceneService.sceneApp.renderer as any);
      }
      this.scale = d * 0.005;
    })
  }

}
