import { Injectable, NgZone } from "@angular/core";
import { IDungeonSceneState, ISceneField, ISceneToken } from "../interfaces/dungeon-scene-state";
import { SceneAppFactory } from "@3d-scene/index";
import { ISceneAppDeps, ISceneInitialData } from "@3d-scene/app/scene-app.interface";
import { ISceneComposerDefinition } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";
import { SceneApp } from "@3d-scene/app/scene-app";
import { SceneAssetsLoaderService } from "./scene-assets-loader.service";
import { IBehaviorHolder } from "@3d-scene/lib/behaviors/behavior-holder.interface";
import { Movable } from "@3d-scene/lib/behaviors/movable/movable.mixin";
import { Rotatable } from "@3d-scene/lib/behaviors/rotatable/rotatable.mixin";
import { Selectable } from "@3d-scene/lib/behaviors/selectable/selectable.mixin";
import { Highlightable } from "@3d-scene/lib/behaviors/highlightable/highlightable.mixin";
import { Observable } from "rxjs";

@Injectable()
export class SceneService {

  public inputs$: Observable<PointerEvent>;
  public components: ReturnType<SceneAppFactory['_initializeComponents']>;
  public services: ReturnType<SceneAppFactory['_initializeServices']>;
  private _sceneApp: SceneApp;
  private _infrastructure: ReturnType<SceneAppFactory['_initializeInfrastructure']>
  
  constructor(
    private readonly _sceneAssetsLoader: SceneAssetsLoaderService,
    private readonly _zone: NgZone
  ) { }


  public createSceneApp(sceneDeps: Omit<ISceneAppDeps, 'assetsProvider'>) {
    const sceneAppFactory = new SceneAppFactory();
    const app = sceneAppFactory.create(Object.assign(sceneDeps, { assetsProvider: this._sceneAssetsLoader }));
    // TODO : Resolve conflict between rxjs dependency that is used by web-client and 3dscene simultaneously.
    this.inputs$ = sceneDeps.inputs as unknown as Observable<PointerEvent>;
    this._sceneApp = app.sceneApp;
    this.components = app.components;
    this.services = app.services;
    this._infrastructure = app.infrastructure;
  }


  public async loadSceneAssets(composerDefinitions: ISceneComposerDefinition<unknown>[]) {
    const assetDefinitions = this._sceneAssetsLoader.aggregateAssetsFor(composerDefinitions as any);
    await this._sceneAssetsLoader.loadAssets(assetDefinitions);
  }


  public async initializeScene(data: ISceneInitialData): Promise<void> {
    await this._sceneApp.initializeScene(data);
    await this._infrastructure.sceneComposer.compose(data.composerDefinitions);
    this._sceneApp.startRendering();
    await this.services.animationService.waitForAllBlockingAnimationsToResolve();
    this._sceneApp.preventShadowMapAutoUpdate();
    //this.components.boardComponent.initialize();
  }


  public adjustRendererSize() {
    this._sceneApp.adjustRendererSize(innerWidth, innerHeight);
  }


  public async processSceneUpdate(s: IDungeonSceneState): Promise<void> {
    await this._updateBoardFields(s);
    await this._updateBoardTokens(s);
  }


  private async _updateBoardTokens(s: IDungeonSceneState): Promise<void> {
    await Promise.all(Object.entries(s.tokens).map(async ([fieldAuxId, tile]) => {
      let token = this.components.boardComponent.getToken(tile.auxId);
      if (!token) {
        token = await this.components.boardComponent.createToken(tile, fieldAuxId);
      }
      return this._updateBehavior(token, tile)
    }));
    await Promise.all(this.components.boardComponent.getAllAttachedTokens()
      .map(t => {
        if (s.tokens[t.auxId]) {
          return;
        }
        const token = this.components.boardComponent.getToken(t.auxId);
        return this.services.actorsManager.deleteObject(token);
      }));
  }


  private async _updateBoardFields(s: IDungeonSceneState): Promise<void> {
    Object.entries(s.fields).forEach(([id, field]) => {
      const boardField = this.components.boardComponent.getField(field.auxId);
      this._updateBehavior(boardField, field);
    });
  }

  
  private async _updateBehavior(behaviorHolder: IBehaviorHolder, token: ISceneField | ISceneToken): Promise<void> {
    await Movable.validate(behaviorHolder)?.move(token.position);
    if ('rotation' in token) {
      await Rotatable.validate(behaviorHolder)?.rotate(token.rotation);
    }

    if (token.isSelected) {
      Selectable.validate(behaviorHolder).select();
    } else {
      Selectable.validate(behaviorHolder).deselect();
    }

    if (token.isHighlighted) {
      Highlightable.validate(behaviorHolder).highlight();
    } else {
      Highlightable.validate(behaviorHolder).unhighlight();
    }
  }
}