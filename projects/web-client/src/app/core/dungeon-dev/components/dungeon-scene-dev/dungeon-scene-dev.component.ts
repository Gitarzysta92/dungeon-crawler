import { AfterViewInit, Component } from '@angular/core';
import { SceneService } from 'src/app/core/scene/services/scene.service';
import { ISceneInitialData } from '@3d-scene/app/scene-app.interface';
import { mapFieldToSceneField, mapBoardObjectToSceneToken } from "src/app/core/dungeon-dev/mappings/dungeon-scene-mappings";
import { actors, fields } from "./dungeon-scene-dev2.constants";
import { dungeonTemplate } from "src/app/core/game-data/constants/data-feed-dungeons";


@Component({
  selector: 'dungeon-scene-dev',
  templateUrl: './dungeon-scene-dev.component.html',
  styleUrls: ['./dungeon-scene-dev.component.scss']
})
export class DungeonSceneDevComponent implements AfterViewInit {

  constructor(
    private readonly _sceneService: SceneService,
  ) { }

  ngAfterViewInit(): void {
    this._initializeScene();
  }

  private _initializeScene(): void {
    let composerDefinitions = this.getY();
    composerDefinitions = [...dungeonTemplate.visual.scene.composerDefinitions,...composerDefinitions] as any

    const initialData: ISceneInitialData = {
      bgColor: dungeonTemplate.visual.scene.bgColor,
      composerDefinitions: composerDefinitions
    };

    this._sceneService.initializeScene(initialData);
  }

  private getY() {
    const fieldDefinitions = fields.map(fcd => mapFieldToSceneField(Object.assign({ id: "" }, fcd)))
    const tokenDefinitions = actors.map(tcd => mapBoardObjectToSceneToken({...tcd} as any));
    return [...fieldDefinitions, ...tokenDefinitions]
  }

}