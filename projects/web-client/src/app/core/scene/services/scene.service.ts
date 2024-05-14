import { Injectable, NgZone } from "@angular/core";
import { IScene } from "../interfaces/dungeon-scene-state";
import { SceneAppFactory } from "@3d-scene/index";
import { ISceneAppDeps, ISceneInitialData } from "@3d-scene/app/scene-app.interface";
import { ISceneComposerDefinition } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";
import { SceneApp } from "@3d-scene/app/scene-app";
import { SceneAssetsLoaderService } from "./scene-assets-loader.service";
import { Observable } from "rxjs";
import { ISceneMedium } from "../mixins/scene-medium/scene-medium.interface";

@Injectable()
export class SceneService implements IScene {

  public inputs$: Observable<PointerEvent>;
  public components: ReturnType<SceneAppFactory['_initializeComponents']>;
  public services: ReturnType<SceneAppFactory['_initializeServices']>;
  public sceneApp: SceneApp;
  private _infrastructure: ReturnType<SceneAppFactory['_initializeInfrastructure']>
  
  constructor(
    private readonly _sceneAssetsLoader: SceneAssetsLoaderService,
    private readonly _zone: NgZone
  ) { }

  public adjustSize(): void {
    this.sceneApp.adjustRendererSize(innerWidth, innerHeight);
  }

  public dispose(): void {
    this.sceneApp.dispose();
  }

  public create(sceneDeps: Omit<ISceneAppDeps, 'assetsProvider'>) {
    const sceneAppFactory = new SceneAppFactory();
    const app = sceneAppFactory.create(Object.assign(sceneDeps, { assetsProvider: this._sceneAssetsLoader }));
    // TODO : Resolve conflict between rxjs dependency that is used by web-client and 3dscene simultaneously.
    this.inputs$ = sceneDeps.inputs as unknown as Observable<PointerEvent>;
    this.sceneApp = app.sceneApp;
    this.components = app.components;
    this.services = app.services;
    this._infrastructure = app.infrastructure;
  }


  public async loadSceneAssets(composerDefinitions: ISceneComposerDefinition<unknown>[]) {
    const assetDefinitions = this._sceneAssetsLoader.aggregateAssetsFor(composerDefinitions as any);
    await this._sceneAssetsLoader.loadAssets(assetDefinitions);
  }


  public async initializeScene(data: ISceneInitialData): Promise<void> {
    await this.sceneApp.initializeScene(data);
    await this._infrastructure.sceneComposer.compose(data.composerDeclarations);
    this.sceneApp.startRendering();
    await this.services.animationService.waitForAllBlockingAnimationsToResolve();
    this.sceneApp.preventShadowMapAutoUpdate();
    //this.components.boardComponent.initialize();
  }


  public adjustRendererSize() {
    this.sceneApp.adjustRendererSize(innerWidth, innerHeight);
  }


  public async processSceneUpdate(sms: ISceneMedium[]): Promise<void> {
    const toRemove = [];
    const toUpdate = [];
    const toCreate = [];

    for (let x of x) {
      
    }

    await Promise.all(sms.filter(sm => sm.to))
    await Promise.all(sms.map(sm => sm.updateBehavior()))
  }

}





// private async _updateBoardTokens(s: IDungeonSceneState): Promise<void> {
//   await Promise.all(Object.entries(s.tokens).map(async ([fieldAuxId, tile]) => {
//     let token = this.components.boardComponent.getToken(tile.auxId);
//     if (!token) {
//       token = await this.components.boardComponent.createToken(tile, fieldAuxId);
//     }
//     return this._updateBehavior(token, tile)
//   }));
//   await Promise.all(this.components.boardComponent.getAllAttachedTokens()
//     .map(t => {
//       if (s.tokens[t.auxId]) {
//         return;
//       }
//       const token = this.components.boardComponent.getToken(t.auxId);
//       return this.services.actorsManager.deleteObject(token);
//     }));
// }