import { Injectable } from "@angular/core";
import { BoardComponent } from "@3d-scene/lib/components/functional/board.component";
import { DialogComponent } from "@3d-scene/lib/components/functional/dialog.component";
import { RotateTileControlComponent } from "@3d-scene/lib/components/functional/rotate-control.component";
import { StagingComponent } from "@3d-scene/lib/components/functional/staging.component";
import { View } from "@3d-scene/lib/internals/scene/view";
import { SceneManager } from "@3d-scene/scene/scene-manager";
import { bootstrapScene } from "@3d-scene/scene/scene.factory";
import { Subject } from "rxjs";
import { BoardBuilderService } from "../board-builder/board-builder.service";
import { SceneComposer } from "@3d-scene/scene/scene-composer";
import { IDungeonState } from "@game-logic/lib/game/game.interface";
import { mapLogicFieldToSceneField, mapLogicObjectToSceneObject } from "../../mappings/dungeon-scene-mappings";
import { IDungeonDataFeedEntity } from "src/app/core/data-feed/interfaces/data-feed-dungeon-entity.interface";
import { IBoardActorDataFeedEntity } from "src/app/core/data-feed/interfaces/data-feed-actor-entity.interface";

@Injectable()
export class SceneInitializationService {
  public scene: SceneManager;
  public view: View;
  public dialogComponent: DialogComponent;
  public stagingComponent: StagingComponent;
  public boardComponent: BoardComponent;
  public rotateMenuComponent: RotateTileControlComponent;
  public sceneComposer: SceneComposer;
  
  public mouseEvents$: Subject<MouseEvent> = new Subject();
  public sceneUpdated$: Subject<void> = new Subject();

  constructor(
    private readonly _boardBuilder: BoardBuilderService
  ) { }

  public  createScene(
    canvas: any,
    sceneInputs: any,
    dungeon: IDungeonDataFeedEntity & IDungeonState,
    actors: { [key: string]: IBoardActorDataFeedEntity }
  ): void {
    const gameScene = bootstrapScene(sceneInputs);
    this.dialogComponent = gameScene.dialogComponent;
    this.stagingComponent = gameScene.stagingComponent;
    this.boardComponent = gameScene.boardComponent;
    this.rotateMenuComponent = gameScene.rotateMenuComponent;
    this.scene = gameScene.sceneManager;
    this.sceneComposer = gameScene.sceneComposer;
    this.mouseEvents$ = sceneInputs;

    this.view = this.scene.createScene({
      canvasRef: canvas,
      height: innerHeight,
      width: innerWidth,
      pixelRatio: innerWidth / innerHeight,
      bgColor: 0xa07966,
      fogColor: 0xea5c3b,
    });
    this.sceneComposer.createSceneObjects({
      terrain: dungeon.visualScene.terrain,
      lights: dungeon.visualScene.lights,
      board: this._boardBuilder.buildBoardDefinition(
        dungeon.visualScene.board.apperance,
        Object.values(dungeon.board.fields).map(f => mapLogicFieldToSceneField(f)),
      ),
      objects: []
    });
    this.scene.startRendering();
  }

  public adjustRendererSize() {
    this.scene.adjustRendererSize(innerWidth, innerHeight);
  }

}