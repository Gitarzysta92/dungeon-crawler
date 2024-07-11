import { Observable } from "rxjs";
import { ActorsManager } from "../lib/actors/actors-manager";
import { MainLoop } from "../lib/core/main-loop";
import { Renderer } from "../lib/core/renderer";
import { RenderingPipeline } from "../lib/core/rendering-pipeline";
import { SceneWrapper } from "../lib/core/scene-wrapper";
import { TasksQueue } from "../lib/utils/tasks-queue/tasks-queue";
import { BufferGeometry, Camera, Line, Mesh, MeshBasicMaterial, PlaneGeometry, Vector2, Vector3 } from "three";


export class SceneApp {

  public get camera() { return this._scene.camera as Camera };
  public get renderer() { return this._renderer.webGlRenderer }

  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _scene: SceneWrapper,
    private readonly _renderer: Renderer,
    private readonly _tasksQueue: TasksQueue,
    private readonly _mainLoop: MainLoop,
    private readonly _renderingPipeline: RenderingPipeline,
  ) {}

  public initializeScene(canvasRef: HTMLElement): void {
    this._scene.initialize(canvasRef);
    this._renderer.initialize(canvasRef);
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

  public listenForCameraPositionChange(): Observable<any> {
    const plane = new Mesh(new PlaneGeometry(2, 2), new MeshBasicMaterial())
    plane.lookAt(this.camera.position);
    plane.visible = false;
    this._scene.scene.add(plane);
  
    const v = new Vector3(1, 1, 0);
    const b = new Vector3(-1, 1, 0);

    const update = () => {
      v.set(1, 1, 0);
      b.set(-1, 1, 0);
      this.camera.updateMatrixWorld();
      plane.lookAt(this.camera.position);
      plane.localToWorld(v);
      plane.localToWorld(b);
      v.project(this.camera);
      b.project(this.camera);
      const x1 = Math.round((b.x + 1) * this.renderer.domElement.offsetWidth / 2);
      const x2 = Math.round((v.x + 1) * this.renderer.domElement.offsetWidth / 2);
      return Math.abs(x1 - x2);
    }

    return new Observable(o => {
      o.next(update())
      this._scene.controls.addEventListener('change', e => {
        o.next(update());
      });
    })
  };
  

  public dispose() {
    this._mainLoop.dispose();
    this._actorsManager.destroyActors();
    this._renderer.webGlRenderer.dispose();
  }
}