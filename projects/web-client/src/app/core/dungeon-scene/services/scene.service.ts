import { Injectable } from "@angular/core";
import { BoardComponent } from "@3d-scene/lib/components/functional/board.component";
import { DialogComponent } from "@3d-scene/lib/components/functional/dialog.component";
import { RotateTileControlComponent } from "@3d-scene/lib/components/functional/rotate-control.component";
import { StagingComponent } from "@3d-scene/lib/components/functional/staging.component";
import { View } from "@3d-scene/lib/internals/scene/view";
import { SceneManager } from "@3d-scene/scene/scene-manager";
import { bootstrapScene } from "@3d-scene/scene/scene.factory";
import { Subject } from "rxjs";
import { BoardBuilderService } from "./board-builder/board-builder.service";
import { SceneComposer } from "@3d-scene/scene/scene-composer";
import { IDungeonState } from "@game-logic/lib/game/game.interface";
import { mapLogicFieldToSceneField } from "../mappings/dungeon-scene-mappings";
import { IDungeonDataFeedEntity } from "src/app/core/data-feed/interfaces/data-feed-dungeon-entity.interface";
import { IBoardActorDataFeedEntity } from "src/app/core/data-feed/interfaces/data-feed-actor-entity.interface";
import { TileObject } from "@3d-scene/lib/actors/game-objects/tile.game-object";
import { CoordsHelper } from "@game-logic/lib/features/board/coords.helper";
import { IDungeonSceneState } from "../interfaces/dungeon-scene-state";
import { DataFeedService } from "../../data-feed/services/data-feed.service";

@Injectable()
export class SceneService {
  public scene: SceneManager;
  public view: View;
  public dialogComponent: DialogComponent;
  public stagingComponent: StagingComponent;
  public boardComponent: BoardComponent;
  public rotateMenuComponent: RotateTileControlComponent;
  public sceneComposer: SceneComposer;
  
  public mouseEvents$: Subject<MouseEvent> = new Subject();

  constructor(
    private readonly _boardBuilder: BoardBuilderService,
    private readonly _dataFeedService: DataFeedService
  ) { }

  public createScene(
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

  public async processSceneUpdate(s: IDungeonSceneState): Promise<void> {
    await this._updateBoardFields(s);
    await this._updateBoardActors(s);
  }

  private async _createTile(id: string, tile: any): Promise<TileObject> {
    const tileDeclaration = Object.assign(tile.visualScene, {
      auxId: id,
      type: "tile-on-field",
      rotation: tile.rotation,
      auxFieldId: CoordsHelper.createKeyFromCoordinates(tile.position) 
    });
    return await this.sceneComposer.createTileOnField(tileDeclaration);
  }


  private async _updateBoardActors(s: IDungeonSceneState): Promise<void> {
    await Promise.all(Object.entries(s.board.objects).map(async ([id, tile]) => {
      let boardTile = this.scene.getSceneObject<TileObject>(id);
      if (!boardTile) {
        const tileData = await this._dataFeedService.getActor(id);
        boardTile = await this._createTile(id, Object.assign(tileData ?? s.hero, tile));
      } else {
        await this.boardComponent.moveTile(boardTile, CoordsHelper.createKeyFromCoordinates(tile.position));
        await this.boardComponent.rotateTile(boardTile, tile.rotation);
      }

      if (tile.isSelected) {
        boardTile.select()
      } else {
        boardTile.unselect();
      }

      if (tile.isHighlighted) {
        boardTile.highlight();
      } else {
        boardTile.removeHighlight();
      }
    }));

    this.boardComponent.getAllAttachedTiles()
      .forEach(t => {
        if (!s.board.objects[t.auxId]) {
          this.sceneComposer.removeTile()
        }
      })
  }


  private async _updateBoardFields(s: IDungeonSceneState): Promise<void> {
    Object.entries(s.board.fields).forEach(([id, field]) => {
      const boardField = this.boardComponent.getField(id);

      if (field.isHighlighted) {
        boardField.highlight();
      } else {
        boardField.removeHighlight();
      }

      if (field.isSelected) {
        boardField.select();
      } else {
        boardField.unselect();
      }

      if (field.isHighlightedRange) {
        boardField.highlightRange();
      } else {
        boardField.removeHighlightRange();
      }
    });
  }


}