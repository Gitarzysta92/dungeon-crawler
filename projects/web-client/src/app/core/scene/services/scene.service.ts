import { Injectable, NgZone } from "@angular/core";
import { IScene } from "../interfaces/dungeon-scene-state";
import { SceneAppFactory } from "@3d-scene/index";
import { ISceneAppDeps } from "@3d-scene/app/scene-app.interface";
import { ISceneComposerDefinition } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";
import { SceneApp } from "@3d-scene/app/scene-app";
import { SceneAssetsLoaderService } from "./scene-assets-loader.service";
import { Observable, filter, map } from "rxjs";
import { ISceneMedium } from "../mixins/scene-medium/scene-medium.interface";
import { Vector2 } from "three";


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

  public listenForSelections<T>(): Observable<ISceneMedium & T> {
    const v = new Vector2();
    return this.inputs$
      .pipe(
        filter(e => e.type === "click"),
        map(e => {
          v.set(e.clientX, e.clientY)
          const is = this.services.pointerHandler.intersect(v as any);
          return is.find(i => i.object.userData.mediumRef )?.object?.userData?.mediumRef as ISceneMedium & T
        }),
        filter(s => !!s)
      )
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


  public async initializeScene(composerDefinitions: ISceneComposerDefinition<unknown>[], sms: ISceneMedium[] = []): Promise<void> {
    for (let sm of sms) {
      sm.actorsManager = new WeakRef(this.services.actorsManager)
    }
    await this.sceneApp.initializeScene();
    this.sceneApp.startRendering();
    await this._infrastructure.sceneComposer.compose(composerDefinitions);
    await this.processSceneUpdate(sms);
  }

  public adjustRendererSize() {
    this.sceneApp.adjustRendererSize(innerWidth, innerHeight);
  }

  public async processSceneUpdate(sms: ISceneMedium[]): Promise<void> {
    const toRemove: ISceneMedium[] = [];
    const toCreate: ISceneMedium[] = [];
    const toUpdate: ISceneMedium[] = [];

    this.sceneApp.allowShadowMapAutoUpdate();
    for (let sm of sms) {
      if (sm.toRemove) {
        toRemove.push(sm)
      } else if (!sm.isSceneObjectsCreated) {
        toCreate.push(sm)
      } else {
        toUpdate.push(sm); 
      }
    }

    await Promise.all([
      toRemove.map(sm => sm.removeSceneObjects()),
      toCreate.map(async sm => {
        await this._infrastructure.sceneComposer.compose(sm.createSceneObjects());
        sm.updateViewportCoords(this.sceneApp.camera as any, this.sceneApp.renderer as any);
      }),
      toUpdate.map(sm => sm.updateBehavior())
    ])

    await this.services.animationService.waitForAllBlockingAnimationsToResolve();
    this.sceneApp.preventShadowMapAutoUpdate();
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