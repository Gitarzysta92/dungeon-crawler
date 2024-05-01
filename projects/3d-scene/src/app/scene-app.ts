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
    const pathPoints = [
      new Vector3(-2, 1, -2),
      new Vector3(10, 5, -10),
      new Vector3(20, 0, 0),
      // Add more points as needed
    ];

    const splineCurve = new CatmullRomCurve3(pathPoints);
    const geometry = new BufferGeometry().setFromPoints( splineCurve.getPoints( 50 ) );
    const material = new LineBasicMaterial( { color: 0xff0000 } );
    const curveObject = new Line(geometry, material);
    
    this._actorsManager.addObject(curveObject);


    // Define animation duration and speed
const animationDuration = 5000; // in milliseconds
const animationSpeed = 0.001; // Adjust as needed

// Initialize variables
let elapsedTime = 0;


    
    this._mainLoop.onTick(t => this._tasksQueue.perform(t));

    this._mainLoop.onTick(t => {
      for (let actor of this._actorsManager.actors.values()) {
        actor.recalculate && actor.recalculate(t)
      }
    });

    let animated = false;

    this._mainLoop.onTick(d => {

      if (!animated) {
        const t = Math.min(elapsedTime / animationDuration, 1);
        const position = splineCurve.getPointAt(t);
        this._scene.camera.position.copy(position);

        const tangent = splineCurve.getTangentAt(t).normalize();
       
        this._scene.camera.lookAt(new Vector3(0, 0, 0));
        // Update elapsed time
        elapsedTime += animationSpeed * 7000;
      }
      

    // Stop animation loop when end of path is reached
      if (elapsedTime >= animationDuration) {
        elapsedTime = 0;
        animated = true;
      }
    })

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
}