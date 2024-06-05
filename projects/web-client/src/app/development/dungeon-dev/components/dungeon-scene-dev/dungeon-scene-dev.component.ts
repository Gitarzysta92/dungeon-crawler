import { AfterViewInit, Component } from '@angular/core';
import { SceneService } from 'src/app/core/scene/services/scene.service';
import { mapFieldToSceneField, mapBoardObjectToSceneToken } from "src/app/development/dungeon-dev/mappings/dungeon-scene-mappings";
import { actors, fields } from "./dungeon-scene-dev2.constants";
import { dungeonTemplate } from "src/app/core/game-data/constants/data-feed-dungeons";
import { SceneAssetsLoaderService } from 'src/app/core/scene/services/scene-assets-loader.service';


@Component({
  selector: 'dungeon-scene-dev',
  templateUrl: './dungeon-scene-dev.component.html',
  styleUrls: ['./dungeon-scene-dev.component.scss'],
  providers: [
    SceneAssetsLoaderService,
    SceneService
  ]
})
export class DungeonSceneDevComponent implements AfterViewInit {

  constructor(
    private readonly _sceneService: SceneService,
  ) { }

  ngAfterViewInit(): void {
    const fieldDefinitions = fields.map(fcd => mapFieldToSceneField(Object.assign({ id: "" }, fcd)))
    const tokenDefinitions = actors.map(tcd => mapBoardObjectToSceneToken({ ...tcd } as any));
    
    this._sceneService.initializeScene([
      ...dungeonTemplate.scene.composerDeclarations,
      ...fieldDefinitions,
      ...tokenDefinitions
    ]);
  }
}