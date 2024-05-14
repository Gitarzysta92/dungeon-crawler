import { Injectable } from "@angular/core";
import { SceneAppFactory } from "@3d-scene/index";
import { ISceneAppDeps, ISceneInitialData } from "@3d-scene/app/scene-app.interface";
import { ISceneComposerDefinition } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";
import { SceneAssetsLoaderService } from "./scene-assets-loader.service";
import { Observable } from "rxjs";
import { MenuSceneApp } from "@3d-scene/app/menu-scene-app";
import { IScene } from "../interfaces/dungeon-scene-state";

@Injectable()
export class MenuSceneService implements IScene {

  public inputs$: Observable<PointerEvent>;
  public components: ReturnType<SceneAppFactory['_initializeComponents']>;
  public services: ReturnType<SceneAppFactory['_initializeServices']>;
  public sceneApp: MenuSceneApp;
  private _infrastructure: ReturnType<SceneAppFactory['_initializeInfrastructure']>
  
  constructor(
    private readonly _sceneAssetsLoader: SceneAssetsLoaderService,
  ) { }


  public create(deps: Omit<ISceneAppDeps, "assetsProvider">): void {
    const sceneAppFactory = new SceneAppFactory();
    const app = sceneAppFactory.create(Object.assign(deps, { assetsProvider: this._sceneAssetsLoader }));
    // TODO : Resolve conflict between rxjs dependency that is used by web-client and 3dscene simultaneously.
    this.inputs$ = deps.inputs as unknown as Observable<PointerEvent>;
    this.sceneApp = app.menuApp;
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
  }


  public adjustSize(): void {
    this.sceneApp.adjustRendererSize(innerWidth, innerHeight);
  }

  public dispose(): void {
    this.sceneApp.dispose();
  }

}