
import { Vector3, CatmullRomCurve3 } from "three";
import { ActorsManager } from "../lib/actors/actors-manager";
import { MainLoop } from "../lib/core/main-loop";
import { Renderer } from "../lib/core/renderer";
import { RenderingPipeline } from "../lib/core/rendering-pipeline";
import { SceneWrapper } from "../lib/core/scene-wrapper";
import { TasksQueue } from "../lib/utils/tasks-queue/tasks-queue";
import { CameraTask } from "./camera.task";

export class MenuSceneApp {
  public get renderer() { return this._renderer.webGlRenderer }
  private _task: CameraTask | undefined;
  private _cameraCurve: CatmullRomCurve3 | undefined;
  private _cameraPointCurve: CatmullRomCurve3 | undefined;

  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _scene: SceneWrapper,
    private readonly _renderer: Renderer,
    private readonly _tasksQueue: TasksQueue,
    private readonly _mainLoop: MainLoop,
    private readonly _renderingPipeline: RenderingPipeline,
  ) { }
  
  public compose() {
    this._scene.compose();
  }


  public async initializeScene(canvasRef: HTMLElement): Promise<void> {
    this._scene.initialize(canvasRef);
    this._renderer.initialize(canvasRef);
    this._renderingPipeline.initialize();
    this._renderer.allowShadowMapAutoUpdate();
    this._cameraCurve = this._createCurve1();
    this._cameraPointCurve = this._createCurve2();

    this._scene.camera.position.copy(this._cameraCurve.getPointAt(0));
    this._scene.camera.lookAt(this._cameraPointCurve.getPointAt(0))
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

  public animateCamera(): void {
    if (!this._task?.continue) {
      if (this._cameraCurve && this._cameraPointCurve) {
        const animationDuration = 3000;
        const animationSpeed = 0.02;
        this._task = new CameraTask(
          this._cameraCurve!,
          this._cameraPointCurve!,
          this._scene.camera,
          animationDuration,
          animationSpeed
        )
        this._tasksQueue.enqueue(this._task)
      }
    } else {
      this._task.reverse = !this._task.reverse;
    }
  }


  private _createCurve1(): CatmullRomCurve3 {
    //TO DO: make it smoother.
    const pathPoints = [
      new Vector3(5, 2, -5),
      new Vector3(10, 2, 2),
      new Vector3(8, 2, 10),
      new Vector3(2, 1, 12),
    ];

    const splineCurve = new CatmullRomCurve3(pathPoints);
    // const geometry = new BufferGeometry().setFromPoints( splineCurve.getPoints( 50 ) );
    // const material = new LineBasicMaterial( { color: 0xff0000 } );
    // const curveObject = new Line(geometry, material);
    // this._actorsManager.addObject(curveObject);
    return splineCurve;
  }

  private _createCurve2(): CatmullRomCurve3 {
    //TO DO: make it smoother.
    const pathPoints = [
      new Vector3(-2, 0.5, -2),
      new Vector3(-0.5, 0.5, -2.5),
      new Vector3(2, 0.5, 0),
      new Vector3(-0.5, 0.5, 5),
    ];

    const splineCurve = new CatmullRomCurve3(pathPoints);
    // const geometry = new BufferGeometry().setFromPoints( splineCurve.getPoints( 50 ) );
    // const material = new LineBasicMaterial( { color: 0x18ff00 } );
    // const curveObject = new Line(geometry, material);
    // this._actorsManager.addObject(curveObject);
    return splineCurve;
  }

}