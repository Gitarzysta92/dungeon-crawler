
import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { fields, actors } from "src/app/development/dungeon-dev/components/dungeon-scene-dev/dungeon-scene-dev2.constants";
import { mapFieldToSceneField, mapBoardObjectToSceneToken } from "src/app/development/dungeon-dev/mappings/dungeon-scene-mappings";
import { dungeonDeclaration } from "../../game-data/constants/data-feed-dungeons";
import { MenuSceneService } from "../../scene/services/menu-scene.service";
import { SceneAssetsLoaderService } from "../../scene/services/scene-assets-loader.service";

@Injectable()
export class MenusResolver implements Resolve<void> {

  constructor(
    private readonly _sceneAssetsLoader: SceneAssetsLoaderService,
    private readonly _sceneService: MenuSceneService
  ) { }

  public async resolve(): Promise<void> {

    this._sceneService.createScene(this._sceneAssetsLoader);
    const declarations = [
      ...dungeonDeclaration.scene.composerDeclarations,
      ...fields.map(fcd => mapFieldToSceneField(Object.assign({ id: "" }, fcd))),
      ...actors.map(tcd => mapBoardObjectToSceneToken({ ...tcd } as any))
    ]
    await this._sceneAssetsLoader.loadAssets(declarations as any);
    await this._sceneService.composeScene(declarations);

  }

}
