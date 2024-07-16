import { Injectable, NgZone } from "@angular/core";
import { SceneAppFactory } from "@3d-scene/index";
import { ISceneComposerDefinition } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";
import { SceneApp } from "@3d-scene/app/scene-app";
import { ISceneMedium } from "../mixins/scene-medium/scene-medium.interface";
import { IAssetsProvider } from "@3d-scene/lib/assets/assets.interface";


@Injectable()
export class SceneService {
  
  public get canvasRef() { return this.sceneApp.renderer.domElement }
  public components: ReturnType<SceneAppFactory['_initializeComponents']>;
  public services: ReturnType<SceneAppFactory['_initializeServices']>;
  public sceneApp: SceneApp;
  private _infrastructure: ReturnType<SceneAppFactory['_initializeInfrastructure']>
  private readonly _sceneAppFactory = new SceneAppFactory();
  
  constructor() { }


  public createScene(assetsProvider: IAssetsProvider): void {
    const app = this._sceneAppFactory.create({
      animationFrameProvider: window,
      assetsProvider: assetsProvider,
      height: innerHeight,
      width: innerWidth,
      pixelRatio: window.devicePixelRatio,
    });
    this.sceneApp = app.sceneApp;
    this.components = app.components;
    this.services = app.services;
    this._infrastructure = app.infrastructure;
    this.sceneApp.compose();
  }

  public composeScene(composerDefinitions: ISceneComposerDefinition<unknown>[]): Promise<void> {
    return this._infrastructure.sceneComposer.compose(composerDefinitions);
  }

  public initializeScene(canvasRef: HTMLElement): void {
    this.sceneApp.initializeScene(canvasRef);
    this.sceneApp.startRendering();
  }

  public adjustSize(): void {
    this.sceneApp.adjustRendererSize(innerWidth, innerHeight);
  }

  public dispose(): void {
    this.sceneApp.dispose();
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
        sm.updateScreenCoords();
      }),
      toUpdate.map(sm => sm.updateScenePosition())
    ])

    await this.services.animationService.waitForAllBlockingAnimationsToResolve();
    this.sceneApp.preventShadowMapAutoUpdate();
  }

}