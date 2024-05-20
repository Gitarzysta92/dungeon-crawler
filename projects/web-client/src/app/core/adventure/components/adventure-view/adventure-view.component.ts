import { AfterViewInit, Component } from '@angular/core';
import { AdventureStateStore } from '../../stores/adventure-state.store';
import { DataFeedService } from 'src/app/core/game-data/services/data-feed.service';
import { ModalService } from 'src/app/shared/dialogs/api';
import { GameMenuComponent } from 'src/app/core/menus/components/game-menu/game-menu.component';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { SceneAssetsLoaderService } from 'src/app/core/scene/services/scene-assets-loader.service';
import { SceneService } from 'src/app/core/scene/services/scene.service';
import { InteractionService } from 'src/app/core/game-ui/services/interaction.service';
import { ISceneMedium } from 'src/app/core/scene/mixins/scene-medium/scene-medium.interface';
import { UiService } from 'src/app/core/game-ui/services/ui.service';
import { IGameplayEntity } from '../../interfaces/adventure-gameplay-state.interface';


@Component({
  selector: 'adventure-view',
  templateUrl: './adventure-view.component.html',
  styleUrls: ['./adventure-view.component.scss'],
  providers: [
    SceneAssetsLoaderService,
    SceneService,
    InteractionService,
    UiService,
  ]
})
export class AdventureViewComponent implements AfterViewInit {

  public imgAsset = { url: "/backgrounds/city.png" }
  public view: any;

  public load = false;
  public entities: IGameplayEntity[];
  public scale: number = 1;

  constructor(
    public readonly sceneService: SceneService,
    private readonly _adventureStateStore: AdventureStateStore,
    private readonly _dataFeed: DataFeedService,
    private readonly _modalService: ModalService,
    private readonly _routingService: RoutingService,
    private readonly _interactionService: InteractionService
  ) { }

  async ngAfterViewInit(): Promise<void> {
    const { scene, entities } = this._adventureStateStore.currentState;
    await this.sceneService.initializeScene(scene.composerDeclarations, entities.filter(e => e.isSceneMedium) as ISceneMedium[]);

    this.entities = (entities as any).filter(e => !!e.position);
    console.log(this.entities);

    this.sceneService.sceneApp.listenForCameraPositionChange().subscribe(d => {
      this.sceneService.sceneApp.camera.updateMatrixWorld()
      for (let e of entities) {
        e.updateViewportCoords(this.sceneService.sceneApp.camera as any, this.sceneService.sceneApp.renderer as any);
      }
      this.entities = (entities as any).filter(e => !!e.position);
      this.scale = d * 0.005;
    })

    this.startAdventure();
  }

  public async startAdventure(): Promise<void> {
    let allowedActivities = [];
    do {
      allowedActivities = this._adventureStateStore.currentState.getAllowedActivities();
      const selectedActivity = await this._interactionService.requestActivitySelection(allowedActivities);
      const activity = await selectedActivity.perform(this._adventureStateStore.currentState.hero);
      //this._adventureStateStore.dispatch(activity);
      
    } while (allowedActivities.length > 0);
    console.log('Adventure finished?')
  }


  public openModal() {
    this._modalService.open(GameMenuComponent)
  }

}
