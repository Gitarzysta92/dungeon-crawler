import { AfterViewInit, Component } from '@angular/core';
import { AdventureStateStore } from '../../stores/adventure-state.store';
import { DataFeedService } from 'src/app/core/game-data/services/data-feed.service';
import { ModalService2 } from 'src/app/shared/dialogs/api';
import { GameMenuComponent } from 'src/app/core/menus/components/game-menu/game-menu.component';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { SceneAssetsLoaderService } from 'src/app/core/scene/services/scene-assets-loader.service';
import { SceneService } from 'src/app/core/scene/services/scene.service';
import { InteractionService } from 'src/app/core/game/services/interaction.service';
import { ISceneMedium } from 'src/app/core/scene/mixins/scene-medium/scene-medium.interface';
import { UiService } from 'src/app/core/game-ui/services/ui.service';
import { IGameplayEntity } from '../../interfaces/adventure-gameplay-state.interface';
import { AdventureSuggestionService } from '../../services/adventure-suggestion.service';
import { SuggestionService } from 'src/app/core/game/services/suggestion.service';


@Component({
  selector: 'adventure-view',
  templateUrl: './adventure-view.component.html',
  styleUrls: ['./adventure-view.component.scss'],
  providers: [
    SceneAssetsLoaderService,
    InteractionService,
    UiService,
    { provide: SuggestionService, useClass: AdventureSuggestionService },
    AdventureSuggestionService
  ]
})
export class AdventureViewComponent implements AfterViewInit {

  public imgAsset = { url: "/backgrounds/city.png" }
  public view: any;

  public load = false;
  public entities: IGameplayEntity[];
  public scale: number = 1;
  interactableAreas: any;

  constructor(
    public readonly sceneService: SceneService,
    private readonly _adventureStateStore: AdventureStateStore,
    private readonly _dataFeed: DataFeedService,
    private readonly _modalService: ModalService2,
    private readonly _routingService: RoutingService,
    private readonly _interactionService: InteractionService,
    private readonly _suggestionService: AdventureSuggestionService
  ) { }

  async ngAfterViewInit(): Promise<void> {
    const { scene, entities } = this._adventureStateStore.currentState;
    await this.sceneService.initializeScene(scene.composerDeclarations, entities.filter(e => e.isSceneMedium) as ISceneMedium[]);
    this.makeUiAdjustments(entities);
    this.playAdventure();
  }


  public async playAdventure(): Promise<void> {
    do {
      this._suggestionService.hideAllSuggestions();
      const command = await this._interactionService.requestCommandSelection(this._adventureStateStore.currentState);
      if (!command) {
        continue;
      }
      await command.execute(this._adventureStateStore);
    } while (this._interactionService.areAvailableCommands(this._adventureStateStore.currentState));
  }


  // ############ to replace
  public openModal() {
    this._modalService.open(GameMenuComponent)
  }

  public makeUiAdjustments(entities: any) {
    this.sceneService.components.board2Component.initializeFieldHovering()
    this.entities = (entities as any).filter(e => !!e.position);
    this.interactableAreas = (entities as any).filter(e => e.isBoardArea && e.isUnlocked && e.nestedAreas.length > 0)
    this.handleUiScaleAndPositionAssociated3dObject()
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
