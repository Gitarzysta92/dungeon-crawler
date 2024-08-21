import { AfterViewInit, Component } from '@angular/core';
import { SceneAssetsLoaderService } from 'src/app/core/scene/services/scene-assets-loader.service';
import { SceneService } from 'src/app/core/scene/services/scene.service';
import { adventurePlaygroundScene } from './adventure-playground-dev.constants';
import { filter } from 'rxjs';


@Component({
  selector: 'adventure-playground-view',
  templateUrl: './adventure-playground-view.component.html',
  styleUrls: ['./adventure-playground-view.component.scss'],
  providers: [
    SceneAssetsLoaderService,
    SceneService
  ]
})
export class AdventurePlaygroundViewComponent implements AfterViewInit {

  constructor(
    public readonly sceneService: SceneService,
  ) { }

  async ngAfterViewInit(): Promise<void> {
    // const boardGrid = new BoardGrid({
    //   row: 20,
    //   column: 20,
    //   coordinateSystem: new CubeCoordinateSystem(),
    //   field: new HexagonField(5)
    // });
    // const coordinates = boardGrid.generateCoordinates(terrainMap);
    // boardGrid.setByCoordinates(coordinates);
    // const fields = boardGrid.getFields(new CartesianCoordinateSystem3d());

    // await this.sceneService.initializeScene([
    //   ...adventurePlaygroundScene.composerDefinitions,
    //   {
    //     definitionName: "xyz",
    //     fields: fields,
    //   } as any,
    // ]);


    // this.sceneService.inputs$
    //   .pipe(filter(e => e instanceof PointerEvent))
    //   .subscribe(s => {
    //   });
  }
}