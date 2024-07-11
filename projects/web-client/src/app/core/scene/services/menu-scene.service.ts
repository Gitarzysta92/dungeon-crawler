import { Injectable } from "@angular/core";
import { SceneAppFactory } from "@3d-scene/index";
import { ISceneComposerDefinition } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";
import { SceneAssetsLoaderService } from "./scene-assets-loader.service";
import { Observable } from "rxjs";
import { MenuSceneApp } from "@3d-scene/app/menu-scene-app";
import { IAssetsProvider } from "@3d-scene/lib/assets/assets.interface";

@Injectable()
export class MenuSceneService {

  public inputs$: Observable<PointerEvent>;
  public components: ReturnType<SceneAppFactory['_initializeComponents']>;
  public services: ReturnType<SceneAppFactory['_initializeServices']>;
  public sceneApp: MenuSceneApp;
  private _infrastructure: ReturnType<SceneAppFactory['_initializeInfrastructure']>
  private readonly _sceneAppFactory = new SceneAppFactory();
  
  constructor(
    private readonly _sceneAssetsLoader: SceneAssetsLoaderService,
  ) { }


  public createScene(assetsProvider: IAssetsProvider): void {
    const app = this._sceneAppFactory.create({
      animationFrameProvider: window,
      assetsProvider: assetsProvider,
      height: innerHeight,
      width: innerWidth,
      pixelRatio: window.devicePixelRatio,
    });
    this.sceneApp = app.menuApp;
    this.components = app.components;
    this.services = app.services;
    this._infrastructure = app.infrastructure;
  }

  public composeScene(composerDeclarations: ISceneComposerDefinition<unknown>[]): Promise<void> {
    return this._infrastructure.sceneComposer.compose(composerDeclarations);
  }

  public async loadSceneAssets(composerDefinitions: ISceneComposerDefinition<unknown>[]) {
    await this._sceneAssetsLoader.loadAssets(composerDefinitions as any);
  }


  public async initializeScene(canvasRef: HTMLElement): Promise<void> {
    await this.sceneApp.initializeScene(canvasRef);
    this.sceneApp.startRendering();
    await this.services.animationService.waitForAllBlockingAnimationsToResolve();
    this.sceneApp.preventShadowMapAutoUpdate();
  }


  public adjustSize(): void {
    this.sceneApp.adjustRendererSize(innerWidth, innerHeight);
  }

  public dispose(): void {
    this.sceneApp.dispose();
  }

}