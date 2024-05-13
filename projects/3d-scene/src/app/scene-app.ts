import { Vector3, CatmullRomCurve3, BufferGeometry, LineBasicMaterial, Line } from "three";
import { ActorsManager } from "../lib/actors/actors-manager";
import { MainLoop } from "../lib/core/main-loop";
import { Renderer } from "../lib/core/renderer";
import { RenderingPipeline } from "../lib/core/rendering-pipeline";
import { SceneWrapper } from "../lib/core/scene-wrapper";
import { TasksQueue } from "../lib/utils/tasks-queue/tasks-queue";
import { ISceneInitialData } from "./scene-app.interface";


export class SceneApp {

  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _scene: SceneWrapper,
    private readonly _renderer: Renderer,
    private readonly _tasksQueue: TasksQueue,
    private readonly _mainLoop: MainLoop,
    private readonly _renderingPipeline: RenderingPipeline,
  ) {}

  public async initializeScene(sceneData: ISceneInitialData): Promise<void> {
    this._scene.initialize(sceneData);
    this._renderer.initialize();
    this._renderingPipeline.initialize();
    this._renderer.allowShadowMapAutoUpdate();
  }

  public startRendering(): void {
    
    this._mainLoop.onTick(t => this._tasksQueue.perform(t));

    this._mainLoop.onTick(t => {
      for (let actor of this._actorsManager.actors.values()) {
        actor.recalculate && actor.recalculate(t)
      }
    });

    this._mainLoop.onTick(() => this._renderingPipeline.render());
    this._mainLoop.init();
  }

  public adjustRendererSize(a: any, b: any): void {
    this._scene.adjustToViewportChange(a, b);
    this._renderer.adjustToViewportChange(a, b, a/b)
  }

  public allowShadowMapAutoUpdate(): void {
    this._renderer.allowShadowMapAutoUpdate();
    for (let actor of this._actorsManager.actors.values()) {
      if (actor.allowShadowMapAutoUpdate) {
        actor.allowShadowMapAutoUpdate()
      }
    }
  }

  public preventShadowMapAutoUpdate(): void {
    this._renderer.preventShadowMapAutoUpdate();
    for (let actor of this._actorsManager.actors.values()) {
      if (actor.preventShadowMapAutoUpdate) {
        actor.preventShadowMapAutoUpdate()
      }
    }
  }

  public dispose() {
    this._mainLoop.dispose();
    this._actorsManager.destroyActors();
    this._renderer.webGlRenderer.dispose();
  }
}