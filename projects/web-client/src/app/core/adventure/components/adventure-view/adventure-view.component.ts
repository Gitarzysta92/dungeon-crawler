import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AdventureStateStore } from '../../stores/adventure-state.store';
import { DataFeedService } from 'src/app/core/game-data/services/data-feed.service';
import { ModalService } from 'src/app/shared/dialogs/api';
import { GameMenuComponent } from 'src/app/core/menus/components/game-menu/game-menu.component';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { SceneAssetsLoaderService } from 'src/app/core/scene/services/scene-assets-loader.service';
import { SceneService } from 'src/app/core/scene/services/scene.service';
import { ISceneInitialData } from '@3d-scene/app/scene-app.interface';
import { IUiMedium } from 'src/app/core/game-ui/mixins/visual-medium/ui-medium.interface';

@Component({
  selector: 'adventure-view',
  templateUrl: './adventure-view.component.html',
  styleUrls: ['./adventure-view.component.scss'],
  providers: [
    SceneAssetsLoaderService,
    SceneService
  ]
})
export class AdventureViewComponent implements OnInit, AfterViewInit {

  public imgAsset = { url: "/backgrounds/city.png" }
  public view: any;

  public load = false;

  constructor(
    private readonly _adventureStateStore: AdventureStateStore,
    private readonly _dataFeed: DataFeedService,
    private readonly _modalService: ModalService,
    private readonly _routingService: RoutingService,
    public readonly sceneService: SceneService,
  ) { }

  async ngAfterViewInit(): Promise<void> {
    const { scene, entities } = this._adventureStateStore.currentState 

    const initialData: ISceneInitialData = {
      composerDeclarations: scene.composerDeclarations
        .concat(entities.filter(e => e.isSceneMedium).reduce((acc, e) => acc.concat(e.getComposerDeclarations()), []))
    };

    await this.sceneService.initializeScene(initialData);
  }

  async ngOnInit(): Promise<void> {

   


    // setTimeout(() => {
    //   this.load = true;
    // }, 1000)


    // const dungeonAreaId = adventureState.dungeonInstance?.assignedAreaId;
    // if (dungeonAreaId) {
    //   this._routingService.navigateToArea(AreaType.Dungeon, dungeonAreaId);
    // }

    // this._adventureStateStore.state
    //   .pipe(
    //     map(s => s.hero.occupiedRootAreaId),
    //     switchMap(id => from(this._dataFeed.getArea(id))),
    //     switchMap(area => from(this._dataFeed.getAreas(area.childAreaIds)))
    //   )
    //   .subscribe(a => console.log(a));
    //console.log(this._adventureStateStore.currentState);
  }

  public openModal() {
    this._modalService.open(GameMenuComponent)
  }

}
