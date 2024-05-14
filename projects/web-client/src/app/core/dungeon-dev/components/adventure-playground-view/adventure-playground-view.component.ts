import { AfterViewInit, Component } from '@angular/core';
import { ISceneInitialData } from '@3d-scene/app/scene-app.interface';
import { SceneAssetsLoaderService } from 'src/app/core/scene/services/scene-assets-loader.service';
import { SceneService } from 'src/app/core/scene/services/scene.service';
import { mapFieldToSceneField, mapBoardObjectToSceneToken } from '../../mappings/dungeon-scene-mappings';
import { actors, adventurePlaygroundScene, fields } from './adventure-playground-dev.constants';
import { map2dCoordsToCubeCoords, mapCubeCoordsTo3dCoords } from 'src/app/core/scene/misc/coords-mappings';
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
    const fieldDefinitions = fields.map(fcd => mapFieldToSceneField(Object.assign({ id: "" }, fcd)))
    const tokenDefinitions = actors.map(tcd => mapBoardObjectToSceneToken({...tcd} as any));

    const initialData: ISceneInitialData = {
      composerDeclarations: [
        ...adventurePlaygroundScene.composerDefinitions,
        ...fieldDefinitions,
        ...tokenDefinitions
      ]
    };

    await this.sceneService.initializeScene(initialData);

    const x = [
      { r: -1, q: 0, s: 1 },
      { r: 1, q: 0, s: -1 },
      { r: 0, q: 0, s: 0 },
      { r: 2, q: -1, s: -1 },
      { r: -1, q: -1, s: 2 }
    ].map(p => mapCubeCoordsTo3dCoords(p)).map(p => this.sceneService.components.board2Component.getIndex(p))



    this.sceneService.components.board2Component.select(x);

    this.sceneService.inputs$
      .pipe(filter(e => e instanceof PointerEvent))
      .subscribe(s => {
        const def = this.sceneService.components.board2Component.getTargetedField(s.clientX, s.clientY)
        if (def) {
          this.sceneService.components.board2Component.select([def.instanceId]);
        }
        console.log(map2dCoordsToCubeCoords({x: def.position.x, y: def.position.z }));
      });
  }
}
