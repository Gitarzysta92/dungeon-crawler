import { Injectable } from "@angular/core";
import { BoardComponent } from "@3d-scene/lib/components/functional/board.component";
import { DialogComponent } from "@3d-scene/lib/components/functional/dialog.component";
import { RotateTileControlComponent } from "@3d-scene/lib/components/functional/rotate-control.component";
import { StagingComponent } from "@3d-scene/lib/components/functional/staging.component";
import { View } from "@3d-scene/lib/internals/scene/view";
import { SceneManager } from "@3d-scene/scene/scene-manager";
import { bootstrapScene } from "@3d-scene/scene/scene.factory";
import { Subject } from "rxjs";
import { ISceneInitializationData } from "../../models/scene-initialization";

@Injectable()
export class SceneInitializationService {
  public scene: SceneManager;
  public view: View;
  public dialogComponent: DialogComponent;
  public stagingComponent: StagingComponent;
  public boardComponent: BoardComponent;
  public rotateMenuComponent: RotateTileControlComponent;
  
  public mouseEvents$: Subject<MouseEvent> = new Subject();

  constructor() { }

  public createScene(d: ISceneInitializationData): void {
    const gameScene = bootstrapScene(d.sceneInputs);
    this.dialogComponent = gameScene.dialogComponent;
    this.stagingComponent = gameScene.stagingComponent;
    this.boardComponent = gameScene.boardComponent;
    this.rotateMenuComponent = gameScene.rotateMenuComponent;
    this.scene = gameScene.sceneManager;

    this.view = this.scene.createScene(d.sceneData);
    this.scene.createSceneObjects(d.sceneComposerSetup);

    this.scene.startRendering();
  }


  public adjustRendererSize() {
    this.view.adjustToViewportChange(innerWidth, innerHeight);
  }

}