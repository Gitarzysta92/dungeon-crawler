import { AfterViewInit, Component } from '@angular/core';
import { dungeonTemplate } from 'src/app/core/game-data/constants/data-feed-dungeons';
import { MenuSceneService } from 'src/app/core/scene/services/menu-scene.service';
import { actors, fields } from '../dungeon-scene-dev/dungeon-scene-dev2.constants';
import { ISceneInitialData } from '@3d-scene/app/scene-app.interface';
import { mapFieldToSceneField, mapBoardObjectToSceneToken } from '../../mappings/dungeon-scene-mappings';

@Component({
  selector: 'menu-scene-view',
  templateUrl: './menu-scene-view.component.html',
  styleUrls: ['./menu-scene-view.component.scss'],
  providers: [
    MenuSceneService,
  ]
})
export class MenuSceneViewComponent implements AfterViewInit {

  constructor(
    public readonly sceneService: MenuSceneService
  ) { }

  ngAfterViewInit(): void {
    const fieldDefinitions = fields.map(fcd => mapFieldToSceneField(Object.assign({ id: "" }, fcd)))
    const tokenDefinitions = actors.map(tcd => mapBoardObjectToSceneToken({...tcd} as any));

    const initialData: ISceneInitialData = {
      composerDeclarations: [
        ...dungeonTemplate.scene.composerDeclarations,
        ...fieldDefinitions,
        ...tokenDefinitions
      ]
    };
    this.sceneService.initializeScene(initialData);
  }

  public animateCamera() {
    this.sceneService.sceneApp.animateCamera();
  }

}
