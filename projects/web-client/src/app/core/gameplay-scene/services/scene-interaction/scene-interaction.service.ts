import { Injectable } from "@angular/core";
import { FieldObject } from "@3d-scene/lib/actors/game-objects/field.game-object";
import { TileObject } from "@3d-scene/lib/actors/game-objects/tile.game-object";
import { Observable, filter, map, take, of } from "rxjs";
import { SceneInitializationService } from "../scene-initialization/scene-initialization.service";

@Injectable()
export class SceneInteractionService {

  constructor(
    private readonly _sceneInitializationService: SceneInitializationService
  ) { }
  
  dragTileAndListenForRelease(_tile: TileObject): Observable<unknown> {
    return of(null);
  }

  listenForTileHandledFromStaging(): Observable<unknown> {
    throw new Error('Method not implemented.');
  }

  // public createTile(tileId: string, imgUrl: string, color: string): TileObject {
  //   return this.scene.createTile(tileId, this.scene.loadTexture(imgUrl), color);
  // }


  // public listenForTileHandledFromStaging(): Observable<TileObject> {
  //   return this.mouseEvents$.pipe(
  //     filter(e => e.type === "mousedown"),
  //     map(e => this.stagingComponent.getTargetedTile(e.clientX, e.clientY)),
  //     filter(t => !!t)
  //   )
  // }


  // public dragTileAndListenForRelease(tile: TileObject): Observable<MouseEvent> {
  //   this.stagingComponent.dragTile(tile);
  //   return this.listenForReleaseEvent().pipe(take(1))
  // }


  // public openSelectionTileDialog(tiles: TileObject[]): void{
  //   tiles.forEach(t => this.dialogComponent.assignTile(t));
  //   this.dialogComponent.openDialog();
  // }


  // public async selectTilesForStaging(tiles: TileObject[]): Promise<void>{
  //   tiles.forEach(t => t.unselect());
  //   await this.dialogComponent.moveTilesToStaging(tiles);
  // }

  // public async attachTileToBoard(tile: TileObject): Promise<FieldObject> {
  //   return await this.boardComponent.attachDraggedTileToField();
  // }

  // public async bringDraggedTileToStaging(): Promise<void> {
  //   const tile = this.boardComponent.getDraggedTile();
  //   this.boardComponent.stopDraging();
  //   await this.stagingComponent.bringBackTile(tile);
  // }

  // public async showRotateControls(tile: TileObject): Promise<void> {
  //   await this.rotateMenuComponent.showMenu(tile, {
  //     settled: 0xff7404,
  //     hovered: 0xedb316
  //   });
  // }

  // public async rotateTile(e: MouseEvent): Promise<void> {
  //   await this.rotateMenuComponent.rotateTile(e.clientX, e.clientY);
  // }

  // public async hideControls(): Promise<void> {
  //   await this.rotateMenuComponent.hideMenu();
  // }
}