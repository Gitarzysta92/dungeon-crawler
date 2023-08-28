import { BoardComponent } from "../lib/components/functional/board.component";
import { DialogComponent } from "../lib/components/functional/dialog.component";
import { StagingComponent } from "../lib/components/functional/staging.component";
import { MainLoop } from "../lib/internals/rendering/main-loop";
import { Renderer } from "../lib/internals/rendering/renderer";
import { RenderingPipeline } from "../lib/internals/rendering/rendering-pipeline";
import { View } from "../lib/internals/scene/view";
import { TasksQueue } from "../lib/internals/tasks/tasks-queue";
import { ISceneComposerSetup } from "./interfaces/scene-composer-setup";
import { ISceneData } from "./interfaces/scene-manager";
import { SceneComposer } from "./scene-composer";

export class SceneManager {
  private _renderingPipeline!: RenderingPipeline;

  constructor(
    private readonly _view: View,
    private readonly _renderer: Renderer,
    private readonly _tasksQueue: TasksQueue,
    private readonly _mainLoop: MainLoop,
    private readonly _dialogArea: DialogComponent,
    private readonly _stagingArea: StagingComponent,
    private readonly _boardArea: BoardComponent,
    private readonly _sceneComposer: SceneComposer,
  ) { }

  public createScene(sceneData: ISceneData): View {
    this._renderer.initialize(sceneData);
    this._view.initialize(sceneData);

    this._renderingPipeline = new RenderingPipeline(
      this._renderer.webGlRenderer,
      this._view.scene,
      this._view.camera);

    this._stagingArea.initializeGuiObjects();
    this._dialogArea.initializeGuiObjects();
    this._dialogArea.assignToStagingComponent = (x: any) => this._stagingArea.assignTiles(x);
    this._stagingArea.assingToBoardComponent = (x: any) => this._boardArea.assignTile(x);
      
    return this._view;
  }

  public async createSceneObjects(composerData: ISceneComposerSetup): Promise<void> {
    await this._sceneComposer.createSceneObjects(composerData);
  }

  public startRendering(): void {
    let fog: any = this._view.scene.fog;
    this._mainLoop.onTick(() => this._sceneComposer.recalculate());
    this._mainLoop.onTick(() => this._tasksQueue.perform());
    this._mainLoop.onTick(() => {
      const x = 0.05 * (250 - this._view.controls.target.distanceTo(this._view.controls.object.position))
      fog.near = 150 - 2 * (x * x);
      fog.far = 300 - 2 * (x * x);
    });
    this._mainLoop.onTick(() => this._renderingPipeline.render());
    this._mainLoop.init();
  }

  // public createTile(id: string, texture: Texture, selectionColor: ColorRepresentation): TileObject {
  //   const v = new Vector3(0, 0, -100);
  //   const tile = ObjectFactory.createTile2(texture, v, null!, id, selectionColor);
  //   this._gameView.initializeObject(tile);
  //   return tile;
  // }


  public adjustRendererSize(a: any, b: any) {
    this._view.adjustToViewportChange(a, b);
    this._renderer.adjustToViewportChange(a, b, a/b)
  }


}