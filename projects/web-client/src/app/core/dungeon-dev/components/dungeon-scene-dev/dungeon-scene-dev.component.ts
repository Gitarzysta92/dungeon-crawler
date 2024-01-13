import { v4 } from "uuid";
import { AfterViewInit, Component } from '@angular/core';
import { dungeonDataFeedEntity, fieldComposerDefinitions, tokenComposerDefinitions } from 'src/app/core/data-feed/constants/data-feed-dungeons';
import { IDungeonDataFeedEntity } from 'src/app/core/data-feed/interfaces/data-feed-dungeon-entity.interface';
import { SceneService } from 'src/app/core/dungeon-scene/services/scene.service';
import { ISceneInitialData } from '@3d-scene/app/scene-app.interface';
import { mapBoardObjectToSceneToken, mapFieldToSceneField } from 'src/app/core/dungeon-scene/mappings/dungeon-scene-mappings';
import { IBoardObject, IBoardObjectRotation } from '@game-logic/lib/features/board/board.interface';
import { ICommonTileDefinition } from '@3d-scene/lib/actors/game-objects/tokens/common-tile/common-tile.interface';
import { commonTileComposerDefinitionName } from '@3d-scene/lib/actors/game-objects/tokens/common-tile/common-tile.constants';
import { dungeonDevSceneDefinitions } from './dungeon-scene-dev.constants';

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
    const dungeonDataFeed: IDungeonDataFeedEntity = dungeonDataFeedEntity;

    //let composerDefinitions = this.getY();
    let composerDefinitions = this.getX();

    composerDefinitions = [...dungeonDataFeed.visualScene.composerDefinitions,...composerDefinitions] as any

    const initialData: ISceneInitialData = {
      bgColor: dungeonDataFeed.visualScene.bgColor,
      composerDefinitions: composerDefinitions
    };

    this._sceneService.initializeScene(initialData);
  }


  private getY() {
    const fieldDefinitions = dungeonDevSceneDefinitions.map(fcd => mapFieldToSceneField(Object.assign({ id: "" }, fcd)));
    //.filter(d => d.visualScene.definitionName !== blankFieldComposerDefinitionName)
    const tokenDefinitions = dungeonDevSceneDefinitions.map(tcd => mapBoardObjectToSceneToken(Object.assign({...tcd.o}, { position: tcd.position })));
    return [...fieldDefinitions, ...tokenDefinitions]
  }


  private getX() {
    const fieldDefinitions = fieldComposerDefinitions.map((fcd, index) => {
      fcd.visualScene.initialAnimationDelay = index * 25;
      return mapFieldToSceneField(Object.assign({ id: "" }, fcd))
    });
    const tokenDefinitions = tokenComposerDefinitions.map((tcd, index) => {
      (tcd.visualScene as any).initialAnimationDelay = index * 200 + 500;
      return mapBoardObjectToSceneToken(tcd)
    })
    const heroTokenDefinition: IBoardObject & { visualScene: ICommonTileDefinition & any } = {
      id: v4(),
      rotation: 0 as IBoardObjectRotation,
      position: { r: 1, q: -1, s: -0 },
      visualScene: {
        definitionName: commonTileComposerDefinitionName,
        initialAnimationDelay: 1000,
        primaryColor: 0x31386c,
        jawelColor: 0xeb6f36,
        texture: {
          assetName: "hero",
          extensionName: "png"
        },
        outlets: [0,3,5]
      }
    }
    console.log(tokenDefinitions);

    return [
      ...fieldDefinitions,
      ...tokenDefinitions,
      mapBoardObjectToSceneToken(heroTokenDefinition)
    ];
  }

}
