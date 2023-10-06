import { Injectable } from "@angular/core";
import { BoardComponent } from "@3d-scene/lib/components/functional/board.component";
import { DialogComponent } from "@3d-scene/lib/components/functional/dialog.component";
import { RotateTileControlComponent } from "@3d-scene/lib/components/functional/rotate-control.component";
import { StagingComponent } from "@3d-scene/lib/components/functional/staging.component";
import { View } from "@3d-scene/lib/internals/scene/view";
import { SceneManager } from "@3d-scene/scene/scene-manager";
import { bootstrapScene } from "@3d-scene/scene/scene.factory";
import { Subject } from "rxjs";
import { sceneSetup } from "src/app/core/dungeon/constants/scene-setup";
import { BoardBuilderService } from "../board-builder/board-builder.service";
import { ISceneFieldDeclaration } from "@3d-scene/scene/interfaces/declarations/field-declaration";
import { ISceneObjectDeclaration } from "@3d-scene/scene/interfaces/declarations/scene-object-declaration";
import { MapVectorToRawVector } from "@3d-scene/scene/types/map-vector-to-raw-vector";

@Injectable()
export class SceneInitializationService {
  public scene: SceneManager;
  public view: View;
  public dialogComponent: DialogComponent;
  public stagingComponent: StagingComponent;
  public boardComponent: BoardComponent;
  public rotateMenuComponent: RotateTileControlComponent;
  
  public mouseEvents$: Subject<MouseEvent> = new Subject();

  constructor(
    private readonly _boardBuilder: BoardBuilderService
  ) { }

  public createScene(
    canvas: any,
    sceneInputs: any,
    objects: ISceneObjectDeclaration[],
    fields: MapVectorToRawVector<ISceneFieldDeclaration>[]
  ): void {
    const gameScene = bootstrapScene(sceneInputs);
    this.dialogComponent = gameScene.dialogComponent;
    this.stagingComponent = gameScene.stagingComponent;
    this.boardComponent = gameScene.boardComponent;
    this.rotateMenuComponent = gameScene.rotateMenuComponent;
    this.scene = gameScene.sceneManager;
    this.mouseEvents$ = sceneInputs;

    this.view = this.scene.createScene({
      canvasRef: canvas,
      height: innerHeight,
      width: innerWidth,
      pixelRatio: innerWidth / innerHeight,
      bgColor: 0xa07966,
      fogColor: 0xea5c3b,
    });
    this.scene.createSceneObjects({
      terrain: sceneSetup.terrain,
      lights: sceneSetup.lights,
      board: this._boardBuilder.buildBoardDefinition({
        primaryColor: 0x000,
        secondaryColor: 0x000
      }, fields),
      objects: sceneSetup.objects.concat(objects)
    } as any);
    this.scene.startRendering();
  }


  public updateScene(objects: ISceneObjectDeclaration[], fields: MapVectorToRawVector<ISceneFieldDeclaration>[]): void {
    //this.scene.createSceneObjects()
  }


  public adjustRendererSize() {
    this.scene.adjustRendererSize(innerWidth, innerHeight);
  }

}